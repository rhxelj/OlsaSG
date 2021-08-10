import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import FilaCuatro from "../FilaCuatro/FilaCuatro";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { PresupPreview } from "../PresupPreview"


//npm install pdf-viewer-reactjs
import {
  blue,
  green,
  purple,
  teal,
} from "@material-ui/core/colors";

import FilaAnexo from "../FilaConf/FilaAnexo/FilaAnexo";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function TablaPresup(props) {


  // Esto es para poder consumir los datos del CONTEXTAPI
  // const { state, setState } = useContext(PresupPantContext);
  const { state } = useContext(PresupPantContext);
  const { datosrenglon, setDatosRenglon } = useContext(PresupPantContext);
  // const [setImprimirTF] = useState({ imprimir: false });
  const [anexos, setAnexos] = useState({ anexos: false });
  const [ppreview, setPPreview] = useState({ ppreview: false });
  const [filacuatro, setFilacuatro] = useState({ filacuatro: false });



  const columns = state.columns;

  const [suma, setSuma] = useState(0);
  console.log('datosrengpresup  tablapresup  ', state.datosrengpresup)

  function sumar() {
    var totalpresup = 0,
      i = 0;
    while (i < datosrenglon.length) {

      totalpresup = totalpresup * 1 + datosrenglon[i].ImpItem * 1;
      i++;
    }
    setSuma(totalpresup);
  }


  // function graba() {
  //   handleClickOpen();
  // }



  // const handleClickOpen = () => {
  //   setFilacuatro({ filacuatro: true })
  // };

  const handleClose = () => {
    setFilacuatro(false);

  };


  return (
    <>
      <Grid container item direction="column" spacing={3} xs={12}>


        <Grid item xs>

          <MaterialTable
            icons={tableIcons}
            title=""
            columns={columns}
            data={datosrenglon}
            localization={localization}

            options={{
              // headerStyle: {
              //   backgroundColor: '#01579b',
              //   color: '#FFF',
              // },
              // toolbar: true,
              // toolbarButtonAlignment: 'right',
              search: false,
              exportAllData: true,
              exportButton: true,
              // showTextRowsSelected: false,
              // showSelectAllCheckbox: true,
              // selection: true,
              // selectionProps: ({

              // }),
            }}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    const dataDelete = [...datosrenglon];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setDatosRenglon([...dataDelete]);
                    resolve();
                  }, 1000);
                }),

            }}
            actions={[

              {
                icon: () => (
                  <tableIcons.AddShoppingCart style={{ color: teal[500] }} />
                ),
                tooltip: "Suma",
                isFreeAction: true,
                onClick: () => sumar(),
              },
              {
                icon: () => <tableIcons.Save style={{ color: blue[500] }} />,
                tooltip: "Graba",
                isFreeAction: true,
                // onClick: () => graba(),
                onClick: () => setFilacuatro({ filacuatro: true })
              },
              {
                icon: () => <tableIcons.Print style={{ color: green[500] }} />,
                tooltip: "Imprimir",
                isFreeAction: true,
                onClick: () => setPPreview({ ppreview: true })
              },
              {
                icon: () => (
                  <tableIcons.Attachment style={{ color: purple[700] }} />
                ),
                tooltip: "Anexos",
                isFreeAction: true,
                onClick: () => setAnexos({ anexos: true }),
              }
            ]}
            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />

                  <CurrencyTextField
                    id="Suma"
                    label="Total presupuesto : "
                    value={suma}
                  />

                </div>

              ),
            }}
          />

        </Grid>
      </Grid>

      <FilaCuatro
        open={filacuatro.filacuatro}
        datos={datosrenglon}
        maymin={props.maymin}
        suma={suma}
        setOpen={setFilacuatro}
        handleClose={handleClose}
      />

      <FilaAnexo open={anexos.anexos} setOpen={setAnexos} />
      <PresupPreview open={ppreview.ppreview} setOpen={setPPreview}></PresupPreview>
    </>
  );
}
