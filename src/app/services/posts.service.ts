import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private API_URL = environment.url;
  constructor(private http: HttpClient) {}

  public getPost(id:number) {
    return this.http.get(this.API_URL+'/posts/'+ id);
  }
}
