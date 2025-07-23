import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService) {}

  async loginUser(credentials: any): Promise<boolean> {
    const storedUser = await this.storageService.get('user-data');

    if (!storedUser) return false;

    const sameEmail = storedUser.email === credentials.email;
    const samePassword = storedUser.password === credentials.password;

    return sameEmail && samePassword;
  }

  async registerUser(data: any): Promise<boolean> {
    try {
      await this.storageService.set('user-data', data);
      return true;
    } catch (e) {
      return false;
    }
  }
}
