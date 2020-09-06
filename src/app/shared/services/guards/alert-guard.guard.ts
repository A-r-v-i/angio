import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface canDeactivateComponent {
  canComponentLeave: () => boolean | Promise<boolean> | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class AlertGuardGuard implements CanDeactivate<canDeactivateComponent> {
  canDeactivate(
    component: canDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.canComponentLeave) {
      return component.canComponentLeave()
    }
    return true;
  }

}
