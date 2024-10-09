import { Routes } from '@angular/router';
import { CestaComponent } from './cesta/cesta.component';
import { LoginComponent } from './login/login.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { EsqueciComponent } from './esqueci/esqueci.component';
import { BuscaComponent } from './busca/busca.component';
import { ClienteComponent } from './cliente/cliente.component';

export const routes: Routes = [
    { path: "", component: VitrineComponent },
    { path: "login", component: LoginComponent },
    { path: "vitrine", component: VitrineComponent },
    { path: "cesta", component: CestaComponent },
    { path: "detalhe", component: DetalheComponent },
    { path: "esqueci", component: EsqueciComponent },
    { path: "busca", component: BuscaComponent },
    { path: "cliente", component: ClienteComponent }
];
