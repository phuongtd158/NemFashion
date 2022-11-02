import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RatingComponent} from "../rating/rating.component";
import {OrderService} from "../../../../shared/service/order/order.service";
import {OrderDetailService} from "../../../../shared/service/order-detail/order-detail.service";
import {ConfirmDialogComponent} from "../../../../shared/confirm-dialog/confirm-dialog.component";
import {Constants} from "../../../../shared/constants/constants.module";
import {RatingService} from "../../../../shared/service/rating-service/rating.service";

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  listOrder: any ;
  listOrderDetail: any ;
  listRating: any[] = [] ;
  employeeId = 1 ;

  listStatus = [
    { status: 0 , name: 'Chờ xác nhận'} ,
    { status: 2 , name:  'Đang giao'} ,
    { status: 1 , name: 'Đã giao'} ,
    { status: 4 , name: 'Đã hủy'}
  ]


  constructor( private dialog: MatDialog ,
               private orderService: OrderService ,
               private orderDetailService: OrderDetailService ,
               private ratingService: RatingService ) { }

  ngOnInit(): void {
     this.findAllOrder() ;
     this.findAllOrderDetail();
     this.findAllRating() ;
  }

  checkRating( id:number , idProduct: number  ){
     for( let x of this.listRating ){
        if( x.orders.id == id && x.product.id == idProduct){
          return false ;
        }
     }
     return true ;
  }

  findAllRating(){
    this.ratingService.getAllRatingByIdCustome(33).subscribe( data => {
        this.listRating = data as any[] ;
    })
  }

  findAllOrder(){
    this.orderService.getAllOrder(  33).subscribe( data => {
      this.listOrder = data ;
      console.log(1)
    })
  }

  findAllOrderDetail(){
     this.orderDetailService.getAllOrderDetail(33 ).subscribe( data => {
         return this.listOrderDetail = data ;
     })
  }

  OnpenRating( orderId: number , productId: number   ) {
    console.log( orderId)
    console.log(productId)
    this.dialog.open(RatingComponent, {
      width: '30vw',
      disableClose: true,
      hasBackdrop: true,
      data: {
        order_id: orderId ,
        product_id: productId ,
        employee_id: this.employeeId
      }
    }).afterClosed().subscribe( value => {
       if( value == Constants.RESULT_CLOSE_DIALOG.SUCCESS ){
         this.findAllOrder() ;
         this.findAllOrderDetail();
         this.findAllRating() ;
       }
    })
  }

  openCancel( id: number ){
     this.dialog.open( ConfirmDialogComponent , {
         width: '30vw' ,
        disableClose: true ,
        hasBackdrop: true ,
        data: {
            title: 'Xác nhận' ,
            message: 'Bạn có muốn hủy đơn hàng không?'
        }
     }).afterClosed().subscribe( data => {
         if( data === Constants.RESULT_CLOSE_DIALOG.CONFIRM ){
            this.orderService.updateStatusOrder( 4 , id ).subscribe(
              () => {
                this.findAllOrder() ;
              }
            );

         }
     })
  }


  checkDate( a: any ){
     let date = new Date() ;
     date.setDate( date.getDate() - 5 )
     if( date <= new Date(a) ){
        return true ;
     }
     return false ;
  }
}
