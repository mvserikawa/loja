import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cesta } from '../model/cesta';
import { Item } from '../model/item';
@Injectable({
  providedIn: 'root'
})
export class CestaService {

  constructor(private http: HttpClient) { }

  gravarPedido(obj: Cesta): Observable<any> {
    return this.http.post("http://localhost:8080/api/cesta", obj);
  }
  gravarItens(obj: Item[]): Observable<any> {
    return this.http.post("http://localhost:8080/api/itensCesta", obj);
  }
}
