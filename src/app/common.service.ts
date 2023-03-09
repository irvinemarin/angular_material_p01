import {Injectable, EventEmitter, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  @Output() aClickedEvent = new EventEmitter<string>();
  @Output() onClickedBuscarListener = new EventEmitter<string>();

  actionClicked(msg: string) {
    this.aClickedEvent.emit(msg);
  }

  onActionClickListener(msg: string) {
    this.onClickedBuscarListener.emit(msg);
  }

}
