import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConstant} from '../../constants/ApiConstant';

@Injectable({
    providedIn: 'root'
})
export class CustomerApiService {

    constructor(private readonly http: HttpClient) {
    }

    getAllCustomer(): Observable<any> {
        return this.http.get(ApiConstant.customer);
    }

    getCustomer(id: number): Observable<any> {
        return this.http.get(`${ApiConstant.customer}/${id}`);
    }

    createCustomer(data: any): Observable<any> {
        return this.http.post(ApiConstant.customer, data);
    }

    updateCustomer(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.customer}/${id}`, data);
    }

    deleteCustomer(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.customer}/${id}`, data);
    }

    updateAllStatus(arrId: any[], status: number): Observable<any> {
        return this.http.put(`${ApiConstant.customer}/update-status/${status}`, arrId);
    }

}