import { TestBed } from '@angular/core/testing';

import { servicesproxy } from './proxyservices.service';

describe('ProxyservicesService', () => {
  let service: servicesproxy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(servicesproxy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
