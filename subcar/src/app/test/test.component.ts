import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
$(window).on('load', function() {
  //for use in production please remove this setTimeOut
  setTimeout(function(){ 
      $('.preloader').addClass('preloader-deactivate');
  }, 1000);
  //uncomment this line for use this snippet in production
  //	$('.preloader').addClass('preloader-deactivate');
});

  }

}
