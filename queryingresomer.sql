Select idStkRubro, StkRubroCodGrp, StkRubroDesc, StkGrupo.StkGrupoDesc as GrupoDesc, StkItemsDesc, BasesGenerales.Proveedores.ProveedoresDesc , StkRubroAncho, StkRubroPres,     
 date_format(StkRubroFecha,"%d-%m-%Y") as StkRubroFecha     
 from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, StkItems 
 where StkRubroCodGrp=idStkGrupo 
 and StkRubroProv=idProveedores 
and StkRubroTM=idStkMonedas
and StkRubroCodGrp=idStkGrupo
and StkRubroAbr= StkItemsRubroAbr
and StkRubroAbr='ZD900'
order by StkRubroCodGrp, idStkRubro;