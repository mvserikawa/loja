import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CestaService } from '../service/cesta.service';
import { Cesta } from '../model/cesta';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  providers: [CestaService],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent {
  public produtos: any[] = [];
  public pedidoFinalizado: boolean = false; // Propriedade para controlar a exibição da mensagem
  mensagem: string = "";
  cesta: Cesta = new Cesta();

  constructor(private cestaService: CestaService){
    let json = localStorage.getItem("cesta");
    if(json!=null){
      this.cesta = JSON.parse(json);
      this.mensagem = "";
    } else {
      this.mensagem = "A cesta esta vazia!"
    }
 }
 ngOnInit() {
  // Verifica se o cliente está logado
  const cliente = localStorage.getItem("cliente");
  if (!cliente) {
    // Caso não esteja logado, redireciona para a página de login
    window.location.href = "/login";
  } else {
    // Se o cliente estiver logado, carrega a cesta
    this.loadCesta();
  }
}
public loadCesta() {
  const cesta = localStorage.getItem('cesta');
  if (cesta) {
    this.produtos = JSON.parse(cesta);
  } else {
    this.mensagem = "A cesta está vazia!";
  }
}
gravarPedido() {
  let jsonCliente = localStorage.getItem("cliente");
  if (jsonCliente != null) {
    this.cesta.cliente = JSON.parse(jsonCliente);
    this.cesta.total = this.total;

    // Envia a cesta para o backend para ser gravada
    this.cestaService.gravarPedido(this.cesta).subscribe({
      next: (data) => {
        // Exibe a resposta após o pedido ser gravado
        let novoPedido = data; // O backend retorna o pedido gravado
        this.gravarItens(novoPedido); // Chama a função para gravar os itens
      },
      error: (err) => {
        console.error('Erro ao gravar pedido:', err);
        this.mensagem = "Ocorreu um erro, tente mais tarde!";
      }
    });
  } else {
    this.mensagem = "Faça o login para gravar o pedido!";
  }
}

 public gravarItens(novoPedido: Cesta){
    for(let obj of this.cesta.itens){
        obj.codigoCesta = novoPedido.codigo
    }
    this.cestaService.gravarItens(this.cesta.itens).subscribe({
      next:(data)=>{
        this.mensagem="Pedido "+ novoPedido.codigo + " gravado com sucesso!!!";
        this.limpar();
      },
      error:(err)=>{
        console.error('Erro ao salvar:', err);
        this.mensagem = "Ocorreu um erro tente mais tarde!";}
  });
 }
  public removeProduto(codigo: number) {
    this.produtos = this.produtos.filter(produto => produto.codigo !== codigo);
    localStorage.setItem('cesta', JSON.stringify(this.produtos));
  }

  public limparCesta() {
    this.produtos = [];
    localStorage.removeItem('cesta');
    this.pedidoFinalizado = false; // Reseta o status da finalização do pedido ao limpar a cesta
  }

  public finalizarCompra() {
    // Verifica se a cesta não está vazia antes de finalizar
    if (this.produtos.length > 0) {
      this.pedidoFinalizado = true; // Define que o pedido foi finalizado
      console.log("Finalizando pedido com a cesta:", this.cesta);
      this.gravarPedido(); // Chama a função para gravar o pedido no banco de dados
    } else {
      this.mensagem = "Sua cesta está vazia! Não é possível finalizar a compra.";
    }
  }

  public aumentarQuantidade(produto: any) {
    produto.quantidade++;
    localStorage.setItem('cesta', JSON.stringify(this.produtos));
  }

  public diminuirQuantidade(produto: any) {
    if (produto.quantidade > 1) {
      produto.quantidade--;
    } else {
      this.removeProduto(produto.codigo); // Remove o produto se a quantidade for zero
    }
    localStorage.setItem('cesta', JSON.stringify(this.produtos));
  }

  public limpar(){
    this.cesta = new Cesta();
    localStorage.removeItem("cesta");
 }

  get total(): number {
    return this.produtos.reduce((total, produto) => total + produto.valor * produto.quantidade, 0);
  }
}
