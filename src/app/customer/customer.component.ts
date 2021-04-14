import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from './Customer';
import {Cars} from './Cars';
import {CustomerData} from './CustomerData';
import { timer } from 'rxjs';
import {Car} from './Car';
import {CustomerService} from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  carDetails: Car;
  customer: Customer;
  allCars: Cars[];
  customerCars: Cars[];
  customers: Customer[];
  searchedCustomerResult: CustomerData[];
  showingCarDetails: boolean;
  showAllCars: boolean;
  selectedCustomer: string;
  showCustomerAllCars: boolean;
  showSearchCustomer: boolean;
  shortingOrder: string;
  searchedCustomerName: string;
  errMsg: string;

  constructor(private http: HttpClient, private serv: CustomerService) { }

  ngOnInit(): void {
    this.shortingOrder = 'asc';
    this.showCustomerAllCars = false;
    this.showSearchCustomer = false;
    this.showAllCars = false;
    this.loadAllCustomer();
  }

  loadAllCustomer(): void {
    this.serv.getAllCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    }, (error) => {
      if (error.status === 0) {
        this.errMsg = 'CAN NOT CONNECT TO SERVER';
        this.stimer();
      }
    });
  }

  fetchCustomerData(customerId): void {
    this.showAllCars = false;
    this.showingCarDetails = false;
    this.showSearchCustomer = false;
    this.serv.getCustomerInfo(customerId).subscribe((data: Customer) => {
      this.selectedCustomer = customerId;
      this.customer = data;
    });
  }

  getCustomerAllCarData(): void {
    this.showAllCars = false;
    this.showingCarDetails = false;
    this.showSearchCustomer = false;
    if (this.selectedCustomer) {
      this.serv.getCustomerAllCar(this.selectedCustomer).subscribe((data: Cars[]) => {
        this.customerCars = data;
        this.showCustomerAllCars = true;
      });
    }
  }

  getCustomerAllCars(): void {
    this.showCustomerAllCars = false;
    this.showAllCars = true;
    this.showSearchCustomer = false;
    this.serv.getAllCars().subscribe((data: Cars[]) => {
      this.allCars = data;
    });
  }

  getCarDetails(carId): void {
    this.showSearchCustomer = false;
    this.serv.getCarDetails(carId).subscribe((data: Car) => {
      this.carDetails = data;
      this.showingCarDetails = true;
    });
  }

  selectedShortType(shortOrder: string): void {
    this.shortingOrder = shortOrder;
  }

  searchedCustomer(searchedText: string): void {
    this.searchedCustomerName = searchedText;
  }

  stimer(): void {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      if (val === 2) {
        abc.unsubscribe();
        this.errMsg = null;
      }
    });
  }

  getCustomerDataBySearchCreteria(): void {
    this.showingCarDetails = false;
    this.showAllCars = false;
    this.showCustomerAllCars = false;

    if (this.shortingOrder && this.searchedCustomerName) {
      this.serv.getCustomerBySearchCriteria(this.shortingOrder, this.searchedCustomerName).subscribe((data: CustomerData[]) => {
        this.searchedCustomerResult = data;
        this.showSearchCustomer = true;
      }, (error) => {
        this.showSearchCustomer = false;
        if (error.status === 404) {
          this.errMsg = 'NO Result';
          this.stimer();
        }
        if (error.status === 0) {
          this.errMsg = 'CAN NOT CONNECT TO SERVER';
          this.stimer();
        }
      });
    }
  }
}
