import { TestBed } from '@angular/core/testing';

import { CandidatService } from './candidat.service';

describe('CandidatService', () => {
  let service: CandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatService);
  });

  it('devrait être crée', () => {
    expect(service).toBeTruthy();
  });
});
