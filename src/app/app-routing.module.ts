import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: ':lang', component: MainComponent },
  { path: '**', redirectTo: `${environment.defaultLocale}`, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
