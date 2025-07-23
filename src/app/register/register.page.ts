import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async registerUser() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const registrado = await this.authService.registerUser(formData);

      if (registrado) {
        await this.storageService.set('user-data', formData);
        this.navCtrl.navigateForward('/login');
      } else {
        this.errorMessage = 'No se pudo completar el registro.';
      }
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
