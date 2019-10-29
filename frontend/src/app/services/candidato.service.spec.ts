import { TestBed } from '@angular/core/testing';

import { CandidatoService } from './candidato.service';

describe('CandidatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatoService = TestBed.get(CandidatoService);
    expect(service).toBeTruthy();
  });
});
