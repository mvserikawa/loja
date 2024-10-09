import { Cliente } from "./cliente";
import { Item } from "./item";

export class Carrinho {
    public codigo: number=0;
    public cliente: Cliente = new Cliente ();
    public itens: Item[] = [];
}
