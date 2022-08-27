import React, { useEffect, useState } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import { registerLocale } from "react-datepicker";
import { PresupNombre } from "../PrespuConMod/PresupNombre";
// import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from "date-fns/locale/es";

import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";

// import {
// 	MuiPickersUtilsProvider,
// 	KeyboardDatePicker,
// } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { presupColumns } from "./presupColumns";
import { presupDatos } from "./presupDatos";
import TablaMuestraRenglon from "./TablaMuestraRenglon";
import WavesIcon from "@material-ui/icons/Waves";
import { green, purple } from "@material-ui/core/colors";
//, purple
import Imprimir from "../../../Impresion/Imprimir/Imprimir";
import { PresupPreviewMue } from "../PresupPreviewMue";
import { useContext } from "react";
import { globalContext } from "../../../../../App";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
// import { getDate } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
	},
});

export default function PresupMuestra() {
	const { setValor } = useContext(globalContext);
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [ppreview, setPPreview] = useState(false);
	const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);

	// const [parampresupreview, setParamPresuPreview] = useState({
	// 	idpresupreview: 0,
	// });
	const [parampresupuesto, setParamPresupuesto] = useState({
		idpresupuesto: 0,
	});

	registerLocale("es", es);

	var fecha = new Date();
	fecha.setDate(fecha.getDate() - 360);

	const [selectedDate, setSelectedDate] = useState(fecha);
	const [startDate, setStartDate] = useState(fecha);
	const handleDateChange = (date) => {
		console.log("date  ", date);
		setSelectedDate(date);
		dataFetch(date);
	};

	async function columnsFetch() {
		const col = await presupColumns();
		setColumns(() => col);
	}

	async function dataFetch(date) {
		const data = await presupDatos(date);
		setData(data);
	}

	async function initialFetch() {
		columnsFetch();
		dataFetch(selectedDate);
	}

	const openApp = (event, idPresupEncab) => {
		setParamPresupuesto({ parampresupuesto, idpresupuesto: idPresupEncab });
		handleClickOpen();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setParamPresupuesto({ parampresupuesto, idpresupuesto: 1 });
		setOpen(false);
	};
	var resultado = [{ error: 1 }];
	/*manejo del preview de <presupuesto></presupuesto>*/
	async function openPreview(event, idPresupEncab) {
		setParamPresupuesto({ parampresupuesto, idpresupuesto: idPresupEncab });
		resultado = await PresupNombre(idPresupEncab);
		console.log("resultado  ", resultado);
		if (resultado === '""') {
			handleClickPreview();
		} else {
			alert("el presupuesto no está en disco");
		}
	}
	const handleClickPreview = () => {
		setPPreview(true);
	};

	const handleClosePreview = () => {
		// initialFetch();
		setPPreview(false);
	};

	useEffect(() => {
		initialFetch();
		setValor("Muestra Presupuestos");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Paper className={classes.root}>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
			/>
			{/* <MaterialTable
				columns={columns}
				data={data}
				icons={tableIcons}
				localization={localization}
				title=""
				actions={[
					{
						icon: () => <WavesIcon />,
						tooltip: "Ver detalles",
						onClick: (event, rowData) =>
							// setIdPresupuesto(rowData.idPresupEncab);
							openApp(event, rowData.idPresupEncab),
					},
					{
						icon: () => (
							<VisibilityRoundedIcon style={{ color: purple[500] }} />
						),
						onClick: (event, rowData) =>
							openPreview(event, rowData.idPresupEncab),
					},
					{
						icon: () => <tableIcons.Print style={{ color: green[500] }} />,
						isFreeAction: true,
						tooltip: "Imprimir",
						onClick: () => setImprimirTF({ imprimir: true }),
					},
				]}
				components={{
					Toolbar: (props) => (
						<React.Fragment>
							<MTableToolbar {...props} />
						</React.Fragment>
					),
				}}
				/>

			<PresupPreviewMue open={ppreview} handleClose={handleClosePreview} />

			<Imprimir
				columns={columns}
				datos={data}
				open={imprimirTF.imprimir}
				setOpen={setImprimirTF}
				/>

			<TablaMuestraRenglon
				open={open}
				handleClose={handleClose}
				Presup={parampresupuesto.idpresupuesto}
				/> */}
		</Paper>
	);
}

{
	/* <DatePicker
								selected={selectedDate}
								// onSelect={handleDateSelect} //when day is clicked
								format="dd/MM/yyyy"
								margin="normal"
								id="date-picker-inline"
								label="Desde :"
								variant="inline"
								onChange={handleDateChange} //only when value has changed
								KeyboardButtonProps={{
									"aria-label": "change date",
								}}
							/> */
}
{
	/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container>
									<KeyboardDatePicker
										disableToolbar
										variant="inline"
										format="dd/MM/yyyy"
										margin="normal"
										id="date-picker-inline"
										label="Desde :"
										value={selectedDate}
										onChange={handleDateChange}
										KeyboardButtonProps={{
											"aria-label": "change date",
										}}
									/>
								</Grid>
							</MuiPickersUtilsProvider> */
}
