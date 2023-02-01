var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en stkrubroleerconfgrp");
  } else {
    console.log("no se conecto en stkrubroleerconfgrp ");
  }
});


var router = express();

// router.get("/?:cuallee", function (req, res, next) {
//   cuallee = req.params.cuallee;
router.get("/", async function (req, res, next) {
  cuallee = req.query.cuallee;
  StkRubroCodGrp = req.query.StkRubroCodGrp;
  //en cuallee trae 'S' si el tipo de presupuesto solicitado es de confección, trae 'T' si es Unidad
  // trae 'D' de detalles para la orden de trabajo p.e. Soga Chicotes, etc. por eso trae el grupo
  console.log('cuallee  ', cuallee)
  if (cuallee === 'T') {
    var q = ["Select StkRubroDesc, StkRubroAbr from StkRubro order by StkRubroDesc"].join("");
  }
  else {
    var q = ["Select StkRubroDesc, StkRubroAbr from StkRubro where StkRubroConf = '" + cuallee + "' and StkRubroCodGrp = " + StkRubroCodGrp + " order by StkRubroDesc"].join("");
  }
  console.log('q  ', q)
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
