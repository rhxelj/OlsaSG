import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaComedero(props) {
  // const [selectedValue, setSelectedValue] = React.useState(20);
  const { state, setState } = useContext(PresupPantContext);
  const [ojalbronce, setOjalBronce] = React.useState('hz');

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };


  const handleChange2 = (event) => {
    setOjalBronce(event.target.value);
    setState({ ...state, PresupOB: event.target.value });
  };


  const anchocom = [
    {
      id: "AnchoComederoEleg",
      label: "Ancho Comedero",
      value: state.value,
      mapeo: (
        <>
          <option></option>
          {state.AnchoComedero.map((option) => (
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
      <Grid item xs={2}>
        {anchocom.map(data => (
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
            helperText='Ancho del comedero'
          >
            {data.mapeo}
          </TextField>
        ))}
      </Grid>
      <Grid item xs={2}>
        <TextField
          inputProps={{ maxLength: 3 }}
          size="small"
          variant="outlined"
          id="PresupOjalesC"
          type="number"
          label="Ojales cada, en cm :  "
          fullWidth
          margin="dense"
          value={state.PresupOjalesC}
          onChange={handleChange}
          className={classes.textField}
        />
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
      </Grid>


    </>
  );
}
