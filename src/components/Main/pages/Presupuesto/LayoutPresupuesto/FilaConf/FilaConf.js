import React, { useState, useEffect } from "react";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo"

export default function FilaConf(props) {
  const [selectedValue, setSelectedValue] = React.useState("cs");
  const { state, setState } = useContext(PresupPantContext);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupCsSs: event.target.value });
  };


  const classes = useStyles();



  return (
    <>
      <Grid container item xs={12}>
        {/* <Grid container item direction="row" xs={12}> */}
        {/* <Grid item spacing={3} xs={12}> */}
        <RadioGroup
          row
          aria-label="Tipo de Dobladillo"
          name="tipoDobladillo"
          value={selectedValue}
          onChange={handleChange}
        >
          <Grid item xs={6}>
            <FormControlLabel
              value="cs"
              control={<Radio />}
              label="C/Soga"
              labelPlacement="top"
              disabled={props.disable}
            />
          </Grid>
          {/* <Grid item spacing={3} xs={12}> */}
          <Grid item xs={6}>
            <FormControlLabel
              value="ss"
              control={<Radio />}
              label="S/Soga"
              labelPlacement="top"
              disabled={props.disable}
            />
          </Grid>
        </RadioGroup>

      </Grid>

    </>
  );
}
