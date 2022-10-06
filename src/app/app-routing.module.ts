import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesHomeComponent } from './pages/movies-home/movies-home.component';
import { LoginComponent } from './pages/login/login.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { MyseriesComponent } from './pages/myseries/myseries.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { UsersComponent } from './pages/users/users.component';

const config = {
  domain: 'https://www.betaseries.com',
  clientId: 'bae9b5613db8',
  redirectUri: window.location.origin + '/login',
  httpInterceptor: {
    allowedList: ['/api/*']
  },
};
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UsersComponent},
  { path: '', component: MoviesHomeComponent },
  { path: 'mes-series', component: MyseriesComponent },
  { path: 'serie/:id', component: MovieDetailsComponent },
  { path: 'episode/:id/:season/:ep', component: EpisodesComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule.forRoot(config)],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
