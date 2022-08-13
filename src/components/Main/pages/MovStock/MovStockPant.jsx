import React, { useState, useEffect } from "react";
import { initial_state } from "./Initial_State";
import PantallaIngreso from "./Ingreso/LayoutIngreso/PantallaIngreso";

import { Grid } from "@material-ui/core";

import { useContext } from "react";
import { globalContext } from "../../../App";

export const MovStockPantContext = React.createContext();

var MovStockPant = () => {
	const [state, setState] = useState(initial_state);
	const { setValor } = useContext(globalContext);

	useEffect(() => {
		setValor("Stock");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div>
			{/* <Container> */}
			{/* <Grid item></Grid> */}
			<Grid container spacing={2} alignItems="center">
				{/* spacing={3}  */}
				<MovStockPantContext.Provider
					value={{
						state: state,
						setState: setState,
					}}
				>
					{/* <Grid item></Grid> {/*  Para dejar espacio  */}
					{/* <Grid item></Grid>  {/* Para dejar espacio  */}
					<PantallaIngreso />
					{/* <TablaPresup/> */}
				</MovStockPantContext.Provider>
			</Grid>
			{/* </Container> */}
		</div>
	);
};
export default MovStockPant;
