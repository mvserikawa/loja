import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,HttpClientModule],
  providers: [ClienteService],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregar(); // Carregar dados do cliente ao inicializar o componente
  }

  public gravar() {
    // Validação simples para verificar se todos os campos obrigatórios estão preenchidos
    if (!this.obj.nome || !this.obj.email || !this.obj.documento) {
      this.mensagem = "Por favor, preencha todos os campos obrigatórios.";
      return;
    }

    // Chamar o serviço para salvar os dados no back-end
    this.clienteService.gravar(this.obj).subscribe({
      next:(data)=>{
        this.mensagem = "cadastro criado com sucesso!";
        this.limpar();
      },
      error:(err)=>{
        console.error('Erro ao salvar:', err);
        this.mensagem = "Ocorreu um erro tente mais tarde!";}
  });
  }

  public carregar(){
    if (!this.obj.codigo) {
      this.mensagem = "Código do cliente não informado.";
      this.limpar();
      return;
    }
    
    this.clienteService.carregar(this.obj.codigo).subscribe({
      next : (data) => {
        if(data==null){
          this.mensagem = "cadastro não encontrado, verifique!"
          this.limpar();
        } else {
          this.obj = data;
          this.mensagem = "";
        }
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
        this.mensagem = "Ocorreu um erro tente mais tarde!";
        this.limpar();
      }
  });

  }

  
  public limpar(){
    this.obj = new Cliente();
  }
}


/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
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
}*/
