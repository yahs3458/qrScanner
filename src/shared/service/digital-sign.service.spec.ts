import { TestBed } from '@angular/core/testing';

import { DigitalSignService } from './digital-sign.service';

describe('DigitalSignService', () => {
  let service: DigitalSignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalSignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
