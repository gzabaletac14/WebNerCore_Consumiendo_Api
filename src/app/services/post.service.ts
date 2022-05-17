import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { ApiResponsemodel } from '../models/apiResponsemodel'
import { Postmodel } from '../models/postmodel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  //variable de URL API
  private apiUrl: string;
 
  //instanciamos(inicializamos) el httpclient
  constructor(private http : HttpClient){
    this.apiUrl = environment.apiUrl;
  }

//metodos para llamar a las apis

//listar todos las postulaciones
  getallpost(){
    //hacermos la peticion, debemos importar httpclient y se debe importar en app.module global
    const url = `${this.apiUrl}api/Post/GetPosts`;
     return this.http.get<ApiResponsemodel>(url);
  }

  //guardar una nueva postulacion
  addpost(parametros: object): Observable<any>{
     const body = parametros;
    const url = `${this.apiUrl}api/Post/AddPost`;
    return this.http.post(url,body);
  } 

  //eliminar una postulacion
  deletepost(id: number): Observable<any>{
    const url = `${this.apiUrl}api/Post/DeletePost/${id}`;
    return  this.http.delete(url);
  }

  //actualizar
  updatepost(parametros: Postmodel, id: null): Observable<any>{
   const url = `${this.apiUrl}api/Post/PutPost/${id}`;
   return this.http.put(url,parametros);  
 } 
}
