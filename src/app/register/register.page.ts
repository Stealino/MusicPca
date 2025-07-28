import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],          // <- name (antes "nombre")
      last_name: ['', Validators.required],     // <- last_name (antes "apellido")
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  // Validador para confirmar la contraseña
  private passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  async registerUser() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Completa el formulario correctamente.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const data = this.registerForm.value;

    this.authService.registerUser(data).subscribe({
      next: async (res: any) => {
        this.loading = false;
        if (res.status === 'OK') {
          const toast = await this.toastCtrl.create({
            message: 'Usuario creado correctamente',
            duration: 2000,
            color: 'success'
          });
          await toast.present();

          // opcional: guarda algo mínimo local si quieres
          // await this.authService.saveUser({ email: data.email, name: data.name, last_name: data.last_name });

          this.navCtrl.navigateForward('/login');
        } else {
          this.errorMessage = res.msg || 'No se pudo completar el registro.';
        }
      },
      error: async (err) => {
        this.loading = false;
        console.error(err);
        const toast = await this.toastCtrl.create({
          message: 'Error al registrar. Intenta nuevamente.',
          duration: 2500,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}

