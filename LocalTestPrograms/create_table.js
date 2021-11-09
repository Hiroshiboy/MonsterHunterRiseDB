var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "MonsterHunterRiseDB",
    KeySchema: [
        { AttributeName: "monster_name", KeyType:"HASH"},
        { AttributeName: "monster_type", KeyType:"RANGE"}
    ],
    AttributeDefinitions: [
        { AttributeName: "monster_name", AttributeType: "N"},
        { AttributeName: "monster_type", AttributeType: "S"},
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data){
    if(err){
        console.error("Unable to create Table. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table Description JSON: ", JSON.stringify(data, null, 2));
    }
});