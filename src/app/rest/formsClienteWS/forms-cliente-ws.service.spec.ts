import { TestBed } from '@angular/core/testing';

import { FormsClienteWSService } from './forms-cliente-ws.service';

describe('FormsClienteWSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsClienteWSService = TestBed.get(FormsClienteWSService);
    expect(service).toBeTruthy();
  });
});
