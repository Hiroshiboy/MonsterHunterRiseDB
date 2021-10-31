
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();


//Misunderstood how sort key and partition key worked but get how it works now
console.log("Querying for monsters with an Id of 1.");

var params = {
    TableName : "MonsterHunterRiseDB",
    KeyConditionExpression: "#mi = :mi",
    ExpressionAttributeNames:{
        "#mi": "monster_id"
    },
    ExpressionAttributeValues: {
        ":mi": 1
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.monster_id+ ": " + item.monster_name);
        });
    }
});
