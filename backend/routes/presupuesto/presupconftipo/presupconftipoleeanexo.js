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
  PresupConfTipoAnexoSN = req.query.anexo;
  console.log('PresupConfTipoAnexoSN  ', PresupConfTipoAnexoSN)
  var q = ["SET @numero=0 "].join(" ");
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  var q = [" SELECT @numero:=@numero+1 as NroConfTipo , PresupConfTipoDesc from BasePresup.PresupConfTipo where PresupConfTipoAnexo = '" + PresupConfTipoAnexoSN + "'  group by PresupConfTipoDesc"].join(" ");
  console.log('q  ', q)
  conexion.query(q, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log('result  ', result)
    }
  });
});
conexion.end;
module.exports = router;
