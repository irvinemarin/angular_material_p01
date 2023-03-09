import {ChartData} from "chart.js";
import {TableSetting} from "../partials-v2/tabla-child/tabla-child.component";

export class Dependecias {
  public static chartData1___Ingresos: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public static CHARDATA_ESCRITOS: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public static CHARDATA_PENDIENTE_FALLO: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public static CHARDATA_INGRESOS_VS_PROGRAMADOS: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public static CHARDATA_PROGRAMADOS: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public static CHARDATA_MESA_PARTES: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public static tableDatosParent: TableSetting = {
    headerTablaList: [],
    bodyDataList: [],
    totalHorizontal: [],
    nombreFiltro: "",
    listaFiltroList: [],
    tituloReporte: "",
    datesReporte: "",
    filtroSelect: {isVisible: false},
    isTituloReporteVisible: false,
    nroTable: '001',
    listDB: [],
    isHideTotalTable: false,
    isHideTotalesRow: false,
    isPaginationVisible: false,
    isParentTable: true
  };
  public static tableDatosParent2: TableSetting = {
    headerTablaList: [],
    bodyDataList: [],
    totalHorizontal: [],
    nombreFiltro: "",
    listaFiltroList: [],
    tituloReporte: "",
    datesReporte: "",
    filtroSelect: {
      isVisible: false
    },
    isTituloReporteVisible: false,
    nroTable: '001',
    listDB: [],
    isHideTotalTable: false,
    isHideTotalesRow: false,
    isPaginationVisible: false,
    isParentTable: true
  };
  public static tableDatosParentDetalle: TableSetting = {
    isPaginationVisible: false,
    headerTablaList: [],
    bodyDataList: [],
    totalHorizontal: [],
    nombreFiltro: "",
    listaFiltroList: [],
    tituloReporte: "",
    datesReporte: "",
    filtroSelect: {
      isVisible: false
    },
    isTituloReporteVisible: true,
    nroTable: '03',
    listDB: [],
    isHideTotalTable: true,
    isHideTotalesRow: true,
    isParentTable: true
  };
  public static table01: TableSetting = {
    isPaginationVisible: false,
    isParentTable: true,
    isTituloReporteVisible: true,
    headerTablaList: [],
    bodyDataList: [],
    totalHorizontal: [],
    nombreFiltro: "",
    listaFiltroList: [],
    tituloReporte: "",
    datesReporte: "",
    filtroSelect: {
      isVisible: true
    },
    nroTable: '01',
    listDB: [],
    isHideTotalTable: false,
    isHideTotalesRow: false
  };
  public static table02: TableSetting = {
    isParentTable: true,
    isPaginationVisible: false,
    isTituloReporteVisible: true,
    headerTablaList: [],
    bodyDataList: [],
    totalHorizontal: [],
    nombreFiltro: "",
    listaFiltroList: [],
    tituloReporte: "",
    datesReporte: "",
    filtroSelect: {
      isVisible: true
    },
    nroTable: '02',
    listDB: [],
    isHideTotalTable: false,
    isHideTotalesRow: false
  };
}
