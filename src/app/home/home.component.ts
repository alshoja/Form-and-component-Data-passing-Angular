import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form = this.fb.group({
    id: ['',[ Validators.required, Validators.pattern("^[0-9]*$"),]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(){
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
