import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
    console.log('haaaaaaaaaaaaaaaaaaaa')
  }

  goBack(){
    this.location.back()
  }

}
