import React, { useEffect } from "react";
import {
  TextField,
  Grid,
}
  from "@material-ui/core";
import { clientesleerdescmayigual } from "../../../Clientes/ClientesLeerDesc";

// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";

export default function Encabezado() {
  const { state, setState } = useContext(OrdenTrabajoPantContext);


  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function clientesleerdescrip() {
    const result = await clientesleerdescmayigual('');
    setState({ ...state, clientes: result });
  }

  useEffect(() => {
    clientesleerdescrip();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


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
  return (
    <>
      <Grid item >
        {textdata.map(data => (
          <TextField
            id={data.id}
            key={data.id}
            size="small"
            select
            label={data.label}
            margin="dense"
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
          >
            {data.mapeo}
          </TextField>
        ))}
        {/* <IconButton onClick={() => limpia()} color="primary" >
          <AssignmentReturnedIcon style={{ color: green[500] }} fontSize='large' titleAccess='Agregar' />
        </IconButton> */}
      </Grid>

    </>
  );

}
