import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, GuardResult, UrlTree, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const introVisto = await this.storageService.get('intro-visto');
    const loginExitoso = await this.storageService.get('login-exitoso');

    if (!introVisto) {
      this.router.navigateByUrl('/intro');
      return false;
    }

    if (!loginExitoso) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
