import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavBarComponent} from './partials/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from "@angular/material/dialog";
import {ModalBaseComponent} from './partials/modal-base/modal-base.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {ModalConfirmationBaseComponent} from "./partials/modal-confimation-base/modal-confirmation-base.component";
import {MatChipsModule} from "@angular/material/chips";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatRippleModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgChartsModule} from "ng2-charts";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from "@angular/material/stepper";

import {LoginComponent} from './client/login/login.component';

import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormatTimePipe} from "./client/login/format-time.pipe";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatBadgeModule} from "@angular/material/badge";
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ModalBaseComponent,
    ModalConfirmationBaseComponent,
    LoginComponent,
    FormatTimePipe,
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatChipsModule,
    DragDropModule,
    MatSidenavModule,
    MatRippleModule,
    MatListModule,
    MatTabsModule,
    MatSliderModule,
    MatButtonToggleModule,
    NgChartsModule,
    MatStepperModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    MatAutocompleteModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalBaseComponent,
    ModalConfirmationBaseComponent,
  ],
})
export class AppModule {

}
