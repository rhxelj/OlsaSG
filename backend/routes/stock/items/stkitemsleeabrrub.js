var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos en stkitemsleeabrrub");
  } else {
    console.log("no se conecto en stkitemsleeabrrub");
  }
});

var router = express();
router.get("/", function (req, res, next) {
  // router.get("/", async function (req, res, next) {
  console.log('vino a  ')
  console.log('vino a ver  ', req.query.abr)
  var StkRubroAbr = req.query.abr;
  var q = [
    "Select * from StkItems where StkItemsRubroAbr = '" + StkRubroAbr + "'",

  ].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log('result  ', result)
    }
  });
});

module.exports = router;
