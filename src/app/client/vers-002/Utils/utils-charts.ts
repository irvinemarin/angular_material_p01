import {position} from "html2canvas/dist/types/css/property-descriptors/position";
import {Dependecias} from "./dependecias";

export class UtilsCharts {

  public static getWSNameParentByPosition(numberTableGrafico) {
    let nommbreServicio = "";
    // figure.style.display = "none"

    if (numberTableGrafico == 0) {
      nommbreServicio = "getListadoExpIngresos/";
    } else if (numberTableGrafico == 1) {
      nommbreServicio = "getListadoExpIngresos/";
    } else if (numberTableGrafico == 2) {
      nommbreServicio = "getListadoProgramaciones/";
    } else if (numberTableGrafico == 3) {
      nommbreServicio = "getListadoEscritosAnual/";
    } else if (numberTableGrafico == 4) {
      nommbreServicio = "getListdoPendienteSentidoFalloxSala/";
    } else if (numberTableGrafico == 5) {
      nommbreServicio = "getListadoMesaPartes/";
    } else if (numberTableGrafico == 111) {
      nommbreServicio = "getListadoVersusIngresosyProgramadoxAnio/";
    }
    return nommbreServicio;
  }

  public static getDateByDiferenceYear(agoCount: number = 0) {
    let hoy = new Date()
    let mounth = (hoy.getMonth() + 1) < 10 ? "0" + (hoy.getMonth() + 1) : hoy.getMonth() + 1
    let day = (hoy.getDate()) < 10 ? "0" + (hoy.getDate()) : hoy.getDate()
    let anioInicio = hoy.getFullYear() - agoCount + "";
    if (agoCount == 1) {
      return hoy.getFullYear() + "-01-01";
    } else {
      return anioInicio + "-" + mounth + "-" + day;
    }
  }


  public static obtenerDataSet(data, TempSalas, dChartData, aniosList, isProgramadosvs = false, tipoChart) {
    // aniosList = []
    aniosList.push({value: "-1", text: "-- Todos --"})
    dChartData["datasets"] = []
    if (isProgramadosvs) {
      let item1 = {
        label: "Pendientes",
        data: [],
      }
      let item2 = {
        label: "Programados",
        data: [],
      }
      data.forEach((itemDataDB, index) => {
        Object.keys(itemDataDB).forEach((itSala, posKey) => {
          if (posKey == 2) {
            item1.data.push(itemDataDB["02_Ingresados"])
          }
          if (posKey == 3) {
            item2.data.push(itemDataDB["Programados"])
          }
        })
      })
      dChartData["datasets"].push(item1);
      dChartData["datasets"].push(item2);

    } else {
      data.forEach((itemDataDB, index) => {
        if (itemDataDB["00_anno"]) {
          let tempData = []
          let nombre = ""
          if (itemDataDB["00_anno"]) {
            nombre = itemDataDB["00_anno"]
            aniosList.push({value: itemDataDB["00_anno"], text: itemDataDB["00_anno"]})
            TempSalas.forEach((key, index) => {
              if (index > 0) tempData.push(itemDataDB[key])
            })
          }


          dChartData["datasets"].push(
            {
              label: nombre,
              data: tempData,
            }
          );
        }
      })
    }
  }

  public static obtenerHeader(dataItem0) {
    return Object.keys(dataItem0).sort((a, b) => {
      return a.localeCompare(b)
    });
  }

  public static obtenerDataTable(data, tableData: any, totalesReportesList: any[], isParent = false, dataPositionParent) {
    // alert(dataPositionParent)
    if (dataPositionParent == 111) {
      tableData["ing_pro"] = true;
    }

    tableData['loading'] = true;
    tableData.headerTablaList = [];
    let tempListHeader = this.obtenerHeader(data[0])
    tableData["totalVerticalList"] = [];
    tableData["listaFiltroList"] = []
    let NombreFiltroVar = '';
    tableData.headerTablaList = tempListHeader

    let arrayTotalesHorizontal = [];
    data.forEach((dbItem) => {
      let AculumladoHorizontal = 0;
      tempListHeader.forEach((keyName, posHeaderOrdered) => {
        if (posHeaderOrdered == 0) {
          tableData["nombreFiltro"] = keyName.substring(3, keyName.length);
          NombreFiltroVar = keyName
        }

        Object.values(dbItem).forEach((value: any, posValue) => {
          this.obtenerTotalesHorizontales(arrayTotalesHorizontal, posHeaderOrdered, keyName, dbItem, posValue, value, dataPositionParent)
          this.obtenerListaFiltro(tableData, NombreFiltroVar, posHeaderOrdered, keyName, dbItem, posValue, value)
          AculumladoHorizontal += this.obtenerAcumuladorHorizontal(value, keyName, posValue, posHeaderOrdered, dbItem)
        })
      })
      tableData["totalVerticalList"].push(AculumladoHorizontal)
    })

    tableData["bodyDataList"] = data
    tableData.listDB = data
    tableData["totalHorizontal"] = Object.values(arrayTotalesHorizontal)

    let total = 0;
    tableData.totalHorizontal.forEach((value: any) =>
      !isNaN(value) ? total += value : 0
    )

    if (isParent) {

      totalesReportesList.push({parentPos: dataPositionParent, total: total})
    }
    tableData['loading'] = false;

  }

  public static obtenerListaSalas(TempSalas: string[], listaSalas: any, dChartData, isProgramadosvs = false) {
    dChartData["labels"] = []//listaHorizontal Grafico
    TempSalas.forEach((it, pos) => {

      if (isProgramadosvs) {
        // if (pos > 1 && pos < 4) {
        //   if (pos == 3) {
        //     dChartData["labels"].push(it)
        //   } else
        dChartData["labels"].push(it.substring(4, it.length))
        // }
      } else if (pos > 0) dChartData["labels"].push(it.substring(4, it.length))

      if (pos > 0) listaSalas.push({value: it.substring(0, 3), text: it.substring(4, it.length)})
    })
  }

  public static getMonthDifference(startDate, endDate) {
    return (endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear()));
  }

  public static obtenerNombreFiltro(tableData, nombreFiltro, keyName: string, posHeaderOrdered: number) {
    if (posHeaderOrdered == 0) {
      nombreFiltro = keyName;
      tableData["nombreFiltro"] = keyName.substring(3, keyName.length);
    }
    return nombreFiltro;
  }

  public static obtenerTotalesHorizontales(arrayTotalesHorizontal, posHeaderOrdered, keyName, dbItem, posValue, value, dataPositionParent) {
    if (dataPositionParent != 111) {
      if (posHeaderOrdered > 0 && keyName == Object.keys(dbItem)[posValue]) {
        arrayTotalesHorizontal[keyName] = parseInt(value) >= 0 ? (arrayTotalesHorizontal[keyName] || 0) + value : "";
      }
    } else if (dataPositionParent == 111) {
      if (posHeaderOrdered == 1) {
        arrayTotalesHorizontal[keyName] = 0
      }
      if (posHeaderOrdered > 1 && keyName == Object.keys(dbItem)[posValue]) {
        arrayTotalesHorizontal[keyName] = parseInt(value) >= 0 ? (arrayTotalesHorizontal[keyName] || 0) + value : "";
      }
    }
  }

  public static obtenerListaFiltro(tableData, nombreFiltro, posHeaderOrdered, keyName, dbItem, posValue, value) {
    if (nombreFiltro == Object.keys(dbItem)[posValue] && posHeaderOrdered == 0) {
      tableData["listaFiltroList"].push({value: value, text: value})
    }
  }

  public static obtenerAcumuladorHorizontal(value, keyName, posValue, posHeaderOrdered, dbItem) {
    let AculumladoHorizontal = 0
    if (keyName == Object.keys(dbItem)[posValue] && keyName != "01_Año" && posHeaderOrdered > 0 && !isNaN(parseInt(value))) {
      AculumladoHorizontal += value
    }
    return AculumladoHorizontal;
  }

  public static resetTableDetalle(dataPositionParent, tableDatosParentDetalle) {
    if (dataPositionParent == 2 || dataPositionParent == 4) {
      tableDatosParentDetalle.bodyDataList = []
      tableDatosParentDetalle.listDB = []
      tableDatosParentDetalle.headerTablaList = []
    }
  }

  public static obenerChartDataByPosition(dataPositionParent) {
    let dChartData = {}
    if (dataPositionParent == 1) {
      dChartData = Dependecias.chartData1___Ingresos
      Dependecias.chartData1___Ingresos.datasets = []
    } else if (dataPositionParent == 2) {
      Dependecias.CHARDATA_PROGRAMADOS.datasets = []
      dChartData = Dependecias.CHARDATA_PROGRAMADOS
    } else if (dataPositionParent == 3) {
      Dependecias.CHARDATA_ESCRITOS.datasets = []
      dChartData = Dependecias.CHARDATA_ESCRITOS
    } else if (dataPositionParent == 4) {
      Dependecias.CHARDATA_PENDIENTE_FALLO.datasets = []
      dChartData = Dependecias.CHARDATA_PENDIENTE_FALLO
    } else if (dataPositionParent == 5) {
      Dependecias.CHARDATA_MESA_PARTES.datasets = []
      dChartData = Dependecias.CHARDATA_MESA_PARTES
    } else if (dataPositionParent == 111) {
      Dependecias.CHARDATA_INGRESOS_VS_PROGRAMADOS.datasets = []
      dChartData = Dependecias.CHARDATA_INGRESOS_VS_PROGRAMADOS
    }
    return dChartData;
  }

  public static obtenerTablaByNro(nroTable) {
    let tableData = {}
    if (nroTable == "02") tableData = Dependecias.table02;
    else if (nroTable == "01") tableData = Dependecias.table01;
    else if (nroTable == "03") tableData = Dependecias.tableDatosParentDetalle;
    return tableData;
  }
}
