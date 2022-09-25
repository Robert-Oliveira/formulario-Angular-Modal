import { TestBed } from '@angular/core/testing';

import { SalvarRoteiroService } from './salvar-roteiro.service';

describe('SalvarRoteiroService', () => {
  let service: SalvarRoteiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarRoteiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
