var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../../conexion");

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos en sumaingreso");
    } else {
        console.log("no se conecto en sumaingreso");
    }
});

var router = express();
router.get("/", function (req, res, next) {
    // router.get("/", async function (req, res, next) {
    console.log('vino a  ')
    console.log('vino a ver  ', req.query.abr)
    var StkRubroAbr = req.query.abr;
    var q = [
        'Select idStkRubro, StkRubroCodGrp, StkRubroDesc, StkItems.idStkItems,  StkGrupo.StkGrupoDesc as GrupoDesc, ',
        'StkItemsDesc, BasesGenerales.Proveedores.ProveedoresDesc, StkRubroPresDes, StkRubroAncho, StkRubroPres, ',
        'StkItemsMin, StkItemsMax, StkItemsCantidad, StkItemsCantDisp, StkRubroUM, ',
        'date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha ',
        'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, StkItems ',
        'where StkRubroCodGrp = idStkGrupo ',
        'and StkRubroProv = idProveedores ',
        'and StkRubroTM = idStkMonedas ',
        'and StkRubroCodGrp = idStkGrupo ',
        "and StkItemsRubroAbr = '" + StkRubroAbr + "'",
        "and StkRubroAbr = '" + StkRubroAbr + "'",
        'order by StkRubroCodGrp, idStkRubro ',
        // "Select * from StkItems where StkItemsRubroAbr = '" + StkRubroAbr + "'",

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
