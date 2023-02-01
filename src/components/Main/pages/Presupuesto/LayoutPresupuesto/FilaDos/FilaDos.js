import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import { TextField } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { stkrubroleeconf } from "../../../Stock/Rubros/StkRubroLeeConf";
import { presupcalculador } from "../../PresupCalculador";



import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import {
  red,
} from "@material-ui/core/colors";
// import { presupgrabar } from "../../PresupGrabar";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import TablaPresup from "../TablaPresup/TablaPresup";
import FilaConf from "../FilaConf/FilaConf";
import FilaEnrollables from "../FilaEnrollables/FilaEnrollables";
import FilaTanques from "../FilaTanques/FilaTanques"
import FilaPiletasEnr from "../FilaPiletas/FilaPiletasEnr"
import FilaToldosExt from "../FilaToldosExt/FilaToldosExt";
import FilaDetDesc from "./FilaDetDesc"
import FilaCargaDesc from "./FilaCargaDesc";
import FilaAbolinada from "../FilaAbolinada/FilaAbolinada"
import FilaComedero from "../FilaComedero/FilaComedero"
import FilaCambPanio from "../FilaCambPanio/FilaCambPanio"
import FilaModMed from "../FilaModMed/FilaModMed";
import FilaAbanico from "../FilaAbanico/FilaAbanico";


export default function FilaDos() {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  const { datosrenglon, setDatosRenglon } = useContext(PresupPantContext);

  // según el presupuesto elegido, lee la tabla y se decide que pide
  const [selectedValue, setSelectedValue] = React.useState("REC");
  if (state.DatosPresupEleg.length !== 0) {
    var largo = state.DatosPresupEleg[0].PresupConfTipoLargo;
    var ancho = state.DatosPresupEleg[0].PresupConfTipoAncho;
    var presuptipo = state.DatosPresupEleg[0].PresupConfTipoDesc;

    //esto es porque va a ser un cálculo especial, tiene un backend para eso
    var rubrosn = ''
    // var labellargo = 'Largo'
    // var labelancho = 'Ancho'
    state.labellargo = 'Largo'
    state.labelancho = 'Ancho'
    if (state.DatosPresupEleg[0].PresupConfTipoRubro === "VS") {
      rubrosn = "S";
    } else {
      rubrosn = "N";
    }

    if (presuptipo === "LONAS ENROLLABLES" || presuptipo === "TOLDO BARRACUADRA") {
      state.labellargo = 'Alto'
    }
    if (presuptipo === "CARGA DESCRIPCION") {
      state.labellargo = 'Importe'
    }
    if (presuptipo === "CAMBIO PISO PILETA") {
      state.labellargo = 'Largo/Diametro'
    }
    if (presuptipo === "CAMBIO PAÑO") {
      state.labelancho = 'Ancho Lona'
      state.labellargo = 'Paños en metros'
    }
    if (presuptipo === "MODIFICA MEDIDAS") {
      state.labelancho = 'Ancho Actual'
      state.labellargo = 'Largo Actual'
    }

  }

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function stkrubroleerconf(cuallee) {
    const result = await stkrubroleeconf(cuallee);
    setState({ ...state, stkrubro: result });
  }

  useEffect(() => {
    if (presuptipo === "UNIDAD") {
      stkrubroleerconf('T');
    } else {
      stkrubroleerconf('S');
    }
  }, [presuptipo]);  // eslint-disable-line react-hooks/exhaustive-deps

  async function agregar() {

    var dcalculo = [
      {
        StkRubroAbr: state.StkRubroAbr,
        minmay: state.PresupMnMy,
        ivasn: state.PresupIVA,
        cantidad: state.PresupCantidad,
        largo: state.PresupLargo,
        ancho: state.PresupAncho,
        largon: state.PresupLargoN,
        anchon: state.PresupAnchoN,
        tipoconf: state.PresupCsSs,
        tipoojale: state.PresupOB,
        drenajesn: state.PresupDrenaje,
        detallep: state.DetallePresup,
        detaller: state.DetalleRenglon,
        tamfaja: state.TamFaja,
        tamcristal: state.TamCristal,
        altovolado: state.AltoVolado,
        presupojalesc: state.PresupOjalesC,
        sobrantemarco: state.SobranteMarco,
        tipomedeleg: state.TipoMedidaEleg,
        termbordeeleg: state.TermBordeEleg,
        anchopared: state.AnchoPared,
        medida: state.Medida,
        //para el alto del tanque
        alto: state.Alto,
        stkrubroabrtbr: state.StkRubroAbrTBR,
        tipomecanismo: state.TipoMecanismo,
        anchocomedero: state.AnchoComederoEleg,
        lonanuestraafuera: state.PreuspLNLF,
        cantbrazos: state.CantBrazos,
        largobrazo: state.LargoBrazo,
        voladosd: state.VolDS,
        fajabrazo: state.FajaBrazoEleg,
        tipopresup: presuptipo
      },
    ];

    var StkRubroDesc = "";
    var PresupLargo = 0;
    var PresupAncho = 0;
    var ImpUnitario = 0;
    var importeanexo = 0;
    var ImpItem = 0;
    var PresupCantidadM = state.PresupCantidad;
    var detalle = presuptipo;


    var datoscalculos = JSON.stringify(dcalculo);

    const datosrenglon1 = await presupcalculador(
      state.DatosPresupEleg[0],
      datoscalculos,
      presuptipo
    );
    //esto es porque va a ser un cálculo especial, tiene un backend para eso
    if (rubrosn === "S") {
      var unidmed = ''
      if (datosrenglon1[0][0].StkRubroUM) {
        unidmed = datosrenglon1[0][0].StkRubroUM + ' '
      }
      StkRubroDesc =
        unidmed +
        datosrenglon1[0][0].Detalle +
        datosrenglon1[0][0].StkRubroDesc;

      if (datosrenglon1[0][0].MDesc === 'S') {
        StkRubroDesc = StkRubroDesc +

          " " + state.DescripPresup +
          " " + state.DetalleRenglon
      }
      ImpUnitario = datosrenglon1[0][0].ImpUnitario;
      ImpItem = datosrenglon1[0][0].ImpUnitario * PresupCantidadM;
      PresupLargo = datosrenglon1[0][0].Largo;
      PresupAncho = datosrenglon1[0][0].Ancho;

      importeanexo = 0

      if (state.renglonanexo.length !== 0) {

        importeanexo = state.renglonanexo.ImpItemAnexo
        ImpUnitario = ImpUnitario * 1 + importeanexo
        ImpItem = ImpItem + importeanexo * state.PresupCantidad;
        StkRubroDesc = StkRubroDesc + state.renglonanexo.StkRubroDesc;
      }
      //acá veo si es paño unido o no porque sino tiene ancho o largo en 0, no es confección

      if (PresupLargo === 0 || PresupAncho === 0) {
        ImpItem = ImpUnitario * 1;
      }


      if (PresupLargo === 0 && PresupAncho === 0) {
        ImpItem = datosrenglon1[0][0].ImpUnitario * PresupCantidadM;
      }
    }




    else {
      StkRubroDesc = detalle;
      ImpUnitario = datosrenglon1[0]
      ImpItem = datosrenglon1[0] * PresupCantidadM;
    }
    if (presuptipo === "MODIFICA MEDIDAS") {
      PresupLargo = '-'
      PresupAncho = '-'
    }
    var datospresup = [
      {
        PresupCantidad: state.PresupCantidad,
        StkRubroDesc,
        PresupLargo,
        PresupAncho,
        ImpUnitario,
        ImpItem,
        dcalculo,
      },
    ];

    if (state.renglonanexo.length !== 0) {
      setDatosRenglon([...datosrenglon, state.renglonanexo]);
      setDatosRenglon([...datosrenglon, datospresup[0]]);
    } else {
      setDatosRenglon([...datosrenglon, datospresup[0]]);
    }

  }

  const classes = useStyles();
  const textdata = [
    {
      id: "StkRubroAbr",
      label: "Rubro",
      value: state.StkRubroAbr,
      mapeo: (
        <>
          <option></option>
          {state.stkrubro.map((option) => (
            <option key={option.idStkItems} value={option.StkRubroAbr}>
              {option.StkRubroDesc}
            </option>
          ))}

        </>
      ),
    },
  ];
  return (
    <>

      {rubrosn === "S" &&
        state.stkrubro.length > 0 &&

        textdata.map((data) => (
          <TextField
            key={data.id}
            id={data.id}
            size="small"
            inputProps={{ maxLength: 3 }}
            select
            label={data.label}
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
            margin="dense"
          >
            {data.mapeo}
          </TextField>
        ))}
      {presuptipo !== "MODIFICA MEDIDAS" &&
        <Grid item xs={1}>
          <TextField
            inputProps={{ maxLength: 5 }}
            size="small"
            variant="outlined"
            id="PresupCantidad"
            type="number"
            label="Cantidad"
            fullWidth
            margin="dense"
            value={state.PresupCantidad}
            onChange={handleChange}
            className={classes.textField}
          // onKeyPress={(event) => {
          //   if (event.key === "Enter")
          //     document.getElementById("idStkRubro").focus();
          // }}
          />
        </Grid>}


      <Grid item xs={1} >
        <TextField
          disabled={largo === "N"}
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="PresupLargo"
          type="number"
          label={state.labellargo}
          fullWidth
          margin="dense"
          value={state.PresupLargo}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          disabled={ancho === "N"}
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="PresupAncho"
          type="number"
          label={state.labelancho}
          // helperText={state.labelancho}
          fullWidth
          margin="dense"
          value={state.PresupAncho}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      {presuptipo === "MODIFICA MEDIDAS" &&
        <Grid item xs={1}>
          <TextField
            // disabled={ancho === "N"}
            inputProps={{ maxLength: 3 }}
            size="small"
            variant="outlined"
            id="PresupLargoN"
            type="number"
            // label="Ancho"
            label={state.labellargoN}
            fullWidth
            margin="dense"
            value={state.PresupLargoN}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>}
      {presuptipo === "MODIFICA MEDIDAS" &&
        <Grid item xs={1}>
          <TextField
            //    disabled={ancho === "N"}
            inputProps={{ maxLength: 3 }}
            size="small"
            variant="outlined"
            id="PresupAnchoN"
            type="number"
            // label="Ancho"
            label={state.labelanchoN}
            fullWidth
            margin="dense"
            value={state.PresupAnchoN}
            onChange={handleChange}
            className={classes.textField}
          />
        </Grid>}

      <Grid container item xs={12}>
        {/* < FilaConf disable={!(presuptipo === "CONFECCIONADA")}></FilaConf> */}
        {presuptipo === "CONFECCIONADA" && <FilaConf></FilaConf>}
        {presuptipo === "MODIFICA MEDIDAS" && <FilaModMed></FilaModMed>}
        {presuptipo === "LONAS ENROLLABLES" && <FilaEnrollables></FilaEnrollables>}
        {presuptipo === "BOLSON PARA TANQUE" && <FilaTanques></FilaTanques>}
        {presuptipo === "PILETA ENROLLABLE" && <FilaPiletasEnr></FilaPiletasEnr>}
        {presuptipo === "PILETA CAÑOS ALUMINIO" && <FilaPiletasEnr></FilaPiletasEnr>}
        {presuptipo === "TOLDO BARRACUADRA" && <FilaToldosExt></FilaToldosExt>}
        {presuptipo === "ABOLINADA" && <FilaAbolinada></FilaAbolinada>}
        {presuptipo === "COMEDERO" && <FilaComedero></FilaComedero>}
        {presuptipo === "CAMBIO PAÑO" && <FilaCambPanio></FilaCambPanio>}
        {presuptipo === "TOLDO ABANICO" && <FilaAbanico></FilaAbanico>}
        {/* {(presuptipo !== "UNIDAD" && rubrosn === "S" && presuptipo !== "CARGA DESCRIPCION") ? <FilaDetDesc></FilaDetDesc> : <></>} */}
        {(presuptipo === "CARGA DESCRIPCION") ? <FilaCargaDesc></FilaCargaDesc> : <></>}
        {(presuptipo !== "UNIDAD" && rubrosn === "S") ? <FilaDetDesc presuptipo={presuptipo}></FilaDetDesc> : <></>}
        <IconButton
          onClick={() => agregar()}
          color="primary" >
          <AssignmentReturnedIcon style={{ color: red[500] }} fontSize='large' titleAccess='Agregar' />
        </IconButton>

      </Grid>
      <TablaPresup
        data={datosrenglon}
      />

    </>
  );
}
