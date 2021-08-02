import request from "superagent";

import IpServidor from "../VariablesDeEntorno";
import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
}
  from "@material-ui/core";
// import DialogActions from "@material-ui/core/DialogActions";
import { useContext } from "react";
import { PresupPantContext } from "../Presupuesto/PresupPant"
// export const PresupMostrar = (props, nomCliente, idClientes) => {
export default function PresupMostrar() {

  // const { state, setState } = useContext(PresupPantContext);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        // open={open}
        keepMounted
        //   onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <label>Presup Mostrar</label>

      </Dialog>



    </div>
  )
}

