import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../service/cliente.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [ClienteService],
  imports: [FormsModule, CommonModule,RouterModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) {}


  

  public fazerLogin() {
    this.clienteService.fazerLogin(this.obj).subscribe({
      next: (data: Cliente) => {
        if (data && data.codigo && data.codigo !== 0) {
          this.obj = data;
          localStorage.setItem("cliente", JSON.stringify(this.obj));
          window.location.href = "./cesta"; // Redireciona para a página correta
        } else {
          this.mensagem = "Login ou senha inválidos!!!";
          localStorage.removeItem("cliente");
        }
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        this.mensagem = "Ocorreu um erro. Tente novamente!";
      }
    });
  }

  public novoCadastro(){
    localStorage.setItem("cliente", JSON.stringify(this.obj));
    window.location.href="./cliente";
}
}


