var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en en en en stkrubroleecodrbygr");
  } else {
    console.log("no se conecto en en stkrubroleecodrbygr");
  }
});

var router = express();

router.get("/", async function(req, res, next) {
  idStkRubro = req.query.id1;
  StkRubroCodGrp = req.query.id2;

  var q = [
    "Select * from StkRubro where idStkRubro = ",
    idStkRubro,
    " and  StkRubroCodGrp  = ",
    StkRubroCodGrp
  ].join(" ");

  conexion.query(q, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
    console.log(result);
  });
});

conexion.end;
module.exports = router;
