import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TokenPayload } from '../../../interfaces/TokenPayload.interface';
import { Router } from '@angular/router';
import { containsTree } from '@angular/router/src/url_tree';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public errorState: Boolean = false;
public errorMessage: String = '';

credentials: TokenPayload = {
    email: '',
    password: ''
};

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  login() {
    this.auth.login(this.credentials).subscribe((message) => {
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      if (err.error.message === 'Missing credentials') {
        this.errorState = true;
        this.errorMessage = 'Wachtwoord of email is niet ingevuld!';
      }
      if (err.error.message === 'Password is wrong') {
        this.errorState = true;
        this.errorMessage = 'Onjuist wachtwoord!';
      }
      if (err.error.message === 'User not found') {
        this.errorState = true;
        this.errorMessage = 'Gebruiker bestaat niet!';
      }
    });
  }
}
