
// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React, { useEffect } from 'react';
import { Dialog } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography';
import { PresupNombre } from './PrespuConMod/PresupNombre';

export const PresupPreviewMue = (props) => {
    const { open, handleClose, Presup } = props;


    async function armanombre(Presup) {
        if (Presup !== 1) {
            var nombrepresup = "Presupuesto\\ nro\\ " + Presup + "*.pdf";
            await PresupNombre(nombrepresup);
        }
    }

    // function cierradialogo() {
    //     setOpen({ preview: false });
    // }

    useEffect(() => {
        if (Presup !== 1) {
            armanombre(Presup);
        }
    }, [Presup]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <React.Fragment>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <MuiDialogTitle >
                    <IconButton onClick={handleClose} color='primary' edge='start' size='small'>
                        <CloseIcon />
                        <Typography variant="subtitle2">Cierra Impresión</Typography>
                    </IconButton>

                </MuiDialogTitle>

                {/* <Document>
                    <View>
                        <Image
                            src="../static/media/basics.pdf"
                            alt="random image"
                            style={{ maxWidth: "600px", maxHeight: "400" }}
                        />
                    </View>
                </Document> */}
                <object
                    data={require('../static/media/basics.pdf')}
                    type="application/pdf"
                    width='100%'
                    height='100%'
                    cache='false'
                >
                </object>

            </Dialog>
        </React.Fragment >
    );

}

