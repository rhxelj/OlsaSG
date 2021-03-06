import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
// import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./StkMovEntradaStyle";
import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
import StkGenImpQR from "../../Impresion/StkGenImpQR";
import ubicacion from "./UbicacionGeografica";
// import { stkgrupoleer } from "./StkMovEntradaLeeGrupo";

import { stkgrupolee } from "../../Stock/Grupos/StkGrupoLee";
import { stkrubroleecodgrupo } from "../../Stock/Rubros/StkRubroLeeCodGrupo";
import { stkitemsleecodgryrb } from "../../Stock/Items/StkItemsLeeCodGryRb";
import { stkitemsleecodgrrbit } from "../../Stock/Items/StkItemsLeeCodGrRbIt";
import StkMovEntradaDatItems from "./StkMovEntradaDatItems";

var initial_state = {
  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: "",
  dialogo_imprimir: false,
  stkrubro: [],
  stkgrupo: [],
  stkitems: [],
  stkenvaseubg: [],
  ubicacionf: [],
  stkrubroele: [],
  // StkItemsGrupo: 0,
  StkItemsCantidad: 0.0,
  StkItemsCantDisp: 0.0,
  StkItemsFAct: "",
  StkItemsMin: null,
  StkItemsMax: null,
  StkRubroAncho: null,
  StkRubroPresDes: null,
  StkRubroPres: null,
  StkRubroUM: null,
  cantidad: 1.0,
  largo: 0.0,
  ancho: 0.0,
  faltante: 0.0,
  total: 0.0,
  datostraid: [],
  open: true,
  toggle_imprimir: false,
  marcagenqr: false,
  imp_conf: false,
  marcaagregado: false,
  StkEnvaseUb: "",
  StkEnvaseObserv: "",
  StkEnvasePartida: "",
  toggle_state: {
    entrada: true,
    dialogo: false, //TODO antiguamente dialogo borrar una vez que funcione
    imprimir: false
  }
};

var StkMovEntrada = props => {
  var [state, setState] = useState(initial_state);
  var [dialog, setDialog] = useState(true);

  // async function stkgrupoleer() {
  //   const result = await stkgrupolee();
  //   setState({ ...state, stkgrupo: result });
  // }

  async function stkgrupoleer() {
    const result = await stkgrupolee();
    setState({ ...state, stkgrupo: result });
  }

  async function stkrubroleercodgrupo(codigogrupo) {
    const result = await stkrubroleecodgrupo(codigogrupo);
    setState({ ...state, stkrubro: result });
  }

  async function stkitemsleercodgryrb(codigogrupo, codigorubro) {
    const result = await stkitemsleecodgryrb(codigogrupo, codigorubro);
    setState({ ...state, stkitems: result });
  }

  // Lee Grupo
  // const stkgrupoleer = _ => {
  //   const url = IpServidor + "/stkgrupoleer";
  //   request
  //     .get(url)
  //     .set("Content-Type", "application/json")
  //     .then(res => {
  //       console.log("TCL: res", res);
  //       const stkgrupo = JSON.parse(res.text);
  //       console.log("TCL: stkgrupo", stkgrupo);

  //       setState({ ...state, stkgrupo: stkgrupo });
  //       console.log("TCL: stkgrupo.state", state.stkgrupo);
  //     });
  // };

  //lee rubro por código de grupo
  // const stkrubroleecodgrupo = id => {
  //   const url = IpServidor + "/stkrubroleecodgrupo/" + id;
  //   request
  //     .get(url)
  //     .set("Content-Type", "application/json")
  //     .then(res => {
  //       const stkrubro = JSON.parse(res.text);
  //       // setState({ ...state, stkrubro: stkrubro });
  //       setState({ ...state, stkrubro: stkrubro });
  //     });
  // };

  // lee ubicacion física según la ubicación geografica
  const stkubfisicaleerUbG = id => {
    const url = IpServidor + "/stkubfisicaleerUbG/?id=" + id;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const ubicacionf = JSON.parse(res.text);
        setState({ ...state, ubicacionf: ubicacionf });
      });
  };

  console.log("typeof... : ", typeof stkubfisicaleerUbG);
  console.log("typeof... : ", typeof state.idStkGrupo);
  console.log("typeof... : ", typeof handleChange);

  // const stkrubroleecodgryrb = () => {
  //   const url =
  //     IpServidor +
  //     "/stkrubroleecodgryrb/?idStkRubro=" +
  //     // state.StkItemsRubro +
  //     state.idStkRubro +
  //     "&idStkGrupo=" +
  //     // state.StkItemsGrupo;
  //     state.idStkGrupo;
  //   request
  //     .get(url)
  //     .set("Content-Type", "application/json")
  //     .then(res => {
  //       const stkrubroele = JSON.parse(res.text);
  //       console.log("TCL: stkrubroleecodrbygr -> stkrubroele", stkrubroele);
  //       setState({ ...state, stkrubroele: stkrubroele });
  //       setState({
  //         ...state,
  //         StkRubroAncho: stkrubroele[0].StkRubroAncho, // ! revisar esto
  //         StkRubroPresDes: stkrubroele[0].StkRubroPresDes,
  //         StkRubroPres: stkrubroele[0].StkRubroPres,
  //         StkRubroUM: stkrubroele[0].StkRubroUM
  //       });
  //     });
  //   console.log(
  //     "contenido de StkRubroUM dentro de stkrubroleecodrbygr: ",
  //     state.StkRubroUM
  //   );
  //   console.log("contenido de state dentro de stkrubroleecodrbygr: ", state);
  // };

  // const stkitemsleecodgryrb = _ => {
  //   // var id2 = state.StkItemsGrupo;
  //   const url =
  //     IpServidor +
  //     "/stkitemsleecodgryrb/?idStkGrupo=" +
  //     state.idStkGrupo +
  //     "&idStkRubro=" +
  //     state.idStkRubro;
  //   request
  //     .get(url)
  //     .set("Content-Type", "application/json")
  //     .then(res => {
  //       const stkitems = JSON.parse(res.text);
  //       setState({ ...state, stkitems: stkitems });
  //     });
  // };

  // const stkitemsleecodgrrbit = () => {
  //   var idStkItems = state.idStkItems;
  //   var idStkGrupo = state.idStkGrupo;
  //   var idStkRubro = state.idStkRubro;

  //   const url =
  //     IpServidor +
  //     "/stkitemsleecodgrrbit/?idStkItems=" +
  //     idStkItems +
  //     "&idStkGrupo=" +
  //     idStkGrupo +
  //     "&idStkRubro=" +
  //     idStkRubro;
  //   request
  //     .get(url)
  //     .set("Content-Type", "application/json")
  //     .then(res => {
  //       const stkitemse = JSON.parse(res.text);
  //       console.log("TCL: stkitemsleecodgrrbit -> stkitemse", stkitemse);
  //       // setState({ ...state, stkitemse: stkitemse });
  //       setState(state => ({
  //         ...state,
  //         StkItemsCantidad: stkitemse[0].StkItemsCantidad,
  //         StkItemsCantDisp: stkitemse[0].StkItemsCantDisp,
  //         // StkItemsFAct: stkitemse[0].StkItemsFAct,
  //         StkItemsFAct: stkitemse[0].StkItemsFAct.substr(0, 10),
  //         StkItemsMin: stkitemse[0].StkItemsMin,
  //         StkItemsMax: stkitemse[0].StkItemsMax
  //       }));

  //       // var recorte = state.StkItemsFAct.substr(0, 10);
  //       // setState({ ...state, StkItemsFAct: recorte });
  //     });
  //   console.log("TCL: stkitemsleecodgrrbit -> StkItemsMin", state.StkItemsMin);
  //   console.log(
  //     "TCL: stkitemsleecodgrrbit tipo -> StkItemsMin",
  //     typeof state.StkItemsMin
  //   );
  //   var tipo = typeof state.StkItemsMin;
  //   console.log(tipo);
  // };

  const limpioPantalla = () => {
    setState({
      // initial_state //TODO revisar esto no me pone en cero todo averiguar como poner en cero

      ...state,
      idStkGrupo: "",
      idStkRubro: "",
      idStkItems: "",
      // dialogo_imprimir: false,
      stkrubro: [],
      stkgrupo: [],
      stkitems: [],
      // stkenvaseubg: [],
      ubicacionf: [],
      stkrubroele: [],
      StkItemsGrupo: 0,
      StkItemsCantidad: 0.0,
      StkItemsCantDisp: 0.0,
      StkItemsFAct: "",
      StkItemsMin: 0.0,
      StkItemsMax: 0.0,
      StkRubroAncho: 0,
      StkRubroPresDes: "",
      StkRubroPres: "",
      StkRubroUM: "",
      cantidad: 1.0,
      largo: 0.0,
      ancho: 0.0,
      faltante: 0.0,
      total: 0.0,
      StkEnvaseUb: "",
      StkEnvaseObserv: "",
      StkEnvasePartida: ""

      // {
      // ...state,
      // stkrubro: [],
      // // stkgrupo: [],
      // stkitemse: [],
      // idStkGrupo: "",
      // idStkRubro: "",
      // idStkItems: "",
      // //   stkItems: [],stkgrupo
      // //   stkrubroele: [],
      // //   StkItemsCantidad: 0.0,
      // //   StkItemsCantDisp: 0.0,
      // //   StkItemsFAct: "",
      // // StkItemsMin: null,
      // // StkItemsMax: null,
      // //   StkRubroAncho: 0.0,
      // StkRubroPresDes: "",
      // StkRubroPres: "",
      // StkRubroUM: "",
      // //   cantidad: 1.0,
      // //   largo: 0.0,
      // //   ancho: 0.0,
      // //   faltante: 0.0,
      // //   total: 0.0,
      // //   datostraid: [],
      // //   open: true,
      // //   marcagenqr: false,
      // //   imp_conf: false,
      // //   marcaagregado: false,
      // StkEnvaseUb: "",
      // StkEnvaseObserv: "",
      // StkEnvasePartida: ""
      // //   indiceub: [],
      // //   StkItemsGrupo: [],
      // //   StkItemsRubro: "",
      // //   StkItems: [],
      // //   StkEnvaseUbF: [],
      // //   StkEnvaseUbG: []
    });
    // stkgrupoleer();
  };

  useEffect(() => {
    stkgrupoleer();
  }, []);
  useEffect(() => {
    stkrubroleercodgrupo(state.idStkGrupo); //leo rubros apartir del grupo seleccionado
  }, [state.idStkGrupo]);

  useEffect(() => {
    stkitemsleercodgryrb(state.idStkGrupo, state.idStkRubro); //leo rubros apartir del grupo seleccionado
  }, [state.idStkRubro]);

  // useEffect(() => {
  //   stkgrupoleer();
  //   console.log("primer use Effect leo grupo ");
  //   console.log("contenido de State", state);
  //   console.log("stkgrupo -> ", state.stkgrupo);
  //   console.log("stkgrupo -> ", state.stkrubro);
  //   console.log("stkgrupo -> ", state.stkitems);
  // }, []);

  // useEffect(() => {
  //   if (state.idStkGrupo != "") {
  //     stkrubroleecodgrupo(state.idStkGrupo); //leo rubros apartir del grupo seleccionado
  //   }
  //   console.log("use Effect leo Rubros  ");
  //   console.log("contenido de State", state);
  //   console.log("stkgrupo -> ", state.stkgrupo);
  //   console.log("stkrubro -> ", state.stkrubro);
  //   console.log("stkgitems -> ", state.stkitems);
  // }, [state.idStkGrupo]);

  // useEffect(() => {
  //   if (state.idStkGrupo != "" && state.idStkRubro != "") {
  //     console.log("estoy en el useEffect que lanza stkrubroleecodrbygr()");
  //     stkrubroleecodgryrb();
  //   }
  // }, [state.idStkGrupo, state.idStkRubro]);

  // useEffect(() => {
  //   if (state.idStkRubro != "") {
  //     console.log("corro stkitemsleecodgryrb() ");
  //     stkitemsleecodgryrb(); //leo items apartir del grupo y rubro seleccionados
  //   }
  // }, [state.idStkRubro]);

  useEffect(() => {
    if (state.idStkRubro != "") {
      stkitemsleecodgrrbit();
    }
  }, [state.idStkItems]);

  useEffect(() => {
    if (state.idStkItems != "") {
      stkubfisicaleerUbG(state.StkEnvaseUbG); //leo item especifico apartir del grupo y rubro seleccionado
    }
  }, [state.StkEnvaseUbG]);

  const handleChange = event => {
    const id = event.target.id;
    console.log("Nombre de evento lanzado usando id:", id);
    console.log("Nombre de evento lanzado usando [id]:", [id]);
    setState({ ...state, [id]: event.target.value }); //Todo revisar !!!!!!!!
    // setState({ ...state, id: event.target.value });
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // const handleClose = () => {
  //   // this.setState({ open: false });
  //   // this.toggleImprimir()
  //   limpioPantalla();
  //   toggleEntradaDatos();
  // };

  // Handles VARIOS REVISAR si se pueden "REDUCIR" - FIN
  //***********************************************************//

  // TODO inicio : Revisar tambien estos toggles creo que se pueden reducir a uno solo

  // const toggleState = prop => event => {
  //   setState({ ...state, [prop]: event.target.value });
  //   alert(`Cambio el estado de ${[prop]}`);
  // };

  // Manejo de Pantalla - INICIO
  // const toggleEntradaDatos = () => {
  //   // console.log("valor de toggle_entrada : "+this.state.toggle_state.entrada)
  //   setState({
  //     ...state,
  //     toggle_state: {
  //       // entrada:!prevState.toggle_state.entrada,
  //       entrada: state.toggle_state.entrada,
  //       dialogo: !state.toggle_state.dialogo,
  //       imprimir: state.toggle_state.imprimir
  //     }
  //   }); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
  // };

  // const toggleImprimir = () => {
  //   setState(...state, {
  //     toggle_state: {
  //       entrada: !state.toggle_state.entrada,
  //       dialogo: !state.toggle_state.dialogo,
  //       imprimir: !state.toggle_state.imprimir
  //     }
  //   }); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
  // };

  // TODO Fin: Hasta aca

  // const cancelaImpresion = () => {
  //   setState(...state, {
  //     toggle_state: {
  //       entrada: true,
  //       dialogo: false,
  //       imprimir: false
  //     }
  //   }); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
  //   limpioPantalla();
  // };
  // Manejo de Pantalla - FIN

  // const MarcaGenQr = () => {
  //   setState(...state, {
  //     marcagenqr: !state.marcagenqr
  //   });
  // };

  // const ImpConf = () => {
  //   setState(...state, {
  //     imp_conf: !state.imp_conf,
  //     dialogo_imprimir: !state.dialogo_imprimir
  //   });
  //   // this.toggleImprimir()
  //   toggleEntradaDatos();
  // };
  // //aca

  // const agregastock = _ => {
  //   const url =
  //     IpServidor +
  //     "/stkitemsmodstock/?id1=" +
  //     state.StkItems +
  //     "&id2=" +
  //     state.StkItemsGrupo +
  //     "&id3=" +
  //     state.StkItemsRubro; //'http://localhost:3000/data'
  //   request
  //     .post(url)
  //     .set("Content-Type", "application/json")
  //     .send({ cantidad: state.cantidad })
  //     .send({ StkRubroPres: state.StkRubroPres })
  //     .send({ StkItemsCantDisp: state.StkItemsCantDisp })
  //     .send({ StkItemsCantidad: state.StkItemsCantidad })
  //     .catch(err => {
  //       if (err.status === 414) {
  //         alert("Falta información para modificar Items  ");
  //       } else {
  //         console.log("Error nro en StkMovEntrada 1:  " + err.status);
  //       }
  //     });

  //   const url1 =
  //     IpServidor +
  //     "/stkenvaseagregar/?id1=" +
  //     state.StkItems +
  //     "&id2=" +
  //     state.StkItemsGrupo +
  //     "&id3=" +
  //     state.StkItemsRubro; //'http://localhost:3000/data'
  //   request
  //     .post(url1)
  //     .set("Content-Type", "application/json")
  //     // .send({total: Number(this.state.total)})
  //     .send({ cantidad: state.cantidad })
  //     .send({ StkRubroPres: state.StkRubroPres })
  //     .send({ StkEnvasePartida: state.StkEnvasePartida })
  //     .send({ StkEnvaseUbG: state.StkEnvaseUbG })
  //     .send({ StkEnvaseUbF: state.StkEnvaseUbF })
  //     .send({ StkEnvaseObserv: state.StkEnvaseObserv })
  //     .then(res => {
  //       // const total1 = JSON.parse(res.text)
  //       setState({ ...state, marcaagregado: true });
  //     })
  //     .catch(err => {
  //       if (err.status === 413) {
  //         alert("Falta información para agregar Envase  ");
  //       } else {
  //         console.log("Error nro en StkMovEntrada 2 :  " + err.status);
  //       }
  //     });
  //   // this.toggleImprimir()
  //   toggleEntradaDatos();
  // };

  const classes = useStyles();
  return (
    <div>
      {/* {state.toggle_state.entrada && ( // toggle_imprimir = FALSE */}

      <Container>
        <Grid container spacing={4}>
          {/* TItulo */}
          <Box
            bgcolor="grey.700"
            color="white"
            p={2}
            position="absolute"
            top={5}
            left="35%"
            zIndex="tooltip"
          >
            <Grid
              spacing={3}
              item
              container
              className={classes.root}
              justify="space-around"
              // direction="row"
              // alignItems="center"
            >
              <Typography
                variant="h3"
                // component="h2"
              >
                Entradas de stock
              </Typography>
            </Grid>
          </Box>
          {/* Todo: Ver estas lineas como las puedo reeemplazar estan para dar mejor aspecto */}
          {/* <br></br>
          <br></br>
          <br></br>
          <br></br> */}

          {/* Fila de la Fecha */}

          <Grid container item spacing={1} alignItems="center" justify="center">
            <TextField
              size="small"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              type="date"
              id="FechaAct"
              label="Fecha Actualización"
              value={state.StkItemsFAct}
              disabled
              className={classes.textField}
            />
          </Grid>
          {/* <br></br>
          <br></br>
          <br></br> */}

          {/* Fila -  Grupo, Rubro, Items, Cantidad Disponible, Cantidad, Minimo Stock, Maximo Stock, */}

          <Grid item container spacing={1}>
            <Grid item container xs={6} spacing={1} alignItems="center">
              {/* <Grid direction="column" alignItems="flex-end" justify="center"> */}
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField
                  id="idStkGrupo"
                  size="small"
                  select
                  label="Grupo"
                  fullWidth
                  value={state.idStkGrupo} //todo mirar que valor poner puse este de forma arbitraria para ver si borra
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                  variant="outlined"
                  // className={classes.textField_370}
                >
                  <option></option>
                  {console.log(
                    "state.stkgrupo dentro de option :",
                    state.stkgrupo
                  )}
                  {state.stkgrupo.map(option => (
                    <option key={option.idStkGrupo} value={option.idStkGrupo}>
                      {option.StkGrupoDesc}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="idStkRubro"
                  select
                  label="Rubro"
                  fullWidth
                  value={state.idStkRubro} //todo mirar idem grupo
                  // onChange={() => handleChangeRubro("idStkRubro")}
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                  // className={classes.textField_150}
                >
                  <option></option>
                  {state.stkrubro.map(option => (
                    <option key={option.idStkRubro} value={option.idStkRubro}>
                      {option.StkRubroDesc}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="idStkItems"
                  select
                  label="Items"
                  fullWidth
                  value={state.idStkItems} //todo idem grupo
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                  // className={classes.textField_150}
                >
                  <option></option>
                  {state.stkitems.map(option => (
                    <option key={option.idStkItems} value={option.idStkItems}>
                      {option.StkItemsDesc}
                    </option>
                  ))}
                </TextField>
              </Grid>
              {/* </Grid> */}
            </Grid>

            {/* Cantidad Disponible, Cantidad, Minimo Stock, Maximo Stock */}

            <Grid
              item
              container
              direction="row"
              justify="center"
              xs={6}
              spacing={2}
            >
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="CantDisp"
                  label="Cantidad Disponible"
                  value={state.StkItemsCantDisp}
                  style={
                    state.StkItemsCantDisp < state.StkItemsMin
                      ? { background: "#f92c19" }
                      : { background: "#00e676" }
                  }
                  // fullWidth={true}
                  disabled
                  // className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="Cantidad"
                  label="Cantidad "
                  value={state.StkItemsCantidad}
                  style={
                    state.StkItemsCantidad < state.StkItemsMin
                      ? { background: "#f92c19" }
                      : { background: "#00e676" }
                  }
                  // className={classes.textField}
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="MinStock"
                  label="Mínimo Stock"
                  InputLabelProps={{ shrink: true }}
                  value={state.StkItemsMin}
                  disabled
                  // className={classes.textField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="MaxStock"
                  label="Máximo Stock"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={state.StkItemsMax}
                  disabled
                  // className={classes.textField}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Segunda linea FIN */}

          {/* Fila Cantidad/ StkRubroPresDes / StkRubroPres / StkRubroUM */}
          {/* <Grid container item spacing={1}></Grid> */}
          <Grid container spacing={8} justify="space-between">
            {/* <Grid container spacing={8} justify="space-around"> */}
            {/* <Grid item xs={2}></Grid> */}
            <Grid item xs={2}>
              <TextField
                size="small"
                variant="outlined"
                id="cantidad"
                label="Cantidad"
                type="number"
                fullWidth
                value={state.cantidad}
                onChange={handleChange}
                autoFocus={true}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                size="small"
                variant="outlined"
                label=" "
                id="StkRubroPresDes"
                // type="Number"
                // fullWidth
                value={state.StkRubroPresDes}
                // onChange={() => handleChange("StkRubroPres")}
                // onChange={handleChange}
                autoFocus={true}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                size="small"
                variant="outlined"
                label=" "
                id="StkRubroPres"
                // type="Number"
                // fullWidth
                value={state.StkRubroPres}
                onChange={handleChange}
                autoFocus={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">de: </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                size="small"
                variant="outlined"
                id="StkRubroUM"
                label=" "
                fullWidth
                value={state.StkRubroUM}
                // value="escribir aca"
                // type="number"
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                size="small"
                variant="outlined"
                id="StkRubroAncho"
                label="Ancho"
                type="number"
                fullWidth
                value={state.StkRubroAncho}
                onChange={handleChange}
                autoFocus={true}
                // className={classes.textField_60}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">x</InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          {/* Tercer Linea */}
          <Grid container item spacing={1}></Grid>
          <Grid container justify="space-between">
            {/* Partida Ubicación-Geografica Ubicación-Fisica */}
            <Grid
              item
              container
              // direction="column"
              xs={6}
              spacing={2}
              // alignItems="flex-center"
            >
              {/* <Grid item xs></Grid> */}
              {/* <Grid item xs={2}></Grid> */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="StkEnvasePartida"
                  type="text"
                  label="Partida"
                  fullWidth
                  value={state.StkEnvasePartida}
                  // onChange={() => handleChange("StkEnvasePartida")}
                  onChange={handleChange}
                  // className={classes.textField_150}
                ></TextField>
              </Grid>
              {/* <Grid item xs={2}></Grid>
              <Grid item xs={4}></Grid> */}
              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  id="StkEnvaseUbG"
                  select
                  label="Ubicación Geografica"
                  fullWidth
                  // value={this.state.indiceub}
                  value={state.StkEnvaseUbG}
                  // onChange={() => handleChangeUbicacion("StkEnvaseUbG")}
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                  className={classes.textField_150}
                  InputLabelProps={{ shrink: true }}
                >
                  <option></option>

                  {/* {this.state.ubicacion.map(option => ( */}
                  {ubicacion.map(option => (
                    <option key={option.indiceub} value={option.indiceub}>
                      {option.detalleub}
                    </option>
                  ))}
                </TextField>
              </Grid>
              {/* <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid> */}
              <Grid item xs={4}>
                <TextField
                  // size="small"
                  variant="outlined"
                  id="StkEnvaseUbF"
                  select
                  label="Ubicación Física"
                  fullWidth
                  value={state.StkEnvaseUbF}
                  // onChange={() => handleChange("StkEnvaseUbF")}
                  onChange={handleChange}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                  className={classes.textField_150}
                >
                  <option></option>
                  {state.ubicacionf.map(option => (
                    <option
                      key={option.idStkUbFisica}
                      value={option.idStkUbFisica}
                    >
                      {option.idStkUbFisica}
                    </option>
                  ))}
                </TextField>
                {/* <Grid item xs={4}></Grid> */}
              </Grid>
            </Grid>
            {/* </Grid> */}
            {/* <Grid item container xs={6} spacing={2} alignItems="flex-start"> */}
            <Grid item xs>
              <TextField
                // multiline
                // rows="3"
                size="small"
                variant="outlined"
                id="StkEnvaseObserv"
                type="text"
                label="Observación"
                fullWidth
                value={state.StkEnvaseObserv}
                // onChange={() => handleChange("StkEnvaseObserv")}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid container justify="flex-end">
              <IconButton onClick={limpioPantalla}>
                <DeleteIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                // onClick={agregastock}
              >
                Confirmar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setDialog(false)}
              >
                Cerrar
              </Button>
            </Grid>
            {/* </Grid> */}
          </Grid>

          {/* </DialogContent> */}
          {/* <DialogActions> */}

          {/* </DialogActions> */}
          {/* </Dialog> */}
          {/* </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};
export default StkMovEntrada;
