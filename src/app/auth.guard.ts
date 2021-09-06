import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _Router:Router
  ){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      debugger
      var token=localStorage.getItem('token');
      const decodedToken: any = jwtDecode(token);
      if (token && decodedToken.id) {
          return Promise.resolve(true);
      }
      this._Router.navigate(['/403']);
      return Promise.resolve(false);
  }
  
}
