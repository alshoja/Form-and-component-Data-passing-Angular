import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   error=false;
   message:string ='';
   form = this.fb.group({
    id: ['',[ Validators.required, Validators.pattern("^[0-9]*$"),]],
  });

  constructor(private fb: FormBuilder,private readonly postsService:PostsService) { }

  ngOnInit() {
  }

  /**
  * @deprecated
  * Old subscription pattern has been deprecated
  * https://rxjs.dev/deprecations/subscribe-arguments
  */

  onSubmit(): void{
    if (this.form.valid) {
      const body = this.form.value;
      this.postsService.getPost(body.id).subscribe({
        next: (user) => { console.log('user',user)  },
        error: (err) => {
          if(err.status == 404) {
          this.error = true;
          this.message = err.error.message;
        }
      },
        complete: () => {console.log('completed')  }
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
