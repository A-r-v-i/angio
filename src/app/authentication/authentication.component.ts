import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth-service';
import { Router, ActivatedRoute, CanDeactivate } from '@angular/router';
import { canDeactivateComponent } from '../shared/services/guards/alert-guard.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, canDeactivateComponent {

  url: string;
  text: string;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  currentTime = new Date();
  expiryDate;

  async authenticateUser() {
    await this.authService.login();
    await this.router.navigate([this.route.snapshot.queryParams['redirectUrl']])
  }

  async loginWithFacebook() {
    await this.authService.loginWithFacebook()
      .then(res => {
        console.log(res.user.providerData, res.credential.accessToken)
        this.expiryDate = this.currentTime.setHours(this.currentTime.getHours() + 24);
        let secureUser = {
          user: res.user.providerData[0],
          accessToken: res.credential.accessToken,
          expiryTime: this.expiryDate
        }
        localStorage.setItem('user', JSON.stringify(secureUser))
      })
  }

  canComponentLeave(): boolean | Promise<boolean> | Observable<boolean> {
    if (this.text !== "") {
      return window.confirm('Unsaved changes here, Save before you leave.')
    }
    return true;
  }

}
