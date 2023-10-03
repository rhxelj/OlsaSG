import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ComboBCC from "../../../../../../../lib/ComboBCC";
// import { agregaStock } from "../../agregaStock";
import Confirmacion from "./Confirmacion";

import { useContext } from "react";

import { StkMovSalidaContext } from '../StkMovSalida'

import { initial_state } from '../Initial_State'

import { verificaDisp } from "../verificaDisp";
import { descargaStock } from "../descargaStock"
import { Exito } from "../../../../../../../../Ui-Components/Exito"
export default function Fila() {
  const { state, setState } = useContext(StkMovSalidaContext);

  //Control del Dialogo INICIO
  // const [open, setOpen] = React.useState(false);
  // const [cantidaddisponible, setCantidaddisponible] = React.useState(false);

  async function confirmar() {
    const [faltante, total] = await verificaDisp(state);
    setState({
      ...state,
      total: total,
      faltante: faltante
    }); // las hago global en el contexto de Movimiento de Salida
   
  }
  useEffect(() => {
    // variablesAuxiliares()
    // estado()

    if (state.faltante > 0) {
      setState({ ...state, confOpen: true })//ToDo: pongo confOpen en true
      //   //ToDo: muestro las opciones verificado / cancelar
    } else {
      descargaStock(state)
      // setState({ ...state, exito: true }) //ToDo: muestro cartel de Exito
      setState(initial_state)
    }
  }, [state.total, state.faltante]); // eslint-disable-line react-hooks/exhaustive-deps


  // function afuera() {
  //   console.log("Contenido de state fuera de la fuicnion confirmar => ", state)
  // }
  const actions = {
    confirmAction: () => confirmar(), //Accion a ejecutar en caso de Aceptar
    cancelAction: () => setState(initial_state), //Accion a ejecutar en caso de cancelar
    confirmText: "CONFIRMAR", //Texto en caso de afirmativo
    cancelText: "CANCELAR", //Texto en caso de No afirmativo
  };

  return (
    <>
      <Grid container item spacing={2} justify="flex-end">
        <ComboBCC actions={actions} />
        < Confirmacion
          open={state.confOpen}
          title="Movimiento de Salida"
          contentText={`ATENCION NO ALCANZA EL STOCK`}
        />
        <Exito open={state.exito} closeAction={actions.cancelAction} />
      </Grid>
    </>
  );
}
