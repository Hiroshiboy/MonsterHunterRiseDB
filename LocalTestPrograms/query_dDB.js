var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({
  region: "us-east-2",
  apiVersion: "2012-08-10",
});

  const params = {
    TableName: "MonsterHunterRiseDB",
    IndexName: "monster_type-index",
    KeyConditionExpression: "monster_type = :mt",
    ExpressionAttributeValues: {
      ":mt": {"S":"Fanged Beast"},
    },
    ProjectionExpression: 'monster_name, monster_type',
  };
  dynamodb.query(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
      data.Items.forEach(function (element, index, array) {
        console.log(
            "printing",
            element.monster_name.S + " (" + element.monster_type.S + ")"
        );
      });
    }
  });
