var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
var param = require('../parametros')

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presuppu");
  } else {
    console.log("no se conecto en presuppu");
  }
});

var datosenvio = []
var router = express();
router.get('/',  (req, res, next) => {
  var q, i = 0
  var coeficiente = 0, cantidad = 0, StkRubroAbrP = '', largo = 0, ancho = 0.00
  var enteroancho = 0, decimancho = 0.00
  datosrec = JSON.parse(req.query.datoscalculo)
  totalreg = datosrec.length

datosrec.map(datos => {  
      cantidad = datos.cantidad;
      StkRubroAbrP = datos.StkRubroAbr;
      largo = datos.largo + 0.12
      ancho = datos.ancho + 0.12
      enteroancho = Math.trunc(ancho  / 1.50)
      decimancho = (ancho  / 1.5) - enteroancho
      if (decimancho < 0.50) 
        {
          ancho = enteroancho + 0.50
        }
        else
        {
         ancho = enteroancho + 1
        }
      if (datos.minmay == 1) 
        {
          coeficiente = param.coeficientemay
        }
        else 
        {
          coeficiente = param.coeficientemin
        }
      minutosunion = (datos.ancho + 0.12) * largo * 5

      q = ['Select ',
                      'StkRubroDesc, ',
                      '((StkRubroCosto * StkMonedasCotizacion * ', coeficiente, 
                      ' * ', cantidad,
                      ' * ', ancho,
                      ' * ', largo , ')',
                      '+ (REPValorMOT / 60 * ', minutosunion, ')',
                      ') as ImpConFajas, ', 
                      'StkRubroCosto, ',
                      'StkMonedasCotizacion,',
                      'REPValorMOT ',
                      'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas, ', 
                      'reparacion.parametrosrep ',
                      'where StkRubro.StkRubroAbr = "' , StkRubroAbrP , '" ' , 
                      'and StkRubro.StkRubroTM = idStkMonedas '
           ].join('')  
          console.log(q)
           conexion.query(
                 q,              
                      function(err, result) {
                      if (err) {
                          console.log('error en mysql')
                          console.log(err)
                          } 
                          else {
                           datosenvio.push(result)
                           i++ 
                            if (i === totalreg)
                            {
                              res.json(datosenvio)
                              datosenvio = []
                            }
                          }
                  })
  })
});


conexion.end
module.exports = router;