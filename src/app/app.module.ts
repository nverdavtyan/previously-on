import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MoviesHomeComponent } from './pages/movies-home/movies-home.component';
import { MovieTileComponent } from './components/movie-tile/movie-tile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MyseriesComponent } from './pages/myseries/myseries.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { UsersComponent } from './pages/users/users.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolBarComponent,
    MoviesHomeComponent,
    MovieTileComponent,
    MovieDetailsComponent,
    GoogleLoginComponent,
    MyseriesComponent,
    EpisodesComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
