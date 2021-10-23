var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "MonsterHunterRiseDB";
var params = {
        TableName: table,
        Item: {
            'monster_id' : 2,
            'monster_type' : "Bird Wyvern",
            'monster_name' : "Great Wroggi",
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
            'locations' : [
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