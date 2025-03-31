import { TestBed } from '@angular/core/testing';

import { ServicesProxyLogsService } from './services-proxy-logs.service';

describe('ServicesProxyLogsService', () => {
  let service: ServicesProxyLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesProxyLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
