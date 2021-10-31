
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "MonsterHunterRiseDB";

var monsterId = 2
var monsterType = "Bird Wyvern";

// Conditional update (will fail)

var params = {
    TableName:table,
    Key:{
        "monster_id": monsterId,
        "monster_type": monsterType
    },
    UpdateExpression: "set habitats = :h",
    ExpressionAttributeValues:{
        ":h": ["Ice", "Water"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update monster. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
