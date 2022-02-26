import React from "react";
import Radio from "@material-ui/core/Radio";
import { Grid } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function TipoProducto() {
  const [selectedValue, setSelectedValue] = React.useState("PAE");
  const { state, setState } = useContext(PresupPantContext);


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupProducto: event.target.value });
  };

  return (
    <>
      <RadioGroup
        row
        size="small"
        name="tipoProducto"
        value={selectedValue}
        onChange={handleChange}
        margin="dense"
        color='primary'
      >
        <Grid item xs={6}>
          <FormControlLabel
            value="PE"
            control={<Radio />}
            label="Elab"
            labelPlacement="top"
            margin="dense"

          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            value="PAE"
            control={<Radio />}
            label="a-El."
            labelPlacement="top"
            margin="dense"

          />
        </Grid>
      </RadioGroup>
      {/* } */}

    </>
  );
}
