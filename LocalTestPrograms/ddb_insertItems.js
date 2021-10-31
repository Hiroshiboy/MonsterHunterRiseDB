var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "MonsterHunterRiseDB";
var params = {
        TableName: table,
        Item: {
            'monster_name' : "Great Wroggi",
            'monster_type' : "Bird Wyvern",
            'threat_level' : 2,
            'elements' : "None",
            'ailments' : 'Poison',
            'weaknesses' : [
                "Ice",
                "Water"
            ],
            'resistances' : [
                "Fire",
                "Dragon",
                "Thunder"
            ],
            'habitats' : [
                "Shrine Ruins",
                "Flooded Forest",
                "Lava Caverns"
            ]


        }
    };
console.log("Adding a new monster...");
docClient.put(params, (err,data)=>{
    if(err){
        console.error("Monster was not able to be added. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Monster added successfully:", JSON.stringify(data, null, 2));
    }
});