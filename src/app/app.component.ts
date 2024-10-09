import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pesquisa: string = '';

  constructor(private router: Router) {}

  realizarBusca() {
    // Verifica se a pesquisa tem 3 ou mais caracteres
    if (this.pesquisa.length >= 3) {
      // Redireciona para a página de busca
      this.router.navigate(['/busca'], { queryParams: { q: this.pesquisa } });
    } else {
      alert('Por favor, digite pelo menos 3 caracteres para buscar.');
    }
  }
}