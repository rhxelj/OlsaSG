import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaAbanico(props) {
  const { state, setState } = useContext(PresupPantContext);


  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  // const tamcristal = (event) => {
  //   setCristal(event.target.value);
  //   setState({ ...state, TamCristal: event.target.value });
  // };

  const voladods = (event) => {
    setState({ ...state, VolDS: event.target.value });
  };

  const fajadebrazo = [
    {
      id: "FajaBrazoEleg",
      label: "Faja para Brazo :",
      value: state.value,
      mapeo: (
        <>
          <option></option>
          {state.FajaBrazo.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}

            </option>
          ))}
        </>
      ),
    },
  ];


  const classes = useStyles();


  return (
    <>


      <Grid item xs={1} >
        <TextField
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="CantBrazos"
          type="number"
          margin="dense"
          label="Cantidad Brazos : "
          fullWidth
          value={state.CantBrazos}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={1} >
        <TextField
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="LargoBrazo"
          type="number"
          margin="dense"
          label="Largo Brazos : "
          fullWidth
          value={state.LargoBrazo}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={1}>
        {fajadebrazo.map(data => (
          <TextField
            id={data.id}
            key={data.id}
            // size="small"
            fullWidth
            select
            label={data.label}
            margin="dense"
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
            helperText='Brazos de?'
          >
            {data.mapeo}
          </TextField>
        ))}
      </Grid>
      <Grid item xs={1} >
        <TextField
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="AltoVolado"
          type="number"
          label="Volado en cm :  "
          fullWidth
          margin="dense"
          value={state.AltoVolado}
          onChange={handleChange}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="Volado"
          value={state.VolDS}
          onChange={voladods}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="S"
            control={<Radio />}
            label="Simple"
            labelPlacement="top"
            disabled={props.enable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="D"
            control={<Radio />}
            label="Doble"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
        </RadioGroup></Grid>

    </>
  );
}
