import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import { Grid } from "@material-ui/core";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import OrdTrabDirecta from "../../../a borrar/OrdTrabDirecta";
import OrdTrabPresup from "./OrdTrabPresup";
// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";


export default function OrdTrabOrigen() {
    const { state, setState } = useContext(OrdenTrabajoPantContext);

    const [selectedValue, setSelectedValue] = React.useState("P");
    const [ordtrabadirecta, setOrdtrabadirecta] = useState(false);
    const [ordtrabpresup, setOrdtrabpresup] = useState(false)

    // var origenorden = ''

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setState({ ...state, otorigen: event.target.value });
        event.target.value === "D" ? setOrdtrabadirecta(!ordtrabadirecta) : setOrdtrabpresup(!ordtrabpresup)
        // origenorden = event.target.value
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
                <Grid item >
                    <FormControlLabel
                        value="P"
                        control={<Radio />}
                        label="Presupuesto"
                        labelPlacement="top"
                        margin="dense"
                    />
                </Grid>
                <Grid item >
                    <FormControlLabel
                        value="D"
                        control={<Radio />}
                        label="Directa"
                        labelPlacement="top"
                        margin="dense"
                    />
                </Grid>
            </RadioGroup>
            <></>
            {selectedValue === 'D' ?
                (
                    <div>
                        <OrdTrabDirecta />
                    </div>)
                : (<OrdTrabPresup />)}
            {/* {ordtrabpresup ?
                (<div>
                    <OrdTrabPresup />
                </div>) : (<></>)
            } */}

        </>
    );

}