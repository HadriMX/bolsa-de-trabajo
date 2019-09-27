import { TestBed } from '@angular/core/testing';

import { RegistroService } from './registro.service';

describe('RegistroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistroService = TestBed.get(RegistroService);
    expect(service).toBeTruthy();
  });
});
