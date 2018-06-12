import { TestBed, inject } from '@angular/core/testing';

import { GreedySearchService } from './greedy-search.service';

describe('GreedySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreedySearchService]
    });
  });

  it('should be created', inject([GreedySearchService], (service: GreedySearchService) => {
    expect(service).toBeTruthy();
  }));
});
