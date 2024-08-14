import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null = null;
  private claimNames = {
    id: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
    email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',

    
  };

  constructor(private cookieService: CookieService) {
    this.updateToken();
  }

  updateToken() {
    this.token = this.cookieService.get('login_token');
  }

  getExpiryTime(): number {
    if (!this.token) return 0;
    const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
    return decodedToken.exp;
  }

  getUserIdToActivate(token: string) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken[this.claimNames.id];
  }

  getUserId(): number {
    if (!this.token) return 0;
    const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
    return decodedToken[this.claimNames.id];
  }

  getEmail(): string {
    if (!this.token) return '';
    const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
    return decodedToken[this.claimNames.email];
  }

  isTokenValid(): boolean {
    this.updateToken();
    if (!this.token) return false;
    const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
    const expiryTime = decodedToken.exp;
    var timeNow = Date.now() / 1000;
    return expiryTime > timeNow;
  }
}
