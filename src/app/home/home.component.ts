import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../core/interfaces/post.interface';
import { PostsService } from '../core/services/posts.service';
import { SharedService } from '../core/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public errorState = false;
  public errorMessage: string = '';
  public subscription!: Subscription;
  public form = this.fb.group({
    id: ['', [Validators.required, Validators.pattern("^[0-9]*$"),]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly postsService: PostsService,
    private router: Router,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  /**
  * @note
  * Passing data using route state is also possible, checkout my another branch
  * https://github.com/alshoja/scal-fe/tree/pass-data-through-route-method
  */

  onSubmit(): void {
    if (this.form.valid) {
      const body = this.form.value;
      this.subscription = this.postsService.getPost(body.id).subscribe({
        next: (post) => {
          if (
            !post.hasOwnProperty("title") ||
            !post.hasOwnProperty("body") ||
            !post.title ||
            !post.body
          ) {
            this.errorState = true;
            this.errorMessage = 'Either Body or Title is Missing';
          } else {
            this.sharedService.sendPostToComponent(post);
            this.router.navigateByUrl('/post/detail');
          }
        },
        error: (err) => {
          if (err.status == 404) {
            this.errorState = true;
            this.errorMessage = err.error.message;
          }
        }
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
