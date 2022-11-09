import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../../constants/Constant';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailApiService {

  constructor(private readonly http: HttpClient) { }

  getOrderDetailByOrderId(orderId: any): Observable<any>{
    return this.http.get(`${ApiConstant.orderDetail}/${orderId}`);
  }
}
