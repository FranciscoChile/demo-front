import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/shared/environment/environment';
import { TaskDTO } from 'src/app/models/task.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl + "/tasks";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskDTO[]> {
    
    let httpOptions = { ...this.httpOptions};

    return this.http.get<TaskDTO[]>(this.apiUrl, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findById (id: string): Observable<TaskDTO> {
    return this.http.get<TaskDTO>(this.apiUrl + "/" + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  save(taskData: FormData): Observable<any> {

    return this.http.post(this.apiUrl, taskData)
    .pipe(
      catchError(this.errorHandler)
    );
    
  }

  update(taskData: FormData): Observable<any> {

    return this.http.patch(this.apiUrl, taskData)
    .pipe(
      catchError(this.errorHandler)
    );
    
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error);
  }
}
