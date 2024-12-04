import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private http: HttpClient) { }

  gravar(obj:Produto):Observable<any>{
    return this.http.post("http://localhost:8080/api/produto", obj);
  }
  alterar(obj:Produto):Observable<any>{
    return this.http.put("http://localhost:8080/api/produto", obj);
  }
  apagar(codigo:number):Observable<any>{
    return this.http.delete("http://localhost:8080/api/produto/"+codigo);
  }
  carregar(codigo:number):Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/"+codigo);
  }
  vitrine():Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/vitrine");
  }
  buscar(termo:string):Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/busca/"+termo);
  }

}
