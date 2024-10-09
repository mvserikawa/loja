import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent {
  public lista: Produto[] = [
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

  public sugestoes: Produto[] = []; // Assegure-se que isso seja do tipo Produto


  constructor(private router: Router) {}

  public verDetalhe(item: Produto) {
    // Armazena o item selecionado em localStorage para visualização de detalhes
    localStorage.setItem("produto", JSON.stringify(item));
    this.router.navigate(['/detalhe']); // Navega para a página de detalhes
  }

  public comprar(item: Produto) {
    // Método para adicionar o produto à cesta
    const cesta: { codigo: number; produto: Produto; quantidade: number; valor: number; }[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    const index = cesta.findIndex(i => i.produto.codigo === item.codigo);

    if (index !== -1) {
      // Se o item já existe na cesta, incrementa a quantidade
      cesta[index].quantidade++;
    } else {
      // Caso contrário, adiciona um novo item à cesta
      cesta.push({ codigo: item.codigo, produto: item, quantidade: 1, valor: item.preco });
    }

    localStorage.setItem('cesta', JSON.stringify(cesta)); // Atualiza o localStorage com a nova cesta
    this.router.navigate(['/cesta']); // Navega para a página da cesta
  
    
  
  }
}
