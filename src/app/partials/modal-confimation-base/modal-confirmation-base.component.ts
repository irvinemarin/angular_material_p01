import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-confirmation-base.component.html',
  styleUrls: ['./modal-confirmation-base.component.css']
})
export class ModalConfirmationBaseComponent implements OnInit {

  titleHint: any;
  descripionAccion = "";


  constructor(
    public dialogRef: MatDialogRef<ModalConfirmationBaseComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogDataConfirmation
  ) {
    dialogRef.disableClose = true;
    this.titleHint = data.title
    this.descripionAccion = data.description

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }


}

export interface DialogDataConfirmation {
  title: string;
  action: string;
  description: string;
  typeObject: string;
}
