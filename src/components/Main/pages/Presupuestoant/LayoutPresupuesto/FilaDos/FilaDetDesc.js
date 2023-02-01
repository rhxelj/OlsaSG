import React from "react";
import useStyles from "../styles";
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { TextField } from "@material-ui/core";

export default function FilaDetDesc() {
    const { state, setState } = useContext(PresupPantContext);
    const [DescripPresup, setDescripPresup] = React.useState('')
    //  const [selectedValue, setSelectedValue] = React.useState("");



    const handleChange3 = (event) => {
        setDescripPresup(event.target.value);
        setState({ ...state, DescripPresup: event.target.value });
    };

    const handleChange4 = (event) => {
        //   setSelectedValue(event.target.value);
        setState({ ...state, DetallePresup: event.target.value });
    };

    const handleChange5 = (event) => {
        //   setSelectedValue(event.target.value);
        setState({ ...state, DetalleRenglon: event.target.value });
    };
    const classes = useStyles();
    return (
        <>
            <TextField
                inputProps={{ maxLength: 15 }}
                size="small"
                variant="outlined"
                id="DescripPresup"
                margin="dense"
                label="Descripción"
                // fullWidth
                value={DescripPresup}
                helperText='No imprime medidas'
                onChange={handleChange3}
                className={classes.textField}
            />

            <TextField
                inputProps={{ maxLength: 100 }}
                size="small"
                variant="outlined"
                id="DetallePresup"
                margin="dense"
                label="Detalle Presupuesto "
                // fullWidth
                value={state.DetallePresup}
                helperText='Saca la descripción por defecto'
                onChange={handleChange4}
                className={classes.textField}
            />
            <TextField
                inputProps={{ maxLength: 100 }}
                size="small"
                variant="outlined"
                id="DetalleRenglon"
                margin="dense"
                label="Agrega en Renglón "
                // fullWidth
                value={state.DetalleRenglon}
                helperText='Se agrega a la descripción'
                onChange={handleChange5}
                className={classes.textField}
            />
        </>
    );

}