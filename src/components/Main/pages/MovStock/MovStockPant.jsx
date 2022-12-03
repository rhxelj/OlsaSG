import React, { useState, useEffect } from "react";
import { initial_state } from "./Initial_State";
import PantallaInicial from "./PantallaInicial";

import { Grid } from "@material-ui/core";
import { useContext } from "react";
import { globalContext } from "../../../App";

export const MovStockPantContext = React.createContext();

var MovStockPant = () => {
	const { setValor } = useContext(globalContext);
	const [state, setState] = useState(initial_state);
	// const [movimiento, setMovimiento] = useState("");
	useEffect(() => {
		setValor("Stock");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<Grid container spacing={2} alignItems="center">
				<MovStockPantContext.Provider
					value={{
						state: state,
						setState: setState,
					}}
				>
					<PantallaInicial />
				</MovStockPantContext.Provider>
			</Grid>
		</div>
	);
};
export default MovStockPant;
