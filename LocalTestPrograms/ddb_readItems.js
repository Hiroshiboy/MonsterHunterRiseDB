
//Todo: Update this code to work with the new version of the database
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "MonsterHunterRiseDB";


var params = {
    TableName: table,
    Key:{
        "monster_name": "Great Wroggi",
        "monster_type": "Bird Wyvern"
    }
};

docClient.get(params, (err, data) => {
    if (err) {
        console.error("Unable to find monster. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
