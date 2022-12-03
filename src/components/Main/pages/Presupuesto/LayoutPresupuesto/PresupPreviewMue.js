

// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React, { useState } from 'react';
import { Dialog } from "@material-ui/core";
import { pdfjs } from 'react-pdf';
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { tableIcons } from '../../../../lib/material-table/tableIcons'
import Estilos from '../../../../../Styles/Boton.module.css'

export const PresupPreviewMue = (props) => {
    const { open, handleClose } = props;
    const [cover, setCover] = useState("");
    const hiddenFileInput = React.useRef(null);
    // const inputStyles = {
    //     formContainer: {
    //         width: "400px",
    //         margin: "0 auto",
    //     },
    //     container: {
    //         display: "flex",
    //         flexDirection: "column",
    //         gap: "5px",
    //         margin: "15px 0",
    //         background: "linear-gradient(50deg, #f8cec8 10 %, #f8020e 80 %)",

    //     },
    //     title: {
    //         fontSize: "16px",
    //         textAlign: "left",
    //     },
    //     input: {
    //         padding: "10px",
    //         borderRadius: "5px",
    //         fontSize: "16px",
    //     },
    // };


    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


    function handleOnChangeFile(e) {
        const element = e.target;
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setCover(reader.result.toString());
        };

        reader.readAsDataURL(file);
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <React.Fragment>

            <Dialog
                fullScreen
                open={open}
            >
                <MuiDialogTitle>
                    <button
                        variant="contained"
                        onClick={handleClose}
                        className={Estilos.botoncierradialogo}
                    >
                        <div>
                            <tableIcons.Close />
                        </div>
                        Cerrar
                    </button>

                    <b></b>

                    <button
                        onClick={handleClick}
                        className={Estilos.botonabredialogo}>
                        <div>
                            <tableIcons.Search />
                        </div>
                        Buscar
                    </button>
                    <input
                        type="file"
                        name="cover"
                        onChange={handleOnChangeFile}
                        ref={hiddenFileInput}
                        style={{ display: 'none' }} />

                    {/* </div> */}


                </MuiDialogTitle>
                {!!cover ?
                    <object
                        data={cover}
                        alt="description of image"
                        type="application/pdf"
                        width='100%'
                        height='100%'
                        cache='false'
                    />
                    : ""}



            </Dialog>
        </React.Fragment >
    );

}