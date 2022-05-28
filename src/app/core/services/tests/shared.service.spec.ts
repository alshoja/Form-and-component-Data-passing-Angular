/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { SharedService } from '../shared.service';

describe('Service: Shared', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService]
    });
  });

  it('should ...', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));

  it('should be equal to post passed', inject([SharedService], (service: SharedService) => {
    const mockUser = {
      "userId": 1,
      "id": 9,
      "title": "nesciunt iure omnis dolorem tempora et accusantium",
      "body": "consectetur animi nesciunt "
    }
    service.sendPostToComponent(mockUser);
    expect(service.post$).toBeTruthy();
    service.post$.subscribe((data) => {
      expect(data).toEqual(mockUser);
    });
  }));
});
