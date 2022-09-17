import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid } from "@material-ui/core";
import FormHelperText from '@material-ui/core/FormHelperText';
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaPiletasEnr(props) {
  const [selectedValue, setSelectedValue] = React.useState("cd");
  const { state, setState } = useContext(PresupPantContext);
  const [ojalbronce, setOjalBronce] = React.useState('hz');
  // const [DescripPresup, setDescripPresup] = React.useState('')
  // var [DetallePresup, setDetallePresup] = React.useState('')



  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setState({ ...state, PresupDrenaje: event.target.value });
  };

  const handleChange2 = (event) => {
    setOjalBronce(event.target.value);
    setState({ ...state, PresupOB: event.target.value });
  };





  return (
    <>

      <Grid item xs={2} >

        <RadioGroup
          row
          size="small"
          name="Drenajesn"
          value={selectedValue}
          onChange={handleChange}
          margin="dense"

        >

          <FormControlLabel
            size="small"
            value="cd"
            control={<Radio />}
            label="C/D"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"

          />
          <FormControlLabel
            size="small"
            value="sd"
            control={<Radio />}
            label="S/D"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
        <FormHelperText margin='dense'>Drenaje</FormHelperText>
      </Grid>
      <Grid item xs={2}>
        <RadioGroup
          row
          size="small"
          name="tipoOjal"
          value={ojalbronce}
          onChange={handleChange2}
          margin="dense"
        >

          <FormControlLabel
            size="small"
            value="hz"
            control={<Radio />}
            label="HZ"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />
          <FormControlLabel
            size="small"
            value="br"
            control={<Radio />}
            label="BR"
            labelPlacement="top"
            disabled={props.disable}
            margin="dense"
          />

        </RadioGroup>
        <FormHelperText margin='dense'>Ojales</FormHelperText>
      </Grid>


    </>
  );
}
