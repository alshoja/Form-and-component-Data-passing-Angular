import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: 'home', component:HomeComponent},
  {
    path: 'post',
    loadChildren: () =>
      import('./post/post.module').then((m) => m.PostModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component:ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
