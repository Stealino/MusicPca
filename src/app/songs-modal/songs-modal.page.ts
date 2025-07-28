import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SongsModalPage implements OnInit {

  @Input() type!: 'album' | 'artist';
  @Input() albumId?: string;
  @Input() artistId?: string;

  songs: any[] = [];
  favoritesMap: { [songId: string]: boolean } = {};

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private musicService: MusicService
  ) {}

  async ngOnInit() {
    
    if (this.type === 'album' && this.albumId) {
      this.songs = await this.musicService.getSongsByAlbum(this.albumId);
    } else if (this.type === 'artist' && this.artistId) {
      this.songs = await this.musicService.getSongsByArtist(this.artistId);
    }

    
    try {
      const favoriteIds = await lastValueFrom(this.musicService.getUserFavorites());
      for (const song of this.songs) {
        this.favoritesMap[song.id] = favoriteIds.includes(song.id);
      }
    } catch (error) {
      console.error('Error al obtener favoritos', error);
    }
  }

  async selectSong(song: any) {
    console.log("Canción seleccionada: ", song);
    await this.modalCtrl.dismiss(song);
  }

  async toggleFavorite(songId: string) {
    const isFav = this.favoritesMap[songId];

    try {
      if (isFav) {
        await lastValueFrom(this.musicService.removeFavorite(songId));
        this.favoritesMap[songId] = false;
      } else {
      
        await lastValueFrom(this.musicService.addFavorite({
          trackId: songId,
          userId: 1  
        }));
        this.favoritesMap[songId] = true;
      }
    } catch (error) {
      console.error('Error al cambiar estado de favorito', error);
    }
  }
}
