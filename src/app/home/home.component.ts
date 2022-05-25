import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form = this.fb.group({
    id: ['',[ Validators.required, Validators.pattern("^[0-9]*$"),]],
  });

  constructor(private fb: FormBuilder,private readonly postsService:PostsService) { }

  ngOnInit() {
  }

  onSubmit(){
    if (this.form.valid) {
      const body = this.form.value;
      this.postsService.getPost(body.id).subscribe((res) => {
        console.log('res', res);
      });
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
