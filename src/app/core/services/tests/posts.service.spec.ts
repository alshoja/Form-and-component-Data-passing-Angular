/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostsService } from '../posts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';


describe('Service: Posts', () => {
  let httpController: HttpTestingController;
  let API_URL = environment.url

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService],
      imports: [HttpClientTestingModule]
    });
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get one post', inject([PostsService], (service: PostsService) => {
    const mockUser = {
      "userId": 1,
      "id": 9,
      "title": "nesciunt iure omnis dolorem tempora et accusantium",
      "body": "consectetur animi nesciunt "
    }

    const id = 1;
    service.getPost(id).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });
    const request = httpController.expectOne({ method: 'GET', url: `${API_URL}/posts/${id}`, });
    request.flush(mockUser);
  }));

});
