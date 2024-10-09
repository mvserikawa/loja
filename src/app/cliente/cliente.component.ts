import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'] // Corrigido para 'styleUrls'
})
export class ClienteComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  public gravar() {
    // Validação simples para verificar se todos os campos obrigatórios estão preenchidos
    if (!this.obj.nome || !this.obj.email || !this.obj.documento) {
      this.mensagem = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    // Armazenar os dados no localStorage
    localStorage.setItem("cliente", JSON.stringify(this.obj));
    
    // Atualizar a mensagem para "Cadastro Finalizado"
    this.mensagem = "Cadastro Finalizado!";
    
    // Aqui você pode adicionar mais lógica se precisar, como redirecionar o usuário
    // window.location.href = "./alguma-pagina"; // Exemplo de redirecionamento
  }

  public carregar() {
    let json = localStorage.getItem("cliente");
    if (json == null) {
      window.location.href = "./login"; // Redireciona para login se não houver cliente
    } else {
      this.obj = JSON.parse(json); // Carrega os dados do cliente
    }
  }

  constructor() {
    this.carregar();
  }
}
