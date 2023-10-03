export function transcolumns() {

  return new Promise(function (resolve) {
    resolve([
      {
        title: "Transporte(ID)",
        field: "idTransporte",
        editable: "never",
        order: true,
      },
      {
        title: "Descripción",
        field: "TransporteDesc",
        order: true,
        defaultValue: ""
      },
      {
        title: "Teléfono ",
        field: "TransporteTel1",
        order: true,
        defaultValue: ""
      },
      {
        title: "Teléfono ",
        field: "TransporteTel2",
        order: true,
        defaultValue: ""
      },
      {
        title: "WhatsApp ",
        field: "TransporteWA",
        order: true,
        defaultValue: ""
      },
      {
        title: "Mail ",
        field: "TransporteMail",
        order: true,
        defaultValue: ""
      },
      {
        title: "Domicilio ",
        field: "TransporteDom",
        order: true,
        defaultValue: ""
      },
      {
        title: "Localidad ",
        field: "TransporteLoc",
        order: true,
        defaultValue: ""
      },
      {
        title: "Destino ",
        field: "TransporteDestino",
        order: true,
        defaultValue: ""
      },
      {
        title: "Observaciones ",
        field: "TransporteObser",
        order: true,
        defaultValue: ""
      },
    ]);
  });
}
