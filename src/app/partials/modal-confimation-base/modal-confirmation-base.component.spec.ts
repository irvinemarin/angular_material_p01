import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmationBaseComponent } from './modal-confirmation-base.component';

describe('ModalBaseComponent', () => {
  let component: ModalConfirmationBaseComponent;
  let fixture: ComponentFixture<ModalConfirmationBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmationBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
