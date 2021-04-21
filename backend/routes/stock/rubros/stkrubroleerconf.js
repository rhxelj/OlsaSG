var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerconf");
  } else {
    console.log("no se conecto en stkrubroleerconf ");
  }
});


var router = express();

router.get("/?:cuallee", function (req, res, next) {
  cuallee = req.params.cuallee;
  if (cuallee == 'S') {
    var q = ["Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroConf = 'S' order by StkRubroDesc"].join("");
  }
  else {
    var q = ["Select StkRubroDesc, StkRubroAbr from StkRubro order by StkRubroDesc"].join("");
  }
  //  conexion.query("Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroConf = 'S' order by StkRubroCodGrp", function (err, result) {
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

conexion.end;
module.exports = router;
