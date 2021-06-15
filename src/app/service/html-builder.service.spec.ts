import { TestBed } from '@angular/core/testing';

import { HtmlBuilderService } from './html-builder.service';

describe('HtmlBuilderService', () => {
  let service: HtmlBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
