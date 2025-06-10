import { TestBed } from '@angular/core/testing';

import { Validate } from './validate';

describe('Validate', () => {
  let service: Validate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Validate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
