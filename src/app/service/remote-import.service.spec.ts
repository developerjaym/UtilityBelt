import { TestBed } from '@angular/core/testing';

import { RemoteImportService } from './remote-import.service';

describe('RemoteImportService', () => {
  let service: RemoteImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
