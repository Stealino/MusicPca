import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as dataArtists from './artistas.json';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer: string= "https://music.fly.dev";
  private userId = 1;
  constructor(private http: HttpClient) { }

  getTracks() {
    return fetch(`${this.urlServer}/tracks`).then(
      response => response.json()
    );
  }

  getAlbums() {
    return fetch(`${this.urlServer}/albums`).then(
      response => response.json()
    );
  }

  getLocalArtists() {
    return dataArtists;
  }

  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(
      response => response.json()
    );
  }

  getArtistsFromServer() {
    return fetch(`${this.urlServer}/artists`).then(
      response => response.json()
    );
  }

  getSongsByArtist(artistId: string) {
    return fetch(`${this.urlServer}/tracks/artist/${artistId}`).then(
      response => response.json()
    );
  }

  getUserFavorites(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlServer}/user_favorites/1`); // Usa ID real si hay login
  }

  addFavorite(data: { trackId: string, userId: number }): Observable<any> {
    return this.http.post(`${this.urlServer}/favorite_tracks`, data);
  }

  removeFavorite(songId: string): Observable<any> {
    return this.http.delete(`${this.urlServer}/favorite_tracks/${songId}`);
  }
}
