import { Phone } from './../Interfaces/phone';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + 'api/Phone';
  constructor(private http:HttpClient) {}

  getPhone(id:number):Observable<Phone>{
    return this.http.get<Phone>(`${this.apiUrl}/${id}`);
  }
  getListPhonesByPersonId(idPerson:number):Observable<Phone[]>{
    return this.http.get<Phone[]>(`${this.apiUrl}/get-by-personId/${idPerson}`);
  }
  newPhone(phone:Phone):Observable<Phone>{
    return this.http.post<Phone>(`${this.apiUrl}`,phone);
  }
}
