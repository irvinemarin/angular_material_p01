import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  DialogDataConfirmation,
  ModalConfirmationBaseComponent
} from "../modal-confimation-base/modal-confirmation-base.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSelectChange} from "@angular/material/select";

export interface DialogData {
  title: string;
  action: string;
  typeObject: string;
}

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.css']
})
export class ModalBaseComponent implements OnInit {

  titleHint: any;
  descripionAccion = "";

  constructor(
    private _snackBar: MatSnackBar,
    public mDialogBaseRef: MatDialogRef<ModalBaseComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public DEP_MatDialog: MatDialog,
  ) {
    this.ACTION = data.action

  }

  getAllInputs(tableCode: number) {
    this.hideProgress = false
    // this.formsWS.getAllInputsByTableId(tableCode)
    //   .subscribe(
    //     (data: []) => {
    //     },
    //     error => {
    //       console.log(error);
    //       this.hideProgress = true
    //     });
  }

  ACTION = ''

  onNoClick(): void {
    this.mDialogBaseRef.close("CANCEL");
  }

  ngOnInit() {
  }

  onClickActionListener(action: string, item) {

  }

  openSnackBar(msj, btnActionText) {
    this._snackBar.open(msj, btnActionText, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000
    });
  }

  private createItemField(item: any) {
    // this.formsWS.createChilInput(item)
    //   .subscribe(
    //     (data) => {
    //       this.openSnackBar("Columna Agregada Correctamente", null)
    //
    //     },
    //     error => {
    //       this.openSnackBar(error, 'OK')
    //
    //       console.log(error);
    //     });
  }

  openDialog(item: any): void {
    let data: DialogDataConfirmation =
      {
        action: "UPD",
        description: "Esta seguro que quiere guardar los cambios de",
        title: "MODIFICAR",
        typeObject: item["txt_name"]
      }
    const dialogRef = this.DEP_MatDialog.open(ModalConfirmationBaseComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == "CONF") {
        this.updateItemDetailTableData(item, "UC");
        item.isSaveInit = false;
      } else {
        item.isSaveInit = true;
      }
      item.isEditMode = false;
    });
  }

  openDialogPreview(item: any): void {
  }

  updateItemDetailTableData(row: any, actionRow: string): void {
    this.dataSourceModel.nom_datasource = row["ds_name"]
    this.dataSourceModel.type_datasource = row["type_datasource"]
    row['ds'] = this.dataSourceModel
    if (row['ns_table_field'] == null) {
      row['op'] = 2
      this.mDialogBaseRef.close(row)
    } else {
      row['iDet_op'] = 2
    }

    if (row['iDet_op'] == 2) {
      // this.formsWS.updateChilInput(row["ns_table_field"], row)
      //   .subscribe(
      //     (data) => {
      //       // this.getAllForms()
      //       // alert("updating")
      //       this.openSnackBar("Columna Modificada Correctamente", 'OK')
      //       row.isDisabled = true
      //     },
      //     error => {
      //       console.log(error);
      //     });
    }

    if (row['iDet_op'] == 1) {
      // this.formsWS.createForm(row)
      //   .subscribe(
      //     (data) => {
      //
      //       // this.getAllForms()
      //     },
      //     error => {
      //       console.log(error);
      //     });
    }

  }

  onChangeSildeListener(is_active: boolean, itemRowForm) {
    if (is_active) {
      itemRowForm.is_active = '1'
    } else {
      itemRowForm.is_active = '0'
    }
  }

  // @ts-ignore
  @ViewChild('cont') public contEl: ElementRef<any>;

  // @ts-ignore
  @ViewChild('contAction') public contActionEl: ElementRef<any>;
  hideProgress = true;
  dataListActions = [];
  dataListKey = [];
  dataSourceModel = {
    nom_datasource: "",
    type_datasource: 0,
  };
  tableModel = {};

  AddRowItem(actions: string) {

    if (actions == 'ACTIONS') {
      let itemAction = {
        ns_action: 0,
        txt_action: "",
        is_active: '1',
        li_action: 1,
        createMode: true
      }
      this.dataListActions.push(itemAction)

    } else {

      let newItemField: TableFieldModel = {
        data_type: "",
        decimal_field: 0,
        initial_value: "",
        is_key: "",
        is_not_null: "0",
        length_field: 0,
        ns_table_field: 0,
        txt_descripcion: "",
        ns_table: 0,
        des_code: "",
        txt_name: "",
        is_active: '0'
      };
      newItemField['isCreateMode'] = true
      this.scrollToBottom(this.contEl)

    }

  }

  scrollToBottom(contEl: ElementRef<any>): void {
    this.hideProgress = false
    setTimeout(() => {
      // alert("1 sec pas")
      try {
        this.contEl.nativeElement.scrollTop = contEl.nativeElement.scrollHeight;
        this.hideProgress = true
      } catch (err) {
      }
    }, 1000);

  }

  onEventResultAction(event) {
    // this.onClickActionListener(event.action, event.itemRow)
  }

  onCancelActionClickListener(item: any) {
    this.removeFromView(this.dataListActions, item)

  }

  onDeleteActionClickListener(item: any) {

    this.deleteFromDB(item);

  }

  private deleteFromDB(item: any) {
    // this.formsWS.deleteFormAction(item['ns_action'])
    //   .subscribe(
    //     (data) => {
    //
    //       this.openSnackBar("ELIMINADO ", 'OK')
    //       this.removeFromView(this.dataListActions, item)
    //     },
    //     error => {
    //       this.openSnackBar(error.message, "x")
    //     });
  }

  removeFromView(list: any[], item: any) {
    const index = list.indexOf(item, 0);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.mDialogBaseRef.close()
    }
  }

  onSaveActionClickListener(itemAction: any) {

    delete itemAction['createMode']
    delete itemAction['isDisabled']

    // if (itemAction.isEditMode) {
    //   delete itemAction['isEditMode']
    //
    //   let data = {
    //     action: itemAction,
    //     item_mov_action: {}
    //   }
    //
    //   this.formsWS.updateActionToForm(data, itemAction['ns_action'])
    //     .subscribe(
    //       (data) => {
    //         this.openSnackBar("REGISTRADO ", 'OK')
    //         itemAction['isDisabled'] = true
    //       },
    //       error => {
    //         this.openSnackBar(error.message, "x")
    //         itemAction['isDisabled'] = true
    //
    //       });
    // } else {
    //   let data = {
    //     action: itemAction,
    //     item_mov_action: {}
    //   }
    //
    //   this.formsWS.createActionToForm(data)
    //     .subscribe(
    //       (data) => {
    //
    //         this.openSnackBar("REGISTRADO ", 'OK')
    //
    //       },
    //       error => {
    //         this.openSnackBar(error.message, "x")
    //       });
    // }

  }

  onEditActionClickListener(itemAction: any) {
    itemAction['isEditMode'] = true
  }

  onChangeSelectValue(itemAction, key, event: MatSelectChange) {
    itemAction[key] = parseInt(event.value)
  }
}

export interface TableFieldModel {
  ns_table_field: number,
  ns_table: number,
  des_code: string,
  txt_name: string,
  txt_descripcion: string,
  data_type: string,
  length_field: number,
  decimal_field: number,
  is_not_null: string,
  is_key: string,
  initial_value: string,
  is_active: string
}

