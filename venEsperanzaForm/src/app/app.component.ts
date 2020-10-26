import { Component, OnInit } from '@angular/core';

import { FormService } from  './services/form.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  title = 'venEsperanzaForm';

  error = false;
  /*
  referrer:any = document.referrer;

   queryString:any = window.location.search;*/

  
   

  //ip: any = window.RTCPeerConnection 

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  show = false;

  constructor( private formService: FormService) {}
  

    ngOnInit(){
     
      /*this.formService.getIp().subscribe(res=>{
        console.log("LA IP ES: ",res['ip']);

      })*/
      /*
      const urlParams = new URLSearchParams(this.queryString);
      //const fbclid = urlParams.get('fbclid');
      const fbclid = "qwrud08afbadsf";

      console.log("REFERER: ", this.referrer);
      console.log("queryString_ ",this.queryString);
      console.log("urlparams: ", urlParams);
      console.log("FBCLIID: ",fbclid);
      this.referrer = "";

      console.log("REFERER: ",this.referrer);
      if( (this.referrer.includes("http://l.facebook.com") || this.referrer.includes("https://l.facebook.com") || this.referrer.includes("http://facebook.com") || 
      this.referrer.includes("https://facebook.com") || this.referrer.includes("http://l.facebook.com") || this.referrer.includes("https://l.facebook.com") || this.referrer.includes("http://m.facebook.com") || this.referrer.includes("https://m.facebook.com") || this.referrer.includes("http://lm.facebook.com") || this.referrer.includes("http://lm.facebook.com")) && fbclid){

     

        console.log("REFERER: ",this.referrer);
        let params ={
          'datos': {
                     'url_origen': this.referrer,
                      'ip': '1243',
                     'facebookclid': fbclid}
          
        }
        this.formService.getValidation(params).subscribe(res=>{
          console.log("RESPUESTA DE VALIDACON: ",res);
          
          this.show = true;

        },error=>{

          this.error = true;
        });

        

      }else{
        this.error = true;
        
      } 
      */
    }

  
}
