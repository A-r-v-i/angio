import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }
  loggedIn: boolean = false;
  isUser;
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        this.isUser = localStorage.getItem('user');
        if(this.isUser) {
        setTimeout(() => {
          resolve(true)
        }, 400)
      }
    }
    );
    return promise;
  }

  loginWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          console.log(res)
          this.loggedIn = true;
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }


  login() {
    this.loggedIn = true;
    console.log('authentication true')
    return true;
  }

  logout() {
    this.loggedIn = false;
    console.log('authentication false')
  }

}