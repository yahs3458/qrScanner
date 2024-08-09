import { TestBed } from '@angular/core/testing';

import { IonloaderService } from './ionloader.service';

describe('IonloaderService', () => {
  let service: IonloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
