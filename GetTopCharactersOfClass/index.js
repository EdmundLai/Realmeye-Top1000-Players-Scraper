/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 *
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

const { JSDOM } = require("jsdom");
const axios = require("axios");

module.exports = async function (context) {
  //return `Hello ${context.bindings.name}!`;

  const charClass = context.bindings.name;

  const playersData = {
    playerCount: 0,
    totalFame: 0,
    totalExp: 0,
    equipmentUsed: {
      weapon: {},
      ability: {},
      armor: {},
      ring: {},
    },
  };

  async function getPlayersDataFromPage(url) {
    const { data } = await axios(url, {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0",
      },
      method: "GET",
      mode: "cors",
    });

    const dom = new JSDOM(data);

    const playerNodes = dom.window.document.querySelectorAll("#e tbody tr");

    playerNodes.forEach((playerNode) => {
      const playerInfoNodes = playerNode.childNodes;

      const playerName = playerInfoNodes[2].firstChild.textContent;

      if (playerName !== "Private") {
        const playerFame = playerInfoNodes[3].textContent;

        const playerExp = playerInfoNodes[4].textContent;

        const playerEquipmentNodes = playerInfoNodes[5].childNodes;

        playersData.playerCount += 1;

        playersData.totalFame += parseInt(playerFame);

        playersData.totalExp += parseInt(playerExp);

        for (let i = 0; i < 4; i++) {
          const currNode = playerEquipmentNodes[i];

          const equipName =
            currNode.firstChild.getAttribute("title") ||
            currNode.firstChild.firstChild.getAttribute("title");

          let currentDict;

          switch (i) {
            case 0:
              currentDict = playersData.equipmentUsed.weapon;
              break;
            case 1:
              currentDict = playersData.equipmentUsed.ability;
              break;
            case 2:
              currentDict = playersData.equipmentUsed.armor;
              break;
            case 3:
              currentDict = playersData.equipmentUsed.ring;
              break;
          }

          if (!currentDict.hasOwnProperty(equipName)) {
            currentDict[equipName] = 1;
          } else {
            currentDict[equipName] += 1;
          }
        }
      }

      //playersData.names.push(playerName);
    });
  }

  const url = `https://www.realmeye.com/top-${charClass}`;

  for (let i = 0; i < 10; i++) {
    let newUrl = url;

    if (i > 0) {
      newUrl = `${url}/${i}01`;
    }

    console.log(newUrl);

    await getPlayersDataFromPage(newUrl);
  }

  playersData.avgFame = Math.round(
    playersData.totalFame / playersData.playerCount
  );

  playersData.avgExp = Math.round(
    playersData.totalExp / playersData.playerCount
  );

  return playersData;
};
