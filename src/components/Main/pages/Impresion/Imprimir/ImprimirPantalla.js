import printJS from "print-js";

export default function (props) {
  console.log("En imprimir pantalla ");
  console.log(props.properties);
  console.log(props.datos);

  printJS({
    maxWidth: 800,
    properties: props.properties,
    scanStyles: false,
    printable: props.datos,
    type: "json",
    header: '<h3 class="custom-h3">My custom header</h3>',
    // onPrintDialogClose: () => props.handleClose(),
  });
}
