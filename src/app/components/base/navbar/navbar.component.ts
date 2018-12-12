import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserDetails } from '../../../interfaces/UserDetails.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private AppName: String = 'Order App';
  private details: UserDetails;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.loggedIn().subscribe(user => {
          this.details = user;
        }, (err) => {
          console.error(err);
    });
  }

}
