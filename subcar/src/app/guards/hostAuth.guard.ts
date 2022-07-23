import { Injectable } from "@angular/core";
import { CanActivate} from "@angular/router";
import { Router } from '@angular/router';
import { HostAuthService } from "../services/host-auth.service";


@Injectable()
export class HostAuthGuard implements CanActivate{

    constructor(private hostAuth:HostAuthService , private router:Router){


    }
 canActivate(){
    if(this.hostAuth.loggedInn())
    {
        return true;
    }
    else
    {
        this.router.navigate(['hostlogin'])
        return false;
        
    }
    }
}

