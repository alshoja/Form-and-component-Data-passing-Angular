import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Post } from '../core/interfaces/post.interface';
import { SharedService } from '../core/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  public post!: Post;
  public subscription!: Subscription;

  constructor(
    private location: Location,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit() {
    this.subscription = this.sharedService.post$.subscribe({ next: (post) => this.post = post });
    if (!Object.keys(this.post).length) this.goBack();
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
