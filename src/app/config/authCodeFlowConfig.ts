import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://www.betaseries.com/authorize?client_id=bae9b5613db8',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/login',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'bae9b5613db8',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email voucher',
}