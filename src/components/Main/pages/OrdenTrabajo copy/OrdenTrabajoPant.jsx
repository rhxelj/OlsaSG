import React, { useEffect, useState } from "react";
import { inicial_state } from "./Initial_State";
import OrdTrabOrigen from "./LayoutOrdenTrabajo/OrdTrabOrigen/OrdTrabOrigen";
import OrdTrabDatosPresup from "./LayoutOrdenTrabajo/OrdTrabDatosPresup/OrdTrabDatosPresup";

import { Grid } from "@material-ui/core";
import { useContext } from "react";
import { globalContext } from "../../../App";

export const OrdenTrabajoPantContext = React.createContext();

var OrdenTrabajoPant = () => {
	const { setValor } = useContext(globalContext);
	const [state, setState] = useState(inicial_state);
	useEffect(() => {
		setValor("Orden de Trabajo");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div>
			<Grid container spacing={2} alignItems="center">
				<OrdenTrabajoPantContext.Provider
					value={{
						state: state,
						setState: setState,
					}}
				>
					<OrdTrabOrigen />
					<OrdTrabDatosPresup />
				</OrdenTrabajoPantContext.Provider>
			</Grid>
			{/* </Container> */}
		</div>
	);
};
export default OrdenTrabajoPant;
