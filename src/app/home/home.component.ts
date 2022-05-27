import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../core/interfaces/post.interface';
import { PostsService } from '../core/services/posts.service';
import { SharedService } from '../core/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public error = false;
  public message: string = '';
  form = this.fb.group({
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
  * @deprecated
  * Old subscription pattern has been deprecated
  * https://rxjs.dev/deprecations/subscribe-arguments
  */

  onSubmit(): void {
    if (this.form.valid) {
      const body = this.form.value;
      this.postsService.getPost(body.id).subscribe({
        next: (post) => {
          if (
            !post.hasOwnProperty("title") ||
            !post.hasOwnProperty("body") ||
            !post.title ||
            !post.body
          ) {
            this.error = true;
            this.message = 'Either Body or Title is Missing';
          } else {
            this.sharedService.sendPostToComponent(post);
            this.router.navigateByUrl('/post/detail');
          }
        },
        error: (err) => {
          if (err.status == 404) {
            this.error = true;
            this.message = err.error.message;
          }
        }
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
