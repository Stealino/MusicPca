import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';
import { IonicModule, ModalController } from '@ionic/angular'
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule],
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
      description: "La música clásica es un género que ha trascendido generaciones, abarcando composiciones que van desde el Barroco hasta el Romanticismo. Caracterizada por su complejidad y profundidad emocional, ha influido enormemente en el desarrollo de la música occidental. ",
    },
    {
      title: "Vallenato",
      image: "https://media.istockphoto.com/id/1384320464/es/vector/acorde%C3%B3n-aislado-instrumento-musical-tradicional-colombiano-vector.jpg?s=612x612&w=0&k=20&c=7ArqxmE-TIEhJtqSYJ7BtzFTEcsI0xLSFRKlhPz6Ow0=",
      description: "El vallenato es un género musical tradicional del Caribe colombiano, nacido en Valledupar. Se interpreta con acordeón, caja y guacharaca, y sus letras cuentan historias de amor, vida y cultura popular. Tiene cuatro ritmos principales: son, paseo, merengue y puya. ",
    },
    {
      title: "Salsa",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKEia7csA7eN0Ie8H6kuzJipsp89tWBgXgEw&s",
      description: "La salsa es un género musical bailable que fusiona ritmos caribeños como el son cubano, el mambo y la guaracha, con influencias del jazz. Nació en las comunidades latinas de Nueva York en los años 60, especialmente entre músicos puertorriqueños y cubanos. ",
    },
    {
      title: "Merengue",
      image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da841993598010e6c1de9543ffd0",
      description: "El merengue es un género musical y bailable originario de la República Dominicana. Se caracteriza por su ritmo rápido y alegre, acompañado de instrumentos como el acordeón, la tambora y la güira. Surgió en el siglo XIX y con el tiempo se convirtió en símbolo nacional.",
    },
    
  ]

  tracks: any;
  albums: any;
  localArtists: any;
  artists: any;
  song: any = {
    name: '',
    preview_url: '',
    playing: false
  };
  currentSong: any = {};
  newTime: any;
  constructor(private storageService: StorageService, private router: Router, private musicService: MusicService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    this.musicService.getArtistsFromServer().then(artists => this.artists = artists);
    this.loadAlbums();
     this.loadTracks();
    this.getLocalArtists();
    await this.localStorageData();  
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log(this.tracks, "las canciones")
    })
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => {
    this.albums = albums;
      console.log(this.albums, "los albums")
    })

  }

  async cambiarColor() {
    const esOscuro = this.colorActual === this.colorOscuro;
    this.colorActual = esOscuro ? this.colorClaro : this.colorOscuro;

    // Aquí va la corrección:
    if (this.colorActual === this.colorOscuro) {
      this.colorTextoActual = this.colorTextoClaro;
    } else {
      this.colorTextoActual = this.colorTextoOscuro;
    }

    const temaGuardado = this.colorActual === this.colorOscuro ? 'oscuro' : 'claro';
    localStorage.setItem('tema', temaGuardado);
    await this.storageService.set('theme', temaGuardado);

    console.log('Tema Guardado: ', temaGuardado);
  }



  async localStorageData() {
    const savedTheme = await this.storageService.get('theme');

    if (savedTheme === 'oscuro' || savedTheme === 'claro') {
      this.colorActual = savedTheme === 'oscuro' ? this.colorOscuro : this.colorClaro;
      
      
      this.colorTextoActual = savedTheme === 'oscuro' ? this.colorTextoClaro : this.colorTextoOscuro;
    } else {
    
      this.colorActual = this.colorOscuro;
      this.colorTextoActual = this.colorTextoClaro;
    }
  }


  
  inIntro () {
    console.log("Ver Intro");
    this.router.navigateByUrl("/intro")
  }


  getLocalArtists() {
    this.localArtists = this.musicService.getLocalArtists();
    console.log("artistas: ", this.localArtists.artists)
 }

  async showSongs(albumId: string) {
    const songs = await this.musicService.getSongsByAlbum(albumId);
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs
      }
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.song = result.data;
      }
    })
    modal.present();

  }

  async showSongsByArtist(artistId: string) {
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: { artistId: artistId, type: 'artist' }
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.song = result.data;
      }
    })
    await modal.present();
  }


  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    });
    this.song.playing = true;
  }



  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }


  formatTime(seconds: number) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getRemainingTime() {
    if (!this.currentSong?.duration || !this.currentSong?.currentTime) {
      return 0;
    }
    return this.currentSong.duration - this.currentSong.currentTime;
  }

}
