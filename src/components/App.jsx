import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import 'materialize-css/dist/css/materialize.css';
// import 'material-design-icons/iconfont/material-icons.css';
// import 'materialize-css/dist/js/materialize.min.js'

import Header from "./Header/Header.js";
import Main from "./Main";
// import { HeaderTitle } from "./lib/HeaderTitle.js";
// import Footter from './components/Footter';
import CssBaseline from "@material-ui/core/CssBaseline";

export const globalContext = React.createContext();

const App = () => {
	const [valor, setValor] = useState("");

	return (
		// shorthand for <Fragment> is <>
		<>
			<CssBaseline />
			<Router>
				<div>
					<globalContext.Provider value={{ valor, setValor }}>
						<Header />
						<br></br>
						<Main />
					</globalContext.Provider>
					{/* <Footter/>   */}
				</div>
			</Router>
		</>
	);
};

export default App;
