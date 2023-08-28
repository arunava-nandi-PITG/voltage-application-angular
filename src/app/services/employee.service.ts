import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private getEmployeesURL: string = "http://localhost:8080/api/v1/salarylist";
  private postSaveEmployeeURL: string = "http://localhost:8080/api/v1/savesalary";
  private getEmployeeURL: string = "http://localhost:8080/api/v1/getsalary";
  private deleteEmployeeURL: string = "http://localhost:8080/api/v1/deletesalary"
  private putUpdateEmployeeURL: string = "http://localhost:8080/api/v1/updatesalary";
  private postGetActualDataURL: string = "http://localhost:8080/api/v1/getactualsalary";

  constructor(private _httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(this.getEmployeesURL);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this._httpClient.post<Employee>(this.postSaveEmployeeURL, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this._httpClient.put<Employee>(this.putUpdateEmployeeURL, employee);
  }

  getEmployee(id: number): Observable<Employee> {
    return this._httpClient.get<Employee>(`${this.getEmployeeURL}/${id}`).pipe(
      map(response => response)
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this._httpClient.delete(`${this.deleteEmployeeURL}/${id}`, {responseType: "text"});
  }

  getActualSalary(fakeSalary: number): Observable<Employee> {
    return this._httpClient.post<Employee>(this.postGetActualDataURL, fakeSalary.toString).pipe(
      map(response => response)
    );
  }

}
