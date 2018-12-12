import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TokenPayload } from '../../../interfaces/TokenPayload.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      console.error(err);
    });
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
