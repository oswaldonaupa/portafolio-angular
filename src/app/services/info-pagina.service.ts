import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { EquipoPagina } from '../interfaces/equipo-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info:InfoPagina = {};
  cargada = false;

  equipo:any [] = [];

  constructor( private http: HttpClient) {

    //iniciar los metodos
    this.cargarInfo();
    this.cargarEquipo();

   }

   private cargarInfo(){
    //leer el archivo json
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        //console.log(resp);
        //console.log(resp['email']);
      });
   }

   private cargarEquipo(){
     //leer el archivo json
    this.http.get('https://angular-html-aa14f.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) => {
 
      this.equipo = resp;
      //console.log(resp);
      //console.log(resp['email']);
    });
   }


}
