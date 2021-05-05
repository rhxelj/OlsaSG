var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkgrupoleerred");
  } else {
    console.log("no se conecto en stkgrupoleerred");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  //'Select * from StkGrupo '
  var q = [
    //  "Select idStkGrupo, StkGrupoDesc from StkGrupo order by idStkGrupo"
    "Select idStkGrupo, StkGrupoDesc from StkGrupo order by StkGrupoDesc"
  ].join(" ");
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
