import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// import { imprimirQr } from "../../../../../Impresion/ImprimirEtiquetas/imprimirQR";
import { useContext } from "react";
import { StkMovEntradaContext } from "../../StkMovEntrada";
// import { initial_state } from "../../../../../Monedas/Constants";

export default function AlertDialog(props) {
  const { state, setState } = useContext(StkMovEntradaContext);
  const { title, contentText } = props;
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    /* sacado el 2-11-2021 para por ahora no imprimir etiquetas 
       setState({ ...state, imp_etiquetas: true, confOpen: false });*/
    setState({ ...state, confOpen: false, marcasalidaconf: true })
  };



  return (
    <div>
      <Dialog
        open={state.confOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
