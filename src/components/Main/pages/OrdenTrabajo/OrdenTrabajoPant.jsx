import React, { useState } from "react";
import { initial_state } from "./Initial_State";
import OrdTrabOrigen from "./LayoutOrdenTrabajo/OrdTrabOrigen/OrdTrabOrigen";

import { Grid } from "@material-ui/core";

export const OrdenTrabajoPantContext = React.createContext();

var OrdenTrabajoPant = () => {
	const [state, setState] = useState(initial_state);

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
				</OrdenTrabajoPantContext.Provider>
			</Grid>
			{/* </Container> */}
		</div>
	);
};
export default OrdenTrabajoPant;
