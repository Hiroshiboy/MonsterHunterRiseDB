var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.update({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing Monsters into the DB. Just a second...");

var allMonsters = JSON.parse(fs.readFileSync('./cleaned_monster_data.json', 'utf8'));
allMonsters.forEach((monster) => {
    var params = {
        TableName: "MonsterHunterRiseDB",
        Item: {
            "monster_name": monster.monster_name,
            "monster_type" : monster.monster_type,
            "threat_level" : monster.threat_level,
            "elements" : monster.elements,
            "ailments" : monster.ailments,
            "weaknesses" : monster.weaknesses,
            "resistances" : monster.resistances,
            "habitats" : monster.habitats,
        }
    };
    docClient.put(params, (err, data) => {
        if(err){
            console.error("Unable to Add Monster", monster.monster_name, ". Error JSON: ", JSON.stringify(err, null, 2));
        } else {
            console.log(`${monster.monster_name} Inserted`);
        }
    });

});