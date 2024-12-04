import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-esqueci',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './esqueci.component.html',
  styleUrl: './esqueci.component.css'
})
export class EsqueciComponent {
  public mensagem: String = "";
  public obj : Cliente = new Cliente();

  public reenviar(){
    this.mensagem="As instruções foram enviadas para o e-mail. Confira sua caixa de entrada."
    + this.obj.email;
  }
}
