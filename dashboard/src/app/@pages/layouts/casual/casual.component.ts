import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RootLayout} from '../root/root.component';

declare var pg: any;

@Component({
    selector: 'casual-layout',
    templateUrl: './casual.component.html',
    styleUrls: ['./casual.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CasualLayout extends RootLayout implements OnInit {
    menuItems = [
        /*{
          label: 'Dashboard',
          details: '12 New Updates',
          routerLink: 'dashboard',
          iconType: 'pg',
          iconName: 'home'
        },*/
        {
            label: 'Registros',
            routerLink: '/registros',
            iconType: 'pg',
            iconName: 'home'
        },
        {
            label: 'Dashboard',
            routerLink: '/registros/dashboard',
            iconType: 'pg',
            iconName: 'tables'
        }
    ];

    ngOnInit() {
        pg.isHorizontalLayout = true;
        this.changeLayout('horizontal-menu');
        this.changeLayout('horizontal-app-menu');
    }
}
