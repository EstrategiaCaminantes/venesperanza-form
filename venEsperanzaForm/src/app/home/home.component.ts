import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { requiredFileType } from "./requireFileTypeValidators";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  constructor(private formBuilder: FormBuilder,private elementRef: ElementRef, 
    private router: Router, private activatedRouter:ActivatedRoute) {
  }

  ngOnInit(): void {
  }
}
