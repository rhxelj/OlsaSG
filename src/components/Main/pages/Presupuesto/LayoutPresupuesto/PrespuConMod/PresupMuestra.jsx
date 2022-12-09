import React, { useEffect, useState } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import WavesIcon from "@material-ui/icons/Waves";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import { green, purple } from "@material-ui/core/colors";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Estilos from "../../../../../Componentes/Boton.module.css";

import Paper from "@material-ui/core/Paper";

import { presupColumns } from "./presupColumns";
import { presupDatos } from "./presupDatos";
import { presupDatosReng } from "./presupDatosReng";
import { PresupPreviewMue } from "../PresupPreviewMue";
import { onRowDelete } from "./onRowDelete";
import TablaMuestraRenglon from "./TablaMuestraRenglon";
import Imprimir from "../../../Impresion/Imprimir/Imprimir";
import { initial_state } from "../../../OrdenTrabajo/Initial_State";

import { useContext } from "react";
import { globalContext } from "../../../../../App";

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	container: {
		maxHeight: 440,
	},
});

export default function PresupMuestra(props) {
	const { setValor } = useContext(globalContext);
	const [state, setState] = useState(initial_state);
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [ppreview, setPPreview] = useState(false);
	const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [detbusca, setDetbusca] = useState("");
	const [parampresupuesto, setParamPresupuesto] = useState({
		idpresupuesto: 0,
	});
	var fecha = new Date();
	fecha.setDate(fecha.getDate() - 360);
	const [fechasel, setFechasel] = useState(fecha.getDate() - 360);
	const [selectedDate, setSelectedDate] = useState(fecha);

	const handleChangeFB = (event1) => {
		setFechasel(event1.target.value);
	};
	const handleChangeDB = (event) => {
		setDetbusca(event.target.value);
	};

	//para buscar detalles en los renglones de presupuestos
	async function buscadetreng() {
		const datosreng = await presupDatosReng(detbusca);
		setData(datosreng);
	}

	//para buscar datos una vez elegida una fecha
	const buscadatosfecha = () => {
		dataFetch(fechasel);
	};

	async function columnsFetch() {
		const col = await presupColumns();
		setColumns(() => col);
	}

	async function dataFetch(date) {
		const data = await presupDatos(date);
		setData(data);
	}

	// async function borrapresup(date) {
	// 	console.log("date  ", date);
	// 	// const data = await presupDatos(date);
	// 	// setData(data);
	// }
	async function initialFetch() {
		columnsFetch();
		//va a buscar datos para mostrar desde el inicio
		dataFetch(selectedDate);
		setSelectedDate(selectedDate);
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
		// setState();
		setOpen(!open);
	};

	// const openOrdTrab = (event, idPresupEncab) => {
	// 	setParamPresupuesto({ parampresupuesto, idpresupuesto: idPresupEncab });
	// 	handleOpenOrdTrab();
	// };

	/*manejo del preview de <presupuesto></presupuesto>*/
	async function openPreview() {
		handleClickPreview();
	}
	const handleClickPreview = () => {
		setPPreview(true);
	};

	const handleClosePreview = () => {
		setPPreview(false);
	};

	useEffect(() => {
		initialFetch();
		setValor("Muestra Presupuestos");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Paper className={classes.root}>
			<Grid container>
				<TextField
					inputProps={{ maxLength: 14 }}
					size="small"
					variant="outlined"
					id="FechaSel"
					type="date"
					helperText="Fecha Desde"
					value={fechasel}
					onChange={handleChangeFB}
					className={classes.textField}
				/>
				<Button onClick={buscadatosfecha} className={Estilos.botonchico}>
					Busca fecha
				</Button>
				<TextField
					inputProps={{ maxLength: 14 }}
					size="small"
					variant="outlined"
					id="DetalleBusca"
					type="text"
					helperText="Detalle"
					value={detbusca}
					onChange={handleChangeDB}
				/>
				<Button onClick={buscadetreng} className={Estilos.botonchico}>
					Busca Detalle
				</Button>
			</Grid>

			<MaterialTable
				columns={columns}
				data={data}
				icons={tableIcons}
				localization={localization}
				title=""
				editable={{
					onRowDelete: (oldData) =>
						onRowDelete(oldData).then(() => dataFetch(selectedDate)),
				}}
				actions={[
					{
						icon: () => <WavesIcon />,
						tooltip: "Ver detalles",
						onClick: (event, rowData) => openApp(event, rowData.idPresupEncab),
					},
					{
						icon: () => (
							<VisibilityRoundedIcon style={{ color: purple[500] }} />
						),
						isFreeAction: true,
						// onClick: (event, rowData) =>
						// openPreview(event, rowData.idPresupEncab),
						onClick: () => openPreview(),
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
			{/* )} */}
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
				eligeOT={state.eligioOT}
			/>
		</Paper>
	);
}
