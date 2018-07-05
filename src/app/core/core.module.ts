import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {CoreRoutingModule} from './core-routing.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CoreRoutingModule
  ]
})
export class CoreModule { }
