import { TestBed } from '@angular/core/testing';

import { BootinfoService } from './bootinfo.service';

describe('BootinfoService', () => {
  let service: BootinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BootinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
