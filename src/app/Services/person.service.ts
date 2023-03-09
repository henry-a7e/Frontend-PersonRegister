import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Person } from '../Interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/Person';
  constructor(private http:HttpClient) {}
  
  getListPerson():Observable<Person[]>{
    return this.http.get<Person[]>(`${this.apiUrl}`);
  }
  getPerson(idPerson:number):Observable<Person>{
    return this.http.get<Person>(`${this.apiUrl}/${idPerson}`);
  }

  newPerson(person:Person):Observable<Person>{
    return this.http.post<Person>(`${this.apiUrl}`,person);
  }

  searchByCpfReturnBoolean(cpf:number):Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/search-by-cpf-return-bool/${cpf}`)
  }

}
