import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angio';
  loadedFeature = 'recipe';
  loggedInUser;
  expiryDate;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    let date = new Date();
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.expiryDate = new Date(this.loggedInUser.expiryTime);
    console.log(this.expiryDate)
    if (this.loggedInUser && this.loggedInUser.expiryTime > date) {
      this.authService.loggedIn = true
    } else {
      localStorage.clear()
      this.authService.loggedIn = false
    }
    // if (this.loggedInUser) {
    //   this.authService.loggedIn = true
    // }
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

}
