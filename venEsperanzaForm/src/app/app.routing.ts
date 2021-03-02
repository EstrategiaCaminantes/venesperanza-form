import {Routes} from '@angular/router';

import {
    FormComponent
  } from './form/form.component';

  import {
    HomeComponent
  } from './home/home.component';
  
  import {
   ActualizarDatosComponent
  } from './actualizar-datos/actualizar-datos.component';
  
  import {
    ReportarLlegadaComponent
   } from './reportar-llegada/reportar-llegada.component';
/*
//Layouts
import {
    CondensedComponent, BlankComponent
} from './@pages/layouts';

import {
  DashboardOrgComponent
} from './dashboard/dashboard-org/dashboard-org.component';

import {
  DashboardGeneralComponent
} from './dashboard/dashboard-general/dashboard-general.component';

import {
  AuthGuardService
} from './services/authGuard.service';

import {
  AuthGuardMasterService
} from './services/authGuardMaster.service';*/

export const AppRoutes: Routes = [

    /*{
        path: '**',
        //redirectTo: 'auth/login'
        redirectTo: 'home'
    },*/
    {
        path: '',
        /*data: {
            breadcrumb: 'Info'
        },*/
        component: HomeComponent,
        //canActivate: [AuthGuardService],
        //canActivateChild: [AuthGuardService],
        /*children: [
            {
                path: '',
                loadChildren: './forms/forms.module#FormsPageModule'
            }
        ], */
    },
    {
        path: 'encuesta',
        /*data: {
            breadcrumb: 'Info'
        },*/
        component: FormComponent,
        //canActivate: [AuthGuardService],
        //canActivateChild: [AuthGuardService],
        /*children: [
            {
                path: '',
                loadChildren: './forms/forms.module#FormsPageModule'
            }
        ], */
    },
    {
        path: 'actualizar',
        /*data: {
            breadcrumb: 'Info'
        },*/
        component: ActualizarDatosComponent,
        //canActivate: [AuthGuardService],
        //canActivateChild: [AuthGuardService],
        /*children: [
            {
                path: '',
                loadChildren: './forms/forms.module#FormsPageModule'
            }
        ], */
    },
    {
        path: 'llegada',
        /*data: {
            breadcrumb: 'Info'
        },*/
        component: ReportarLlegadaComponent,
        //canActivate: [AuthGuardService],
        //canActivateChild: [AuthGuardService],
        /*children: [
            {
                path: '',
                loadChildren: './forms/forms.module#FormsPageModule'
            }
        ], */
    }
   /* {
        path: 'org',
        data: {
            breadcrumb: 'Info'
        },
        component: CondensedComponent,
        canActivate: [AuthGuardService],
        //canActivateChild: [AuthGuardService],
        children: [
            {
                path: '',
                loadChildren: './forms/forms.module#FormsPageModule'
            }
        ],
    },
    {
      path: 'dashboard',
      data: {
          breadcrumb: 'Dashboard'
      },
      component: CondensedComponent,
      canActivate: [AuthGuardService],
      //canActivateChild: [AuthGuardService],
      children: [
          {
              path: 'organizacion',
              data: {
                breadcrumb: 'Organización'
            },
              //loadChildren: './dashboardOrg/dashboardOrg.module#DashboardOrgModule'
              component: DashboardOrgComponent
          },
          {
            path: 'general',
            data: {
              breadcrumb: 'General'
            },
              //loadChildren: './dashboardOrg/dashboardOrg.module#DashboardOrgModule'
            component: DashboardGeneralComponent,
            //canActivate: [AuthGuardMasterService]
          }
      ],
    },
    {
      path: 'usuarios',
      data: {
          breadcrumb: 'Usuarios'
      },
      component: CondensedComponent,
      canActivate: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      children: [
          {
              path: '',
              loadChildren: './users/users.module#UsersAdminModule'
          }
      ],
    },
    {
      path: 'organizaciones',
      data: {
          breadcrumb: 'Organizaciones'
      },
      component: CondensedComponent,
      canActivate: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      children: [
          {
              path: '',
              loadChildren: './organizations/organizations.module#OrganizationsAdminModule'
          }
      ],
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
        //redirectTo: 'auth/login'
        redirectTo: 'org'
      }*/
];
