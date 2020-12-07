import { Component, OnInit } from '@angular/core';
//import {UserService} from '../../services/users.service';
import {Router} from '@angular/router';
import { MessageService } from '../../@pages/components/message/message.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterPageComponent implements OnInit {
  //Sample Variables for the form
  name;
  //txtlname;
  //txtusername;
  txtpassword;
  txtemail;

  //constructor( private userService: UserService, private router: Router, private messageservice: MessageService) {}
constructor() {}


  ngOnInit() {}/*

  crearUsuario(){

    if (this.name && this.txtemail && this.txtpassword) {
            const usuario = {
                'name': this.name,
                'email': this.txtemail,
                'password': this.txtpassword
            };

            this.userService.registroUsuario(usuario).subscribe( res => {
                console.log('RESPUESTA: ', res);
                this.router.navigate(['../auth/login']);
            }, error =>{
                console.log('ERROR!!' );
                this.messageservice.create(
                    'danger',
                    'No se puedo crear el Usuario, intente nuevamente!',
                    {
                    Position: 'top-right',
                    Style: 'bar',
                    Duration: 4000
                    }
                );

            });
        } else {
            console.log('error');
        }

    }
*/


}
