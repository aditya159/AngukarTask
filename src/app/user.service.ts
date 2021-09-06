import {Injectable}from '@angular/core';
import {ApiService} from '../app/api.service';
@Injectable({
    providedIn:'root'
})

export class UserService {


    constructor(
        private _ApiService:ApiService
        ){
    }

    login(body:any){
        return this._ApiService.postRequest<any>('auth/login',body);
    }

    register(body:any){
        return this._ApiService.postRequest<any>('auth/register',body);
    }
}