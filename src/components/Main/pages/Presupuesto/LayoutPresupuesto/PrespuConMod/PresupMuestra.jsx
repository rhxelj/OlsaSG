import React, { useEffect, useState } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import { registerLocale } from "react-datepicker";
// import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from "date-fns/locale/es";

import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
// import { PresupNombre } from "../PrespuConMod/PresupNombre";
import Grid from "@material-ui/core/Grid";
import { presupColumns } from "./presupColumns";
import { presupDatos } from "./presupDatos";
import TablaMuestraRenglon from "./TablaMuestraRenglon";
import WavesIcon from "@material-ui/icons/Waves";
import { HeaderTitle } from "../../../../../lib/HeaderTitle";
import { green, purple } from "@material-ui/core/colors";
//, purple
import Imprimir from "../../../Impresion/Imprimir/Imprimir";
import { PresupPreviewMue } from "../PresupPreviewMue";

import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
// import { getDate } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
	},
});

export default function PresupMuestra() {
	HeaderTitle("PRESUPUESTOS");
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [ppreview, setPPreview] = useState(false);

	const [parampresupuesto, setParamPresupuesto] = useState({
		idpresupuesto: 0,
	});
	registerLocale("es", es);

	var fecha = new Date();
	fecha.setDate(fecha.getDate() - 40);

	const [selectedDate, setSelectedDate] = useState(fecha);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		dataFetch(date);
	};

	async function columnsFetch() {
		const col = await presupColumns();
		setColumns(() => col);
	}

	async function dataFetch(date) {
		console.log("date   ", date);
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
		setOpen(false);
	};

	/*manejo del preview de <presupuesto></presupuesto>*/
	const openPreview = (event, idPresupEncab) => {
		//  console.log('event  ', event)
		setParamPresupuesto({ parampresupuesto, idpresupuesto: idPresupEncab });
		handleClickPreview();
	};
	const handleClickPreview = () => {
		setPPreview(true);
	};

	const handleClosePreview = () => {
		setParamPresupuesto({ parampresupuesto, idpresupuesto: 0 });
		handleDateChange(fecha);
		setPPreview(false);
	};

	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Paper className={classes.root}>
			<MaterialTable
				columns={columns}
				data={data}
				icons={tableIcons}
				localization={localization}
				title=""
				actions={[
					{
						icon: () => <WavesIcon />,
						tooltip: "Ver detalles",
						onClick: (event, rowData) => {
							// setIdPresupuesto(rowData.idPresupEncab);
							openApp(event, rowData.idPresupEncab);
						},
					},
					{
						icon: () => (
							<VisibilityRoundedIcon style={{ color: purple[500] }} />
						),
						onClick: (event, rowData) =>
							openPreview(event, rowData.idPresupEncab),
					},
					// {
					// 	icon: () => (
					// 		<VisibilityRoundedIcon style={{ color: purple[500] }} />
					// 	),
					// 	tooltip: "Vista Previa",

					// 	onClick: (event, rowData) => {
					// 		setIdPresupuesto(rowData.idPresupEncab);
					// 		setPPreview({ preview: true });
					// 	},
					// },
					// {
					// 	icon: () => <tableIcons.Print style={{ color: green[500] }} />,
					// 	isFreeAction: true,
					// 	tooltip: "Imprimir",
					// 	onClick: () => setImprimirTF({ imprimir: true }),
					// },
				]}
				// onSelectionChange={(event, selectedRow) => {
				// 	console.log("selectedRow  ", selectedRow);
				// 	setIdPresupuesto(selectedRow.idPresupEncab);
				// }}
				// 	// setSelectedRow(selectedRow.idPresupEncab);
				// 	// handleOnSelectionChange(event, selectedRow);
				// 	armanombre(selectedRow.idPresupEncab);

				// 	// setIdPresupuesto(selectedRow.idPresupEncab);
				// 	// // setParamPresup({ parampresup, idPresup: nropresup });
				// 	//armanombre(event, selectedRow.idPresupEncab);
				// }}
				// components={{
				// 	Toolbar: (props) => (
				// 		<React.Fragment>
				// 			<MTableToolbar {...props} />
				// 			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				// 				<Grid container>
				// 					<KeyboardDatePicker
				// 						disableToolbar
				// 						variant="inline"
				// 						format="dd/MM/yyyy"
				// 						margin="normal"
				// 						id="date-picker-inline"
				// 						label="Desde :"
				// 						value={selectedDate}
				// 						onChange={handleDateChange}
				// 						KeyboardButtonProps={{
				// 							"aria-label": "change date",
				// 						}}
				// 					/>
				// 				</Grid>
				// 			</MuiPickersUtilsProvider>
				// 		</React.Fragment>
				// 	),
				// }}
			/>
			<PresupPreviewMue
				open={ppreview}
				handleClose={handleClosePreview}
				Presup={parampresupuesto.idpresupuesto}
				// setOpen={setPPreview}
				// handleClose={closeClickPresup}
			/>

			<Imprimir
				columns={columns}
				datos={data}
				open={imprimirTF.imprimir}
				setOpen={setImprimirTF}
			/>
			{/* <PresupPreview
				open={ppreview.ppreview}
				// setOpen={setPPreview}
				setOpen={CierraPreview}
			></PresupPreview> */}
			{/* {console.log("ppreview.ppreview   ", ppreview)}

			<PresupPreviewMue
				open={ppreview.ppreview}
				//	setOpen={setPPreview}
				Presup={idpresupuesto}
			></PresupPreviewMue> */}

			<TablaMuestraRenglon
				open={open}
				handleClose={handleClose}
				Presup={parampresupuesto.idpresupuesto}
			/>
		</Paper>
	);
}
