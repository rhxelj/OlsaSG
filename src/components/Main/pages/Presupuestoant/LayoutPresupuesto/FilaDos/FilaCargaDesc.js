import React from "react";
import useStyles from "../styles";
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
export default function FilaCargaDesc() {
    const { state, setState } = useContext(PresupPantContext);
    // const [DescripPresup, setDescripPresup] = React.useState('')
    //  const [selectedValue, setSelectedValue] = React.useState("");



    // const handleChange3 = (event) => {
    //     setDescripPresup(event.target.value);
    //     setState({ ...state, DescripPresup: event.target.value });
    // };

    // const handleChange4 = (event) => {
    //     //   setSelectedValue(event.target.value);
    //     setState({ ...state, DetallePresup: event.target.value });
    // };

    const handleChange5 = (event) => {
        setState({ ...state, DetalleRenglon: event.target.value });
        //para que no salga Ancho y Largo en la tabla del presupuesto cuando se carga por descripción
        // setState({ ...state, DescripPresup: '------' });
    };
    const classes = useStyles();
    return (
        <>
            <Grid container item xs={8}>
                <TextField
                    multiline='true'
                    // inputProps={{ maxLength: 500 }}
                    size="small"
                    variant="outlined"
                    id="DetalleRenglon"
                    margin="dense"
                    label="Agrega en Renglón "
                    fullWidth
                    value={state.DetalleRenglon}
                    helperText='Se agrega a la descripción'
                    onChange={handleChange5}
                    className={classes.textField}
                />

            </Grid>
        </>
    );

}