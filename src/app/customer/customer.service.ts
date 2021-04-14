import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from './Customer';
import {Cars} from './Cars';
import {Car} from './Car';
import {CustomerData} from './CustomerData';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  configUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.configUrl.concat('users'));
  }

  getCustomerInfo(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(this.configUrl.concat('users/').concat(customerId.toString()));
  }

  getCustomerAllCar(customerId: string): Observable<Cars[]> {
    return this.http.get<Cars[]>(this.configUrl.concat('users/').concat(customerId.toString()).concat('/cars'));
  }

  getAllCars(): Observable<Cars[]> {
    return this.http.get<Cars[]>(this.configUrl.concat('cars/'));
  }

  getCarDetails(carId: string): Observable<Car> {
    return this.http.get<Car>(this.configUrl.concat('cars/').concat(carId));
  }

  getCustomerBySearchCriteria(sortType: string, searchedText: string): Observable<CustomerData[]> {
    return this.http.get<CustomerData[]>(this.configUrl.concat('user?find=').concat(searchedText).concat('&sort=name:').concat(sortType));
  }
}
