var AWS = require("aws-sdk");

var dynamodb = new AWS.DynamoDB({region: "us-east-2", apiVersion: "2012-08-10"})

exports.handler = (event, context, cb) => {
    const params = {
        TableName: 'MonsterHunterRiseDB'
    }
    dynamodb.scan(params, (err, data) => {
        if(err){
            console.log(err)
            cb(err)
        } else {
            const unmarshalledData = data.Items.map(el => {
                return AWS.DynamoDB.Converter.unmarshall(el)
            })
            
            const response = {
                "statusCode": 200,
                "body": JSON.stringify(unmarshalledData),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true
                }
            }

            console.log(response)
            cb(null, response)
        }
    })
};