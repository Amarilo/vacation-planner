import { TestBed } from '@angular/core/testing';

import { UiSelectionService } from './ui-selection.service';

describe('UiSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiSelectionService = TestBed.get(UiSelectionService);
    expect(service).toBeTruthy();
  });
});
