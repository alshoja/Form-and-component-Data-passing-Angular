import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private postSource = new BehaviorSubject<Post>({} as Post);
  post$ = this.postSource.asObservable();
  constructor() { }

  sendPostToComponent(post: Post) {
    this.postSource.next(post)
  }
}
