import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { SwitcherComponent } from './components/header/switcher/switcher.component';
import { RoundPipe } from './@pipes/round.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './@shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    LogoComponent,
    SwitcherComponent,
    RoundPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
