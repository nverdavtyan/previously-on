import { Component, Inject  } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { GoogleApiService, UserInfo } from 'src/app/services/google-api.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent {

  title = 'angular-google-oauth-example';

  mailSnippets: string[] = []
  userInfo?: UserInfo

  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document) {
  }

  login(): void {
    this.auth.loginWithRedirect();
    
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
