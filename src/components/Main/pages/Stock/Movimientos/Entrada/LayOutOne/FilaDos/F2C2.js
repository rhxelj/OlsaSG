import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";

import { TextField } from "@material-ui/core";

import { stkgrupolee } from "../../../../Grupos/StkGrupoLee";
import { stkrubroleecodgrupo } from "../../../../Rubros/StkRubroLeeCodGrupo";
import { stkitemsleecodgryrb } from "../../../../Items/StkItemsLeeCodGryRb";
import { stkitemsleecodgrrbit } from "../../../../Items/StkItemsLeeCodGrRbIt";
// import StkMovEntradaDatItems from "./StkMovEntradaDatItems";
// import { initial_state } from "./Initial_State";
//

// Context
import { useContext } from "react";
import { StkMovEntradaContex } from "../../StkMovEntrada";

var initial_state = {
  stkitemsele: [],
  StkItemsFAct: "",
  StkItemsMin: null,
  StkItemsMax: null,
  StkItemsCantDisp: 0,
  StkItemsCantidad: 0
};

export default function F2C2(props) {
  var [state, setState] = useState(initial_state);

  // Context
  const value = useContext(StkMovEntradaContex);

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function stkitemsleercodgrrbit(GrupoEleg, RubroEleg, ItemEleg) {
    const result = await stkitemsleecodgrrbit(GrupoEleg, RubroEleg, ItemEleg);
    setState(state => ({
      ...state,
      StkItemsCantidad: result[0].StkItemsCantidad,
      StkItemsCantDisp: result[0].StkItemsCantDisp,
      StkItemsFAct: result[0].StkItemsFAct,
      StkItemsMin: result[0].StkItemsMin,
      StkItemsMax: result[0].StkItemsMax
    }));
  }

  useEffect(() => {
    stkitemsleercodgrrbit(
      value.data.idStkGrupo,
      value.data.idStkRubro,
      value.data.idStkItems
    );
  }, [value.data.idStkItems]);

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        item
        spacing={8}
        xs={6}
      >
        {/* Cantidad Disponible */}
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
            label="Cantidad Real"
            InputLabelProps={{ shrink: true }}
            value={state.StkItemsCantidad}
            disabled
            // className={classes.textField}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}>Minimo Stock</Paper> */}
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
          {/* <Paper className={classes.paper}>Maximo Stock</Paper> */}
          <TextField
            size="small"
            variant="outlined"
            id="MaxStock"
            label="Máximo Stock"
            type="number"
            InputLabelProps={{ shrink: true }}
            value={state.StkItemsMax}
            disabled
          />
        </Grid>
      </Grid>
    </>
  );
}
