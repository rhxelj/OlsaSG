import React, { useState } from "react";
import PantallaIngreso from "./LayoutMovStock/Ingreso/PantallaIngreso.js";
// import SalidaDisponible from "./LayoutMovStock/SalidaDisp/SalidaDisponible";

import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import { green } from "@material-ui/core/colors";

// import { useContext } from "react";
// import { MovStockPantContext } from './MovStockPant'

export default function PantallaInicial() {
    // const { state, setState } = useContext(MovStockPantContext);
    const [pantingreso, setPantingreso] = useState(false);
    // const [saldisponible, setSaldisponible] = useState(false)

    // const LlamaPI = () => {
    //     setPantingreso(true)
    // }
    function LlamaPI() {
        setPantingreso(!pantingreso)
    }

    return (
        <>
            <Grid>
                {/* <Grid container item xs={2}> */}
                <Button
                    onClick={LlamaPI}
                    color="primary">
                    <AssignmentReturnedIcon
                        style={{ color: green[500] }}
                        fontSize="large"
                        titleAccess="Agregar"
                    />
                </Button>

                {pantingreso ?
                    (
                        <div>
                            <PantallaIngreso />
                        </div>)
                    : ("")
                }

                {/* {saldisponible ? (
                    <div>
                        <SalidaDisponible />
                    </div>
                ) : ("")} */}
            </Grid>
        </>
    )
}
