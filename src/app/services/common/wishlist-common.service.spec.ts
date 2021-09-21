import { TestBed } from '@angular/core/testing';

import { WishlistCommonService } from './wishlist-common.service';

describe('WishlistCommonService', () => {
  let service: WishlistCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
