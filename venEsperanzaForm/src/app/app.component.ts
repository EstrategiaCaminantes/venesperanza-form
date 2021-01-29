import {Component, OnInit} from '@angular/core';

import {FormService} from './services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private formService: FormService) {
  }

  ngOnInit() {
  }
}
