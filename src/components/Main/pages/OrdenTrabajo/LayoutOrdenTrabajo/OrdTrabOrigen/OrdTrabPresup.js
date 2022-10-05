import React from "react";
import PresupMuestra from "../../../Presupuesto/LayoutPresupuesto/PrespuConMod/PresupMuestra";
// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";


export default function OrdTrabPresup() {
    const { state, setState } = useContext(OrdenTrabajoPantContext);

    return (<>
        <PresupMuestra origen={'OT'} />
    </>)
}