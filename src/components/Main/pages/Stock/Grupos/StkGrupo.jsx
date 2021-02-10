import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";

import { grupoColumns } from "./grupoColumns";
import { grupoData } from "./grupoData";

import { onRowAdd } from "./onRowAdd"
import { onRowUpdate } from "./onRowUpdate"
import { onRowDelete } from "./onRowDelete"

import { HeaderTitle } from "../../../../lib/HeaderTitle"

import Imprimir from "../../Impresion/Imprimir/Imprimir";

export default function StkGrupo() {
  HeaderTitle("GRUPOS")
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

  async function columnsFetch() {
    const col = await grupoColumns();
    setColumns(() => col);
  }

  async function dataFetch() {
    const data = await grupoData();
    setData(data);
  }

  async function initialFetch() {
    columnsFetch();
    dataFetch();
  }

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <div>
      <MaterialTable
        title=""
        actions={[
          {
            icon: () => <tableIcons.Print />,
            // icon: "IMPRIMIR",
            tooltip: "Imprimir",
            isFreeAction: true,
            onClick: (event) => setImprimirTF({ imprimir: true }),
          }
        ]}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            onRowAdd(newData).then(() => dataFetch()),
          onRowUpdate: (newData, oldData) =>
            onRowUpdate(newData, oldData).then(() => dataFetch()),
          onRowDelete: oldData =>
            onRowDelete(oldData).then(() => dataFetch()),
        }}
        icons={tableIcons}
        localization={localization}
        options={{
          exportAllData: true,
          exportButton: true,
          grouping: true,
          addRowPosition: "first",
          actionsColumnIndex: -1,
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
