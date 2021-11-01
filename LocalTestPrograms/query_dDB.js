
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();


//Misunderstood how sort key and partition key worked but get how it works now
console.log("Querying for monsters with an Id of 1.");

var params = {
    TableName : "MonsterHunterRiseDB",
    KeyConditionExpression: "#mn = :mn",
    ExpressionAttributeNames:{
        "#mn": "monster_name"
    },
    ExpressionAttributeValues: {
        ":mn": "Bishaten"
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", "Monster Name" + ": " + item.monster_name);
        });
    }
});
