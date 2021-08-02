var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuppiletaenr");
  } else {
    console.log("no se conecto en presuppiletaenr");
  }
});

var datosenvio = [];

var router = express();
router.get("/", (req, res, next) => {
  var q,
    i = 0;
  q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      var costooriginal = 0;
      var coeficiente = 0,
        cantidad = 0,
        metroscuad = 0,
        StkRubroAbrP = "",
        largo = 0,
        minutospmc = 0,
        ancho = 0.0;
      // var enteroancho = 0,
      //   decimancho = 0.0;
      datosrec = JSON.parse(req.query.datoscalculo);
      // totalreg = datosrec.length;

      datosrec.map(datos => {
        cantidad = datos.cantidad;
        drenajesn = datos.drenajesn;
        tipoojale = datos.tipoojale;
        detallep = datos.detallep
        StkRubroAbrP = datos.StkRubroAbr;
        ivasn = datos.ivasn;
        largoreal = (datos.largo * 1)
        anchoreal = (datos.ancho * 1)
        largo = (datos.largo * 1) + 0.3;
        ancho = (datos.ancho * 1) + 0.08;

        buscaancho = ['Select StkRubroAncho  as AnchoTela  from BaseStock.StkRubro where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" '].join('')
        conexion.query(buscaancho,
          function (err, rbuscaancho) {
            if (err) {
              console.log(err);
            }

            rbuscaancho[0].AnchoTela
            calpaños = (largo / rbuscaancho[0].AnchoTela) - Math.trunc(largo / rbuscaancho[0].AnchoTela)
            if (calpaños < .50) {
              cantpaños = Math.trunc(largo / rbuscaancho[0].AnchoTela) + .5
            }
            else {
              cantpaños = Math.trunc(largo / rbuscaancho[0].AnchoTela) + 1
            }
            metroscuad = cantpaños * rbuscaancho[0].AnchoTela * ancho

            // calpaños = (largo / 1.5) - Math.trunc(largo / 1.5)
            // if (calpaños < .50) {
            //   cantpaños = Math.trunc(largo / 1.5) + .5
            // }
            // else {
            //   cantpaños = Math.trunc(largo / 1.5) + 1
            // }
            // metroscuad = cantpaños * 1.5 * ancho


            if (drenajesn == 'cd') {
              if (detallep == '') {
                detalle = "Lona enrollable para pileta, con fajas en las puntas, con drenaje "
              }
              else {
                detalle = detallep + ''
              }
              minutospmc = 9
            } else {
              if (detallep == '') {
                detalle = "Lona enrollable para pileta, con fajas en las puntas"
              }
              else {
                detalle = detallep + ''
              }
              minutospmc = 5
            }


            if (datos.minmay == 'my') {
              coeficiente = result[0].coeficientemay
              coefMOT = result[0].coefMOTmay
              ivasn = 'CIVA'
            }
            else {
              coeficiente = result[0].coeficientemin
              coefMOT = result[0].coefMOTmin
            }

            if (tipoojale == 'hz') {
              tipoojal = result[0].abrojales3hz
              detalle = detalle + ' c/ojales de HZ en : '
            }
            else {
              tipoojal = result[0].abrojales3b
              detalle = detalle + ' c/ojales de bronce en : '
            }

            cantidadojales = datos.largo * 2
            valorMOT = result[0].costoMOT * coefMOT / 60 * metroscuad * minutospmc


            mcuadcob = ['Select ',
              'StkRubroDesc, StkRubroAbr, ',
              '((StkRubroCosto / StkRubroAncho * StkMonedasCotizacion * ', coeficiente,
              ' * ', metroscuad, ')',
              ' ) as ImpUnitario, ',
              'StkRubroCosto, ',
              'StkMonedasCotizacion ',
              'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
              'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
              'and StkRubro.StkRubroTM = idStkMonedas '
            ].join('')


            ojales = [
              "Select ",
              "(StkRubroCosto * StkMonedasCotizacion / 144) * ", cantidadojales,
              " as ValorOjales from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ",
              "where StkRubro.StkRubroAbr = '",
              tipoojal,
              "'",
              " and StkRubro.StkRubroTM = idStkMonedas"
            ].join("");

            // cotizacion = [
            //   "Select ",
            //   "StkMonedasCotizacion ",
            //   "from   BaseStock.StkMonedas ",
            //   "where  StkMonedas.idStkMonedas = '",
            //   codmoneda,
            //   "'"
            // ].join("");

            conexion.query(mcuadcob, function (err, result) {
              if (err) {
                console.log("error en mysql");
                console.log(err);
              } else {
                datosenvio.push(result);

              }
            });


            conexion.query(ojales, function (err, result) {
              if (err) {
                console.log("error en mysql");
                console.log(err);
              } else {
                datosenvio.push(result);
              }
              costooriginal = datosenvio[0][0].ImpUnitario + datosenvio[1][0].ValorOjales + valorMOT
              if (ivasn == 'CIVA') {
                costooriginal = Math.ceil(costooriginal.toFixed(0) / 10) * 10
              }
              else {
                costooriginal = Math.ceil(costooriginal.toFixed(0) / 1.21 / 10) * 10
              }

              // if (ivasn == 'CIVA') {
              //   costooriginal = costooriginal.toFixed(0)
              // }
              // else {
              //   costooriginal = costooriginal.toFixed(0) / 1.21
              // }
              datosenvio[0][0]['ImpUnitario'] = costooriginal
              datosenvio[0][0]['Detalle'] = detalle
              datosenvio[0][0]['Largo'] = (largoreal * 1).toFixed(2)
              datosenvio[0][0]['Ancho'] = (anchoreal * 1).toFixed(2)
              res.json(datosenvio);
              datosenvio = [];
            });


          });
      })
    })
});

conexion.end;
module.exports = router;
