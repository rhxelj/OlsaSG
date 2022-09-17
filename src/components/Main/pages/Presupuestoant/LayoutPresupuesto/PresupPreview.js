
// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from 'react';
import { Dialog } from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import BCierraDialogo from '../../../../../Styles/Boton.module.css'
import { tableIcons } from '../../../../lib/material-table/tableIcons'



// export default function PresupPreview(props) {
export const PresupPreview = (props) => {
    function cierradialogo() {
        console.log('entro en cierradialog  ')
        props.setOpen({ ppreview: false });
    }

    return (
        <div>

            <Dialog
                fullScreen
                open={props.open}

            >
                <MuiDialogTitle>
                    <button
                        variant="contained"
                        // color="secondary"
                        //startIcon={<tableIcons.AddShoppingCart />}
                        onClick={cierradialogo}
                        className={BCierraDialogo.botoncierradialogo}
                    >
                        <div className={BCierraDialogo.iconocierradialogo}>
                            <tableIcons.Close />
                            {/* style={{ color: red[0], width: 30, height: 30 }} */}
                        </div>
                        Cerrar
                    </button>

                    {/* <IconButton onClick={cierradialogo} color='primary' edge='start' size='small'> */}
                    {/* <CloseIcon />
                        Cierra Impresión */}
                    {/* <Typography variant="subtitle2">Cierra Impresión</Typography> */}

                </MuiDialogTitle>

                <object
                    // data={require('../../../../../docspdf/basics.pdf')}

                    //  data={require('../../../../../docspdf/basics.pdf')}
                    data={require('../static/media/basics.pdf')}
                    type="application/pdf"
                    width='100%'
                    height='100%'
                    cache='false'
                >
                </object>
                {/* {alert('al final de presupPreview')} */}
            </Dialog>
        </div >
    );

}

