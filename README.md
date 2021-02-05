# Realm of the Mad God Top 1000 Players Scraper

This web scraping tool was created to get aggregated data from the Realmeye lists of the top 1000 players from each class.

Developed in JavaScript and deployed on Azure functions.

To use the Realmeye data lookup, you use the link

<https://rotmg-top-1000-players-web-scraper.azurewebsites.net/api/orchestrators/Orchestrator>

On this page, you can find a page returning JSON with the property statusQueryGetUri, which contains a link to a status query page that tracks the status of the durable function .

(Ex. <https://rotmg-top-1000-players-web-scraper.azurewebsites.net/runtime/webhooks/durabletask/instances/d6de7ab50a5143c5a9ae213fb078cb2b?taskHub=DurableFunctionsHub&connection=Storage&code=RhamyijbU9SjNC4cgvJkaTCE6Cg3bLIm5ZzUend8bv60PgQK69oSYw==>)

After completion, the status query page will display a runtime status of Completed, and the aggregated data from Realmeye will be shown in the output property.
