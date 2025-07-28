import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://music.fly.dev';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    const payload = {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }


  registerUser(data: {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    last_name: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {
      user: data
    });
  }


  async saveUser(user: any): Promise<void> {
    await this.storageService.set('user-data', user);
  }

  async getUser(): Promise<any> {
    return await this.storageService.get('user-data');
  }

  async logout(): Promise<void> {
    await this.storageService.remove('user-data');
  }
}

