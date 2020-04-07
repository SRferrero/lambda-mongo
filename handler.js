"use strict";

const express = require("express");
const serverless = require("serverless-http");
const MongoClient = require("mongodb").MongoClient;

// Here you should get your credentials
const mongoDbName = "YOUR_DB_NAME";
const mongoUser = "USER_ADDED_TO_CLUSTER";
const mongoPass = "USER_PASSWORD";
const mongoConectionString = `mongodb+srv://${mongoUser}:${mongoPass}@<cluster_URL>/${mongoDbName}?retryWrites=true&w=majority`;
//end of credentials

const app = express();

const client = new MongoClient(mongoConectionString, {
  useNewUrlParser: true,
});
let db;

const createConn = async () => {
  await client.connect();
  db = client.db(mongoDbName);
};

const performQuery = async (data) => {
  const logs = db.collection("logs");

  const newLog = {
    date: Date.now(),
    data,
  };

  return {
    insertedLog: newLog,
    mongoResult: await logs.insertOne(newLog),
  };
};

app.get("/addLog", async function (req, res) {
  if (!client.isConnected()) {
    try {
      await createConn();
    } catch (e) {
      res.json({
        error: e.message,
      });
      return;
    }
  }

  try {
    const data = (req.body && req.body.data) || {
      id: "randomstringcomginfromFE",
      type: "income-request",
    };
    res.json(await performQuery(data));
    return;
  } catch (e) {
    res.send({
      error: e.message,
    });
    return;
  }
});

module.exports = {
  app,
  logging: serverless(app),
};
