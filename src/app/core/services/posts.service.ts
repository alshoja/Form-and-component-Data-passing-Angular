import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private API_URL = environment.url;
  constructor(private http: HttpClient) {}

  public getPost(id:number):Observable<Post> {
    return this.http.get<Post>(this.API_URL+'/posts/'+ id);
  }
}
