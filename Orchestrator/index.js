/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 *
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  const allClassesTop1000Data = {};

  const classArr = [
    "archers",
    "assassins",
    "huntresses",
    "knights",
    "mystics",
    "necromancers",
    "ninjas",
    "paladins",
    "priests",
    "rogues",
    "samurai",
    "sorcerers",
    "tricksters",
    "warriors",
    "wizards",
  ];

  for (let i = 0; i < 15; i++) {
    const rotmgClass = classArr[i];

    allClassesTop1000Data[rotmgClass] = yield context.df.callActivity(
      "GetTopCharactersOfClass",
      rotmgClass
    );
  }

  return allClassesTop1000Data;
});
