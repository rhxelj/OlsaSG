import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
}
  from "@material-ui/core";
// import DialogActions from "@material-ui/core/DialogActions";
import useStyles from "../styles";


// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

import { clientesleerdescmayigual } from "../../../Clientes/ClientesLeerDesc";
import { PresupGrabar } from "../../PresupGrabar";
// import PresupMostrar from "../../PresupMostrar";

import { clientesleercod } from '../../../Clientes/ClientesLeerCod'
import { PresupImprime } from "../PresupImprime"
import PresupDetPieSelec from './PresupDetPieSelec'
import { PresupPreview } from "../PresupPreview"
// import { AddAlertTwoTone, Pause } from "@material-ui/icons";

export default function FilaCuatro(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  //const { open, handleClose } = props;
  // var { open } = props;

  // const [marcacliente, setMarcaCliente] = React.useState(false);
  // const [idClienteEleg, setidClienteEleg] = React.useState(0);
  // const [nomClienteEleg, setnomClienteEleg] = React.useState('');
  const [ppreview, setPPreview] = useState({ ppreview: false });

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function clientesleerdescrip() {
    const result = await clientesleerdescmayigual(state.ClientesDesc);
    setState({ ...state, clientes: result });
  }

  useEffect(() => {
    clientesleerdescrip();
  }, []);  //  eslint-disable-line react-hooks/exhaustive-deps
  // }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  async function grabarpresupuesto() {

    var idClienteElegE, nomClienteElegE;
    var descrip = state.DescripPresup
    var telcliente = state.telCliente
    if (state.idClientes !== 0) {
      // if (state.nomCliente === '') {
      idClienteElegE = state.idClientes
      const datoscliente = await clientesleercod(idClienteElegE);
      nomClienteElegE = datoscliente[0].ClientesDesc
      telcliente = datoscliente[0].ClientesTel
    }
    else {
      idClienteElegE = 0
      nomClienteElegE = state.nomCliente
    }
    // const nroPresupuesto1 = 0

    const nroPresupuesto1 = await PresupGrabar(props, nomClienteElegE, idClienteElegE);
    setState({ ...state, NroPresupuesto: nroPresupuesto1 });
    PresupImprime(props.datos, nomClienteElegE, telcliente, props.suma, nroPresupuesto1, descrip, state.condpagoeleg)



    //cancelar();
    cierrafilacuatro();
  }


  function cierrafilacuatro() {
    props.setOpen({ filacuatro: false });
    // open = false
  }



  const textdata = [
    {
      id: "idClientes",
      value: state.idClientes,
      mapeo: (
        <>
          <option></option>
          {state.clientes.map((option) => (
            <option key={option.idClientes} value={option.idClientes}>
              {option.ClientesDesc}
            </option>
          ))}
        </>
      ),
    },
  ];

  const classes = useStyles();
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.open}

      //  keepMounted
      // onClose={props.handleClose}
      // onClose={handleClose}
      // aria-labelledby="alert-dialog-slide-title"
      // aria-describedby="alert-dialog-slide-description"
      >
        <PresupDetPieSelec></PresupDetPieSelec>
        {/* <DialogTitle id="simple-dialog-title">Cliente Presupuesto</DialogTitle> */}
        <h3>Cliente Presupuesto</h3>

        <TextField
          inputProps={{ maxLength: 20 }}
          size="small"
          variant="outlined"
          id="nomCliente"
          type="text"
          label="Nombre Cliente Ocacional"
          fullWidth
          margin="dense"
          value={state.nomCliente}
          onChange={handleChange}
          className={classes.textField}
        />

        <TextField
          inputProps={{ maxLength: 20 }}
          size="small"
          variant="outlined"
          id="telCliente"
          type="text"
          label="Teléfono Cliente Ocacional"
          fullWidth
          margin="dense"
          value={state.telCliente}
          onChange={handleChange}
          className={classes.textField}
        />


        <label>Cliente Existente</label>
        {textdata.map((data) => (
          <TextField
            key={data.id}
            id={data.id}
            //está agregado este key para que no dé el famoso warning
            size="small"
            inputProps={{ maxLength: 20 }}
            select
            label={data.label}
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
            fullWidth
          >
            {data.mapeo}
          </TextField>
        ))}

        <PresupPreview open={ppreview.ppreview} setOpen={setPPreview}></PresupPreview>

        <DialogActions>
          <Button onClick={cierrafilacuatro} color="secondary">
            Cancelar
          </Button>
          <Button onClick={grabarpresupuesto} color="primary" autoFocus>
            Graba Presupuesto
          </Button>

        </DialogActions>

      </Dialog>
    </>
  );
}
