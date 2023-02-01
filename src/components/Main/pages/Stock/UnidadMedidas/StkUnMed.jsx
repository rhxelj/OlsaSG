import React, { useEffect, useState } from "react";
import "react-table/react-table.css";

import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

import { unidadMedidasColumns } from "./unidadMedidasColumns";
import { unidadMedidasData } from "./unidadMedidasData";

import { onRowAdd } from "./onRowAdd";
import { onRowUpdate } from "./onRowUpdate";
import { onRowDelete } from "./onRowDelete";

import "../../../../../Styles/TableHeader.css";
import Imprimir from "../../Impresion/Imprimir/Imprimir";
import { useContext } from "react";
import { globalContext } from "../../../../App";

export default function UnidadMedidas() {
	const { setValor } = useContext(globalContext);
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
	async function columnsFetch() {
		const col = await unidadMedidasColumns();
		setColumns(() => col);
	}

	async function dataFetch() {
		const data = await unidadMedidasData();
		setData(data);
	}

	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}

	useEffect(() => {
		initialFetch();
		setValor("Unidad de Medidas");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<MaterialTable
				actions={[
					{
						icon: () => <tableIcons.Print />,
						tooltip: "Imprimir",
						isFreeAction: true,
						onClick: () => setImprimirTF({ imprimir: true }),
					},
				]}
				title=""
				icons={tableIcons}
				localization={localization}
				columns={columns}
				data={data}
				options={{
					exportAllData: true,
					exportButton: true,
					grouping: true,
					addRowPosition: "first",
					actionsColumnIndex: -1,
				}}
				editable={{
					onRowAdd: (newData) => onRowAdd(newData).then(() => dataFetch()),
					onRowUpdate: (newData, oldData) =>
						onRowUpdate(newData, oldData).then(() => dataFetch()),
					onRowDelete: (oldData) =>
						onRowDelete(oldData).then(() => dataFetch()),
				}}
			/>
			<Imprimir
				columns={columns}
				datos={data}
				open={imprimirTF.imprimir}
				setOpen={setImprimirTF}
			/>
		</div>
	);
}