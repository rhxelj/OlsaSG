import React, { useState } from "react";
import { initial_state } from "./Initial_State";
import Encabezado from "./LayoutOrdenTrabajo/Encabezado/Encabezado";

import { Grid } from "@material-ui/core";

export const OrdenTrabajoPantContext = React.createContext();

var OrdenTrabajoPant = () => {
	const [state, setState] = useState(initial_state);
	console.log("esta en return de OrdenTrabajoPant afuera");

	return (
		<div>
			{console.log("esta en return de OrdenTrabajoPant")}
			{/* <Container> */}
			{/* <Grid item></Grid> */}
			<Grid container spacing={2} alignItems="center">
				{/* spacing={3}  */}
				<OrdenTrabajoPantContext.Provider
					value={{
						state: state,
						setState: setState,
					}}
				>
					{/* <Grid item></Grid> {/*  Para dejar espacio  */}
					{/* <Grid item></Grid>  {/* Para dejar espacio  */}
					<Encabezado />
					{/* <TablaPresup/> */}
				</OrdenTrabajoPantContext.Provider>
			</Grid>
			{/* </Container> */}
		</div>
	);
};
export default OrdenTrabajoPant;
