import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface IDataResponse {
  id: number;
  timeStamp: Date;
  flow: number;
  pressure: number;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private fetchUrl: string = 'http://localhost:3000/sensor/fetch-all';
  private addUrl: string = 'http://localhost:3000/sensor/add-data';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<IDataResponse[]> {
    return this.http.get<IDataResponse[]>(this.fetchUrl, {});
  }

  addData(flow: number, pressure: number): Observable<IDataResponse> {
    return this.http
      .post<IDataResponse>(this.addUrl, {
        flow: flow,
        pressure: pressure,
      })
      .pipe(
        tap((response: any) => {
          console.log('akki respo', response);
        })
      );
  }
}
