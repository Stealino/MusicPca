import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage implements OnInit {
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;
  colorTextoClaro = 'var(--texto-claro)';
  colorTextoOscuro = 'var(--texto-oscuro)';
  colorTextoActual = this.colorTextoOscuro;


  
  genres = [
    {
      title: "Musica Clasica",
      image: "https://musicaclasica.com.ar/wp-content/uploads/92213804_212123373455654_8855503586826649600_n.jpg",
      description: "La música clásica es un género que ha trascendido generaciones, abarcando composiciones que van desde el Barroco hasta el Romanticismo. Caracterizada por su complejidad y profundidad emocional, ha influido enormemente en el desarrollo de la música occidental. Obras de compositores como Bach, Mozart y Beethoven siguen siendo esenciales para comprender la evolución musical y el poder del sonido en la expresión humana.",
    },
    {
      title: "Vallenato",
      image: "https://media.istockphoto.com/id/1384320464/es/vector/acorde%C3%B3n-aislado-instrumento-musical-tradicional-colombiano-vector.jpg?s=612x612&w=0&k=20&c=7ArqxmE-TIEhJtqSYJ7BtzFTEcsI0xLSFRKlhPz6Ow0=",
      description: "El vallenato es un género musical tradicional del Caribe colombiano, nacido en Valledupar. Se interpreta con acordeón, caja y guacharaca, y sus letras cuentan historias de amor, vida y cultura popular. Tiene cuatro ritmos principales: son, paseo, merengue y puya. Es un símbolo cultural de Colombia y fue declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2015.",
    },
    {
      title: "Salsa",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKEia7csA7eN0Ie8H6kuzJipsp89tWBgXgEw&s",
      description: "La salsa es un género musical bailable que fusiona ritmos caribeños como el son cubano, el mambo y la guaracha, con influencias del jazz. Nació en las comunidades latinas de Nueva York en los años 60, especialmente entre músicos puertorriqueños y cubanos. Sus letras hablan de amor, desamor, vida urbana y lucha social. Es un ritmo enérgico y alegre, y artistas como Celia Cruz, Héctor Lavoe y Rubén Blades la llevaron a la fama mundial.",
    },
    {
      title: "Merengue",
      image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da841993598010e6c1de9543ffd0",
      description: "El merengue es un género musical y bailable originario de la República Dominicana. Se caracteriza por su ritmo rápido y alegre, acompañado de instrumentos como el acordeón, la tambora y la güira. Surgió en el siglo XIX y con el tiempo se convirtió en símbolo nacional. Sus letras abordan temas cotidianos, amorosos y festivos. Artistas como Juan Luis Guerra y Wilfrido Vargas han llevado el merengue a escenarios internacionales.",
    },
    
  ]
  constructor(private storageService: StorageService, private router: Router) {}

  async ngOnInit() {
    await this.localStorageData();
    
  }

  async cambiarColor() {
    const esOscuro = this.colorActual === this.colorOscuro;
    this.colorActual = esOscuro ? this.colorClaro : this.colorOscuro;
    this.colorTextoActual = esOscuro ? this.colorTextoOscuro : this.colorTextoClaro;

    localStorage.setItem('tema', this.colorActual === this.colorOscuro ? 'oscuro' : 'claro');

    await this.storageService.set('theme',this.colorActual)
    console.log('Tema Guardado: ', this.colorActual)
  
  }


  async localStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }
  
  inIntro () {
    console.log("Ver Intro");
    this.router.navigateByUrl("/intro")
  }
}
