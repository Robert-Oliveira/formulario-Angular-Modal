import { CriarRoteiro } from '../models/criar-roteiro-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalvarRoteiroService {
  private listaRoteiros: any;
  private roteiro!: CriarRoteiro;

  private url = 'http://localhost:3000/roteiros';

  constructor(private httpClient: HttpClient) {
    this.listaRoteiros = [];
  }

  get roteiros() {
    return this.listaRoteiros;
  }

  set roteiros(roteiro: CriarRoteiro) {
    this.listaRoteiros.push(roteiro);
  }

  lerRoteirosById(id: Number): Observable<CriarRoteiro> {
    return this.httpClient.get<CriarRoteiro>(`${this.url}/${id}`);
  }

  lerRoteiros(): Observable<CriarRoteiro[]> {
    return this.httpClient.get<CriarRoteiro[]>(this.url);
  }
  salvarRoteiro(roteiro: CriarRoteiro): Observable<CriarRoteiro> {
    return this.httpClient.post<CriarRoteiro>(this.url, roteiro);
  }

  deletarRoteiro(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  updateRoteiro(roteiro: CriarRoteiro): Observable<CriarRoteiro> {
    let endpoint = roteiro.id;
    console.log(`${this.url}/${endpoint}`, roteiro);
    return this.httpClient.put<CriarRoteiro>(
      `${this.url}/${endpoint}`,
      roteiro
    );
  }

  //salvar os dados em uma váriavel, não é a forma mais indicada, mais funciona para esse ex.
  salvarDadosRoteiro(roteiro: CriarRoteiro) {
    this.roteiro = roteiro;
  }
  obterDadosRoteiro(): CriarRoteiro {
    return this.roteiro;
  }
}
