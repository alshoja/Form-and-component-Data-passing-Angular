import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Post } from '../core/interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public post: Post | undefined;
  constructor(private location: Location) { }

  ngOnInit() {
    this.post =this.location.getState() as unknown as Post;
    if(!this.post.id) this.goBack();
    console.log('crapy post',this.post)
  }

  goBack() {
    this.location.back()
  }

}
