import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {
  public item: Produto = new Produto();
  
  public itens: Produto[] = [
    {codigo: 1, nome: 'Cabernet Sauvignon Mendoza', descritivo: '750 ml', tipo: 'Tinto', origem: 'Argentina', preco: 89.99, imagem: 'assets/1.png', quantidade: 30},
    {codigo: 2, nome: 'Cabernet Sauvignon Valle Central', descritivo: '750 ml', tipo: 'Tinto', origem: 'Chile', preco: 82.99, imagem: 'assets/2.png', quantidade: 25},
    {codigo: 3, nome: 'Merlot Mendoza', descritivo: '750 ml', tipo: 'Tinto', origem: 'Argentina', preco: 72.99, imagem: 'assets/3.png', quantidade: 28},
    {codigo: 4, nome: 'Merlot Valle Central', descritivo: '750 ml', tipo: 'Tinto', origem: 'Chile', preco: 76.99, imagem: 'assets/4.png', quantidade: 22},
    {codigo: 5, nome: 'Malbec Mendoza', descritivo: '750 ml', tipo: 'Tinto', origem: 'Argentina', preco: 84.99, imagem: 'assets/5.png', quantidade: 32},
    {codigo: 6, nome: 'Malbec Valle Central', descritivo: '750 ml', tipo: 'Tinto', origem: 'Chile', preco: 90.99, imagem: 'assets/6.png', quantidade: 27},
    {codigo: 7, nome: 'Chardonnay Bourgogne', descritivo: '750 ml', tipo: 'Branco', origem: 'França', preco: 115.99, imagem: 'assets/7.png', quantidade: 20},
    {codigo: 8, nome: 'Chardonnay Veneto', descritivo: '750 ml', tipo: 'Branco', origem: 'Itália', preco: 96.99, imagem: 'assets/8.png', quantidade: 23},
    {codigo: 9, nome: 'Sauvignon Blanc Marlborough', descritivo: '750 ml', tipo: 'Branco', origem: 'Nova Zelândia', preco: 89.99, imagem: 'assets/9.png', quantidade: 25},
    {codigo: 10, nome: 'Sauvignon Blanc Stellenbosch', descritivo: '750 ml', tipo: 'Branco', origem: 'África do Sul', preco: 80.99, imagem: 'assets/10.png', quantidade: 18},
    {codigo: 11, nome: 'Syrah/Shiraz Barossa Valley', descritivo: '750 ml', tipo: 'Tinto', origem: 'Austrália', preco: 109.99, imagem: 'assets/11.png', quantidade: 30},
    {codigo: 12, nome: 'Prosecco Veneto', descritivo: '750 ml', tipo: 'Espumante', origem: 'Itália', preco: 102.99, imagem: 'assets/12.png', quantidade: 22},
    {codigo: 13, nome: 'Pinot Noir Bourgogne', descritivo: '750 ml', tipo: 'Tinto', origem: 'França', preco: 125.99, imagem: 'assets/13.png', quantidade: 28},
    {codigo: 14, nome: 'Riesling Mosel', descritivo: '750 ml', tipo: 'Branco', origem: 'Alemanha', preco: 94.99, imagem: 'assets/14.png', quantidade: 19},
    {codigo: 15, nome: 'Tempranillo Rioja', descritivo: '750 ml', tipo: 'Tinto', origem: 'Espanha', preco: 104.99, imagem: 'assets/15.png', quantidade: 26},
    {codigo: 16, nome: 'Tannat Uruguai', descritivo: '750 ml', tipo: 'Tinto', origem: 'Uruguai', preco: 98.99, imagem: 'assets/16.png', quantidade: 20}
  ];
  public get listaFiltrada(): Produto[] {
    if (!this.filtro) {
      return this.lista;
    }
    return this.lista.filter(item => 
      item.descritivo.toLowerCase().includes(this.filtro.toLowerCase()) ||
      item.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  public verDetalhe(item: Produto) {
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhe";  
  }

  public adicionarItem(obj: Produto) {
    let json = localStorage.getItem("cesta");
    let jsonCliente = localStorage.getItem("cliente");
    let cesta: Cesta = new Cesta();
    let item: Item = new Item();

    if (json == null) { // CESTA NÃO EXISTE     
      item.codigo = obj.codigo;
      item.produto = obj;
      item.quantidade = 1;
      item.valor = obj.preco;          
      cesta.codigo = 1;
      cesta.total = obj.preco;
      cesta.itens.push(item);          
      if (jsonCliente != null) cesta.cliente = JSON.parse(jsonCliente);          
    } else {  // CESTA EXISTE
      let achou = false;
      cesta = JSON.parse(json);
      for (let i = 0; i < cesta.itens.length; i++) {
        if (cesta.itens[i].codigo == obj.codigo) {  // ITEM JÁ EXISTE
          cesta.itens[i].quantidade += 1;
          cesta.itens[i].valor = cesta.itens[i].quantidade * cesta.itens[i].produto.preco;
          achou = true;
          break;
        }            
      }
      if (!achou) {  // ITEM NÃO EXISTE
        item.codigo = obj.codigo;
        item.produto = obj;
        item.quantidade = 1;
        item.valor = obj.preco;    
        cesta.itens.push(item);      
      }
    }

    cesta.total = cesta.itens.reduce((total, i) => total + i.valor, 0); // ATUALIZA O VALOR TOTAL DA CESTA

    localStorage.setItem("cesta", JSON.stringify(cesta));
    window.location.href = "./cesta";
  }
}
