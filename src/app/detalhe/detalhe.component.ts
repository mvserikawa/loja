import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Router } from '@angular/router';  // Importar Router


@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']  // Correção aqui
})
export class DetalheComponent {
  public mensagem: string = "";
  public item: Produto = new Produto();
  
// Definição do array de uvas dentro da classe
uvas: { codigo: number, descricao: string }[] = [
  { codigo: 1, descricao: "Originária da região de Bordeaux, na França, a Cabernet Sauvignon é conhecida por seu sabor encorpado e taninos robustos. Vinhos desta uva apresentam notas de cassis, cedro e especiarias, tornando-a uma escolha clássica para quem aprecia profundidade e complexidade." },
  { codigo: 2, descricao: "A Merlot também vem de Bordeaux e é famosa por sua suavidade e perfil frutado. Com sabores de ameixa, cereja e chocolate, os vinhos feitos com esta uva oferecem uma experiência de degustação mais acessível, perfeita para iniciantes e apreciadores." },
  { codigo: 3, descricao: "Originária da França, mas agora sinônimo de vinhos argentinos, a Malbec é conhecida por seus taninos suaves e notas de frutas escuras, como ameixa e amoras. Seu corpo médio a encorpado, junto com um toque de especiarias, a torna ideal para acompanhar carnes grelhadas." },
  { codigo: 4, descricao: "A Chardonnay é uma das uvas brancas mais populares do mundo, originária da Borgonha, na França. Com sabores que variam de maçã verde a pêssego e uma característica amanteigada quando fermentada em carvalho, essa uva é versátil e se adapta bem a diferentes estilos de vinificação." },
  { codigo: 5, descricao: "Com origens em Bordeaux, a Sauvignon Blanc é conhecida por seu frescor e acidez vibrante. Os vinhos desta uva costumam apresentar notas de frutas cítricas, maracujá e ervas, tornando-a uma excelente escolha para acompanhar frutos do mar e pratos leves." },
  { codigo: 6, descricao: "Originária do vale do Rhône, na França, a Syrah (ou Shiraz, na Austrália) é uma uva poderosa que produz vinhos intensos com aromas de frutas escuras, pimenta preta e, às vezes, notas florais. É perfeita para quem busca complexidade e riqueza em cada gole." },
  { codigo: 7, descricao: "Com origens na Alemanha, a Riesling é uma uva versátil que pode produzir vinhos secos, semi-doces ou doces. Conhecida por sua acidez elevada e aromas de flores brancas, pêssego e mel, essa uva é ideal para harmonizações com pratos" },
  { codigo: 8, descricao: "Originária da Espanha, o Tempranillo é a uva emblemática dos vinhos de Rioja. Conhecida por seus aromas de frutas vermelhas e especiarias, com notas de tabaco e couro, essa uva produz vinhos complexos que são ótimos para envelhecer." },
  { codigo: 9, descricao: "A Pinot Noir é uma das uvas mais desafiadoras de cultivar, mas quando bem feita, produz vinhos elegantes e complexos. Originária da Borgonha, essa uva tem notas de cereja, framboesa e, frequentemente, um toque terroso, tornando-a um favorito entre os amantes de vinho." },
  { codigo: 10, descricao: "Originária do sudoeste da França e agora popular no Uruguai, a Tannat é conhecida por seus taninos robustos e intensidade. Com sabores de frutas escuras, especiarias e um toque de couro, essa uva é ideal para acompanhar carnes ricas." },
  { codigo: 11, descricao: "A uva principal dos vinhos Chianti, o Sangiovese é originário da Itália. Conhecida por sua acidez alta e taninos médios, seus vinhos apresentam notas de cereja, ervas e um leve toque de especiarias, tornando-a uma ótima opção para pratos italianos." },
  { codigo: 12, descricao: "Originária da Califórnia, a Zinfandel é uma uva versátil que pode produzir vinhos tintos encorpados ou rosés refrescantes. Com notas de frutas vermelhas maduras, especiarias e um leve toque de pimenta, é perfeita para churrascos e pratos rústicos." },
  { codigo: 13, descricao: "Com origens no sul da França, a Grenache é conhecida por seu caráter frutado e suave. Com sabores de morango, framboesa e especiarias, essa uva é frequentemente usada em blends, mas também brilha em vinhos varietais, especialmente na região do Rhône." },
  { codigo: 14, descricao: "Originária do Vale do Loire, na França, a Chenin Blanc é uma uva versátil que pode produzir vinhos secos, doces ou espumantes. Com notas de maçã, mel e florais, é perfeita para uma variedade de harmonizações gastronômicas." },
  { codigo: 15, descricao: "Originária do Rhône, a Viognier é uma uva branca que produz vinhos aromáticos com notas de pêssego, flores brancas e especiarias. É ideal para quem aprecia vinhos com corpo e complexidade, frequentemente acompanhando pratos de peixe ou frango." },
  { codigo: 16, descricao: "A Moscato, originária da Itália, é conhecida por seu perfil doce e aromático. Com notas de pêssego, damasco e florais, essa uva é perfeita para aqueles que apreciam vinhos leves e refrescantes, ideais para sobremesas ou como aperitivo." },
];

  constructor(private router: Router) {
    let json = localStorage.getItem("produto");
    if (json != null) {
      this.item = JSON.parse(json);
    } else {
      this.mensagem = "Produto não encontrado!";
    }
  }

  getUvaDetails(codigo: number) {
    return this.uvas.find(uva => uva.codigo === codigo);
  }

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