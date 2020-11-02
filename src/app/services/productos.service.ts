import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;

  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise ((resolve, reject)=>{
      this.http.get('https://angular-html-aa14f.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[])=>{
          //console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve();
          /*setTimeout(()=>{
            this.cargando = false;
          },2000)*/
        });
    });
    
  }

  getProducto( id: string){

    return this.http.get(`https://angular-html-aa14f.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto(termino: string){


    if(this.productosFiltrado.length === 0){
      //car productos
      this.cargarProductos().then(()=>{
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      })
    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos (termino: string){
    //console.log(this.productos);
    this.productosFiltrado =[];

    //case sensitive
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod=> {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >=0 || tituloLower.indexOf(termino)>=0){
        this.productosFiltrado.push(prod);
      }
    })

  }


}
