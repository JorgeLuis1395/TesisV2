import { TestBed } from '@angular/core/testing';

import { InformacionEstudianteService } from './informacion-estudiante.service';

describe('InformacionEstudianteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformacionEstudianteService = TestBed.get(InformacionEstudianteService);
    expect(service).toBeTruthy();
  });
});
