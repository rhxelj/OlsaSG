var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupconftipoleeanexo");
  } else {
    console.log("no se conecto en presupconftipoleeanexo");
  }
});

var router = express();

router.get("/", function (req, res, next) {
  PresupConfTipoAnexoSN = req.query.PresupConfTipoAnexoSN;

  //'Select * from StkGrupo '
  var q = ["Select * from BasePresup.PresupConfTipo where PresupConfTipoAnexo = " + PresupConfTipoAnexoSN].join(" ");
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
