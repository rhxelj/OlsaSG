import React from "react";


// Context
import { useContext } from "react";
import { OrdenTrabajoPantContext } from "../../OrdenTrabajoPant";

export default function MinMay(props) {
  console.log('props MinMay ', props)
  const { state, setState } = useContext(OrdenTrabajoPantContext);

  console.log('state MinMay ', state)


  return (
    <>

    </>
  );
}
