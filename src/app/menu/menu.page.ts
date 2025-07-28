import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonicModule, FormsModule ]
})
export class MenuPage implements OnInit {



  constructor(private storageService: StorageService, private navCtrl: NavController) { }


  ngOnInit() {
  }

  goToIntro() {
    console.log("Ir hacia la intro")
    this.navCtrl.navigateRoot("/intro")
  }

  async logout() {
    await this.storageService.remove('login-exitoso');
    this.navCtrl.navigateRoot('/login');
  }

}
