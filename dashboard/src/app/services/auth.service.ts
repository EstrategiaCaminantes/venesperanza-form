import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SERVER_URL = environment.server;
  client = environment.client;
  info = this.local();

  public Autorizacion = (this.info['res'] !== undefined) ? (this.info['res'] !== undefined) ? this.info['res'] : null : null;
  remember = false;

  constructor(private httpClient: HttpClient, private route: Router) {
  }

  // ...
  public isLoggedIn() {

    return (this.Autorizacion != null);
    //this.Autorizacion
    //const token = localStorage.getItem('token');

    //console.log('el token es: ',token);
    // Check whether the token is expired and return
    // true or false
    //return token;
    //return !this.jwtHelper.isTokenExpired(token);
  }

  //return (this.Autorizacion != null)? true: false;

  //public module = [];

  private local() {
    return (localStorage.token !== undefined) ? (JSON.parse(localStorage.token) !== undefined) ? JSON.parse(localStorage.token) : {} : {};
  }

  SetLoggedIn(value, remember) {
    this.info = value;
    //this.module = this.menu[this.info['data']['usuario']['id_perfil']];
    this.Autorizacion = (this.info['res'] !== undefined) ? this.info['res'] : null;
    this.remember = remember;
    localStorage.setItem('token', JSON.stringify(value));
  }

  loginUsuario(usuario) {
    return this.httpClient.post(this.SERVER_URL + 'loginDashboard', usuario, {
      headers: {'Authorization': 'Bearer ' + this.client}
    });
  }

  logout() {
    return this.httpClient.get(this.SERVER_URL + 'logout/' + this.Autorizacion['remember_token'], {
      headers: {'Authorization': 'Bearer ' + this.Autorizacion['remember_token']}
    }).subscribe(res => {
        //console.log(res);
        if (res) {
          this.Autorizacion = null;
          localStorage.removeItem('token');
          this.route.navigate(['../auth/login']);
        }
      },
      error => {
        this.Autorizacion = null;
        localStorage.removeItem('token');
        this.route.navigate(['../auth/login']);
      });
  }
}
