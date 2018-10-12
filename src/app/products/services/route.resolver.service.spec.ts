import { TestBed, inject } from '@angular/core/testing';

import { Route.ResolverService } from './route.resolver.service';

describe('Route.ResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Route.ResolverService]
    });
  });

  it('should be created', inject([Route.ResolverService], (service: Route.ResolverService) => {
    expect(service).toBeTruthy();
  }));
});
