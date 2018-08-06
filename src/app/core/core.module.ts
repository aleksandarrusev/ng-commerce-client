import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        NotFoundComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ]
})
export class CoreModule {
}
