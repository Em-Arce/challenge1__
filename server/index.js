const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CountModel = require("./models/counts");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://eparce:uSRjdF6icR3Vbofa@cluster0.sb8axxy.mongodb.net/mernbeginner?retryWrites=true&w=majority");

app.get("/getCounts", (req, res) => {
  CountModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  } )
});

app.post("/addCount", async (req, res) => {
  const count = req.body;
  const newCount = new CountModel(count);
  await newCount.save();

  res.json(count);
});

app.put("/updateCount", async (req, res) => {
  const id = req.body.id;
  const newCurrentCount = req.body.newCount;
  
  try {
    await CountModel.findById(id, (err, updatedCount) => {
      updatedCount.currentCount = newCurrentCount;
      updatedCount.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(4000, () => {
  console.log("SERVER IS RUNNING");
});