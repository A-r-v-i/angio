import { TestBed } from '@angular/core/testing';

import { AlertGuardGuard } from './alert-guard.guard';

describe('AlertGuardGuard', () => {
  let guard: AlertGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlertGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
