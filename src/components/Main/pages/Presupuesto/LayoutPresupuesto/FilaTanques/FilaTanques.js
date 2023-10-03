import React from "react";
import { Grid, TextField } from "@material-ui/core";
import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaTanques() {
    //  const [selectedValue, setSelectedValue] = React.useState("PVC05");
    const { state, setState } = useContext(PresupPantContext);
    // const [setFaja] = React.useState('2P');

    // const [AnchoPared, setAnchoPared] = React.useState(0.20)
    // const [DetallePresup, setDetallePresup] = React.useState('')



    const handleChange = (event) => {

        const id = event.target.id;
        setState({ ...state, [id]: event.target.value });

    };



    const tipomedidatanque = [
        {
            id: "TipoMedidaEleg",
            label: "Medida de :",
            value: state.value,
            mapeo: (
                <>
                    <option></option>
                    {state.TipoMedida.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </>
            ),
        },
    ];

    const terminacionborde = [
        {
            id: "TermBordeEleg",
            label: "Terminación :",
            value: state.value,
            mapeo: (
                <>
                    <option></option>
                    {state.TermBorde.map((option) => (
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
            {/* <Grid item > */}
            <Grid item >
                {tipomedidatanque.map(data => (
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
                        helperText='Qué medida tenemos?'
                    >
                        {data.mapeo}
                    </TextField>
                ))}
            </Grid>
            <Grid item xs={1} >
                {terminacionborde.map(data => (
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
                        helperText='Cómo termina el Bolsón'
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
                    id="AnchoPared"
                    margin="dense"
                    label="Pared en cm : "
                    // fullWidth
                    value={state.AnchoPared}
                    onChange={handleChange}
                    className={classes.textField}
                    helperText='Si tiene pared'

                />

            </Grid>

            <Grid item xs={1}>
                <TextField
                    inputProps={{ maxLength: 5 }}
                    size="small"
                    variant="outlined"
                    id="Medida"
                    margin="dense"
                    label="Medida/Cant."
                    value={state.Medida}
                    onChange={handleChange}
                    className={classes.textField}
                    helperText='Medida o Cantidad de chapas'
                />
            </Grid>
            <Grid item xs={1}>
                <TextField
                    inputProps={{ maxLength: 4 }}
                    size="small"
                    variant="outlined"
                    id="Alto"
                    margin="dense"
                    label="Alto"
                    value={state.Alto}
                    onChange={handleChange}
                    className={classes.textField}
                    helperText='Altura del tanque'
                />
            </Grid>
        </>
    );
}
