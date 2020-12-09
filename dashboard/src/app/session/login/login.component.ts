import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../@pages/components/message/message.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userEmail;
  password;

  remember = true;


  constructor(private authService: AuthService, private messageservice: MessageService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['./registros']);
    }
  }


  ngOnInit() {

  }

  login() {

    if (this.userEmail && this.password) {
      const usuario = {
        'email': this.userEmail,
        'password': this.password
      };

      this.authService.loginUsuario(usuario).subscribe(res => {
        if (res['res']) {
          this.authService.SetLoggedIn(res, this.remember);
          this.router.navigate(['../registros']);
          this.messageservice.create(
            'primary',
            'Bienvenido al sistema!',
            {
              Position: 'top-right',
              Style: 'bar',
              Duration: 4000
            }
          );

        } else {
          this.messageservice.create(
            'danger',
            'Datos de Usuario incorrectos, intente nuevamente!',
            {
              Position: 'top-right',
              Style: 'bar',
              Duration: 4000
            }
          );

        }


      }, error => {
        //console.log('ERROR!!' );
        this.messageservice.create(
          'danger',
          'Datos de Usuario incorrectos, intente nuevamente!',
          {
            Position: 'top-right',
            Style: 'bar',
            Duration: 4000
          }
        );

      });
    } else {
      //console.log('error');
    }
  }
}
