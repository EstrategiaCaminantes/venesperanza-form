import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';

export const TableRoutes: Routes = [
  {
    path: '',
    component: BasicComponent,
    data: {
      title: 'Registros'
    }
  }
];
