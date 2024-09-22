import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';



@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage {
  public correo = '';
  public contrasena = '';
  usuarios = [
    {
      correo: 'atorres@duocuc.cl',
      contrasena: '1234',
      nombre: 'Ana',
      apellido: 'Torres',
      preguntaSecreta: '¿Prefieres perros o gatos?',
      respuestaCorrecta: 'perros',
      respuestaIncorrecta: 'gatos'
    },

    {
      correo: 'dami@duocuc.cl',
      contrasena: '1234',
      nombre: 'Damian',
      apellido: 'Ramos',
      preguntaSecreta: '¿Auto favorito?',
      respuestaCorrecta: 'Ferrari',
      respuestaIncorrecta: 'perro'
    }



  ];

  constructor (private router: Router, private toastController: ToastController) {}

  async iniciarSesion() {
    const usuarioEncontrado = this.usuarios.find(
      (usuario) => usuario.correo === this.correo && 
      usuario.contrasena === this.contrasena);

    if (usuarioEncontrado) {
      this.router.navigate (['/inicio'], {
        state: {nombreUsuario: usuarioEncontrado.nombre},
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Credenciales de inicio de sesión incorrectas',
        duration: 2000,
        position: 'middle',
        color: 'danger',
      });

      toast.present();
    
    }
  }

  async recuperarContrasena() {
    const usuarioEncontrado = this.usuarios.find(
      (usuario) => usuario.correo === this.correo
    );
    
    if (usuarioEncontrado) {
      // Redirigir a la página de pregunta-secreta con el objeto usuario y pregunta secreta como parámetros en el estado
      this.router.navigate(['/pregunta-secreta'],{
        state: {usuario: usuarioEncontrado}
      });
    } else {
      // Correo no encontrado, mostrar mensaje de error
      this.router.navigate(['/contrasenia-incorrecta']);
    }

  }

  async mostrarToast (mensaje: string) {
    const toast = await this.toastController.create ({
      message: mensaje,
      duration: 2000,
      position: 'middle',
    });

    toast.present();

  }

}
