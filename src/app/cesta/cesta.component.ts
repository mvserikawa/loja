import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent {
  public produtos: any[] = [];
  public pedidoFinalizado: boolean = false; // Propriedade para controlar a exibição da mensagem

  constructor() {
    this.loadCesta();
  }

  loadCesta() {
    if (typeof window !== 'undefined') {
      const cesta = localStorage.getItem('cesta');
      if (cesta) {
        this.produtos = JSON.parse(cesta);
      }
    }
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
    // Aqui você pode adicionar lógica de finalização de compra se necessário
    this.pedidoFinalizado = true; // Define que o pedido foi finalizado
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

  get total(): number {
    return this.produtos.reduce((total, produto) => total + produto.valor * produto.quantidade, 0);
  }
}
