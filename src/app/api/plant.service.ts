import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plants: any = [];

  dataChanged$: Observable<boolean>;
  baseURL = 'https://ua1h8jzrdf.execute-api.us-east-1.amazonaws.com';

  public dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getPlants(): Observable<any> {
    return this.http.get(`${this.baseURL}/plants`).pipe(map(this.extractData), catchError(this.handleError));
  }

  addPlant(plant) {
    this.http.post(`${this.baseURL}/plants/addPlant`, plant).subscribe(res => {
      this.plants = this.plants.push(res);
      this.dataChangeSubject.next(true);
    });
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    if (error instanceof Response) {
      const err = error || '';
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    console.error(errorMessage);
    return errorMessage;
  }
}
