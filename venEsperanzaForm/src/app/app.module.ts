import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';

import { NgModule } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule  } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import {
  ActualizarDatosComponent
 } from './actualizar-datos/actualizar-datos.component';
 
 import {
   ReportarLlegadaComponent
  } from './reportar-llegada/reportar-llegada.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import {RouterModule} from '@angular/router';

//Routing
import {AppRoutes} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    ActualizarDatosComponent,
    ReportarLlegadaComponent
  ],
    imports: [
        BrowserModule, BrowserAnimationsModule,
        MatFormFieldModule, MatStepperModule,
        FormsModule, ReactiveFormsModule, MatInputModule,
        MatButtonModule, MatRadioModule, MatGridListModule, FlexLayoutModule,
        CommonModule, MatDatepickerModule, MatNativeDateModule,
        MatSelectModule, MatCheckboxModule,
        HttpClientModule, MatSnackBarModule, MatProgressSpinnerModule,
        MatCardModule, MatIconModule, MatSlideToggleModule,
        RouterModule.forRoot(AppRoutes),
        MatAutocompleteModule

    ],
  providers: [MatDatepickerModule,MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
