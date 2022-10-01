import React from "react";
import Radio from "@material-ui/core/Radio";
import {

    Grid,

} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";


export default function OrdTrabOrigen() {
    const { state, setState } = useContext(OrdenTrabajoPantContext);

    const [selectedValue, setSelectedValue] = React.useState("P");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setState({ ...state, otorigen: event.target.value });
    };
    return (
        <>

            <RadioGroup
                row
                label='Origen OT'
                size="small"
                name="OTOrigen"
                value={selectedValue}
                onChange={handleChange}
                margin="dense"
            >
                <Grid item xs={3}>
                    <FormControlLabel
                        value="P"
                        control={<Radio />}
                        label="Presupuesto."
                        labelPlacement="top"
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel
                        value="D"
                        control={<Radio />}
                        label="Directo"
                        labelPlacement="top"
                        margin="dense"
                    />
                </Grid>
            </RadioGroup>
        </>
    );

}