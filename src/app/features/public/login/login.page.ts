import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private readonly navController: NavController) {}

  ngOnInit() {}

  login() {
    this.navController.navigateForward('/private/dashboard');
  }
}
