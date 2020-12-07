import {Routes} from '@angular/router';
//Layouts
import {
  CasualLayout, BlankComponent
} from './@pages/layouts';

import {
  AuthGuardService
} from './services/authGuard.service';
import { CasualDashboardComponent } from './dashboard/casual/dashboard.component';

export const AppRoutes: Routes = [

  {
    path: 'registros',
    data: {
      breadcrumb: 'Home'
    },
    component: CasualLayout,
    canActivate: [AuthGuardService],

    children: [
      {
        path: '',
        loadChildren: './tables/tables.module#TablesModule'
      },
      {
        path: 'dashboard',
        component: CasualDashboardComponent
      }
    ]
  },
  {
    path: 'auth',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: './session/session.module#SessionModule'
      }
    ]
  }
  ,
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
