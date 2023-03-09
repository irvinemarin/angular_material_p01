import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerContent} from "@angular/material/sidenav";

export interface ActionReporteResult{

}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() eventResultAction = new EventEmitter<ActionReporteResult>();

  constructor() {
  }

  ngOnInit() {
    this.isSmallScreendwidth()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isSmallScreendwidth()
  }

  screendSize = 0

  isSmallScreendwidth() {

    this.screendSize = window.innerWidth
    return window.innerWidth < 760;
  }

  onItemReporteCLickListener(event: ActionReporteResult, drawer: MatDrawer) {

    // event.dataSelected["active"] = true
    // let action: ActionReporteResult = {
    //   action: event.dataSelected["name"],
    //   positionItem: event.positionItem,
    //   dataSelected: event.dataSelected
    // }
    //
    // this.eventResultAction.emit(action);
    // drawer.close()
  }

  onClickDraweToggleListener(drawer: MatDrawer, contentDrawer: MatDrawerContent) {
    drawer.toggle()
  }

  downloadImage() {

    // html2canvas(this.screen.nativeElement).then(canvas => {
    //   this.canvas.nativeElement.src = canvas.toDataURL();
    //   this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
    //   this.downloadLink.nativeElement.download = 'marble-diagram.png';
    //   this.downloadLink.nativeElement.click();
    // });

  }

}
