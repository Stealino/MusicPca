import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validator, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  errorMessage: string = ""

  validation_messages = {
    email: [
      {
        type: "required", message: "El email es obligatorio"
      },
      {
        type: "email", message: "Email Invalido"
      }
    ],

    password: [
      {
        type: "required", message: "Escribir Contraseña"
      },
      {
        type: "minlength", message: "La contraseña es demasiado corta"
      }
    ]
  }

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private navCtrl: NavController, private storageService: StorageService) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      
    )
    })
   }

  ngOnInit() {
  }


  loginUser() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Completa todos los campos correctamente.";
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.loginUser(credentials).subscribe({
      next: async (response) => {
        if (response.status === 'OK') {
          await this.authService.saveUser(response.user);
          await this.storageService.set('login-exitoso', true);
          this.errorMessage = '';
          this.navCtrl.navigateForward('/menu/home');
        } else {
          this.errorMessage = 'Credenciales incorrectas.';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al conectar con el servidor.';
      }
    });
  }


  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

}
