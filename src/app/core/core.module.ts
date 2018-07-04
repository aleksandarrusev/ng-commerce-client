import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {CoreRoutingModule} from './core-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  exports: [
    HeaderComponent,
    CoreRoutingModule
  ]
})
export class CoreModule { }
