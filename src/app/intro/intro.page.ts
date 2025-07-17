import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class IntroPage implements OnInit {
  colorClaro = 'var(--color-claro)';
  colorActual = this.colorClaro;
  colorTextoClaro = 'var(--texto-claro)';
  colorTextoActual = this.colorTextoClaro;

  introitems = [
    {
      title: "Bienvenido",
      image: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
      description: "¡Bienvenido a nuestra app musical! Prepárate para explorar distintos géneros, conocer su historia y disfrutar del ritmo que mueve al mundo.",
    },
    {
      title: "Aprende sobre música",
      image: "https://dbdzm869oupei.cloudfront.net/img/sticker/preview/43745.png",
      description: "Descubre los orígenes y características de géneros como la salsa, el merengue, el vallenato y más. La música también educa.",
    },
    {
      title: "Explora e interactúa",
      image: "https://cdn-icons-png.flaticon.com/512/3997/3997604.png",
      description: "Desliza para explorar estilos musicales, accede a contenido visual y aprende jugando. Todo desde una sola app.",
    },
    {
      title: "¡Comienza tu viaje!",
      image: "https://cdn-icons-png.flaticon.com/512/3596/3596150.png",
      description: "Ya estás listo para comenzar. Presiona el botón para acceder a todo el contenido.",
      showButton: true 
    },
  ]

  constructor(private router: Router, private storageService: StorageService) {}


  ngOnInit() {
  }

  async goBack() {
    await this.storageService.set('intro-visto', true);
    this.router.navigateByUrl('/home');
  }

}



