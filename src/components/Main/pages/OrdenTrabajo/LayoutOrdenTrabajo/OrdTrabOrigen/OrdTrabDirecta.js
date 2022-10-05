import React from "react";

// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";


export default function OrdTrabDirecta() {
    const { state, setState } = useContext(OrdenTrabajoPantContext);

    return (<>
        <h1>Directa</h1></>)
}