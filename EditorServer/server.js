const fs = require("fs");
const express = require("express");
var bodyParser = require('body-parser')



const app = express();
const port = 3000;


// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/",(req,res)=>{

    res.write('Youve been gnomed');
    res.end();
})

app.post('/', (req, res) => {
    console.log("saving");
    fs.writeFileSync("./scripts/WalkingSim/WorldData.json",JSON.stringify(req.body));
    console.log("savd");
    res.statusCode = 200;
    res.send();
})


console.log("hello");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
