import { Produto } from "./produto";

export class Item {
    public codigo: number = 0;
    public produto: Produto = new Produto();
    public quantidade: number = 0;
    public valor: number = 0;
    public codigoCesta: number = 0;
    public codigoProduto:number = 0;
}
