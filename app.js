const express = require("express");
const { spawn } = require("child_process");
var bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

app.listen(8888);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});



app.post("/predict", async (req, res) => {
  const body = req.body;
  const array = [
    body.pId,
    body.pClass,
    body.sex === "Male" ? 1 : 0,
    body.sex === "Female" ? 1 : 0,
    body.age,
    body.sibSp,
    body.parch,
    body.fare,
    body.embarked === "S" ? 1 : 0,
    body.embarked === "C" ? 1 : 0,
    body.embarked === "Q" ? 1 : 0,
  ];

  let predictionVal = "0";
  const python = spawn("python", ["predict.py", ...array]);

  python.stdout.on("data", (data) => {
    console.log("python data: ", data.toString());
    predictionValString = data.toString();
    predictedVal = predictionValString[predictionValString.length - 4];
    console.log("predVal:", predictedVal);

    
    res.status(200).json({
        prediction: predictedVal
      })
  });

  python.stderr.on("data", (data) => {
    console.log("error:" + data);
  });
  python.on("close", (code) => console.log(`process closed: code ${code} `));
 
});
