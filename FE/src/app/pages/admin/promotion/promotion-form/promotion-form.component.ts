import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {PromotionComponent} from '../promotion.component';
import {Constant} from '../../../../shared/constants/Constant';
import {PromotionService} from '../../../../shared/service/promotion/promotion.service';
import {ToastrService} from 'ngx-toastr';
import {checkDiscount, checkSpace, compareDate} from '../../../../shared/validators/Regex';

@Component({
  selector: 'promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
})
export class PromotionFormComponent implements OnInit {

  title = '' ;
  CONSTAIN = Constant.TYPE_DIALOG ;

  form = this.fb.group({
      id: null ,
      discountName: [ '' , [checkSpace  ]] ,
      discount: [ null , [Validators.required , checkDiscount ]] ,
      startDate: [null , [Validators.required ]] ,
      endDate: [null , [Validators.required ]] ,
      status: 1 ,
  } , {
      validators: compareDate('startDate' , 'endDate')
  })

  constructor( private fb: FormBuilder ,
               public dialogRef: MatDialogRef<PromotionComponent> ,
               private promotionService: PromotionService ,
               private toast: ToastrService ,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
     if( this.data.type == this.CONSTAIN.NEW ){
        this.title = 'Thêm mới' ;
     }else{
        this.title = 'Cập nhập' ;
        this.form.patchValue( this.data.data ) ;
     }
  }

  onSave(){
      this.form.markAllAsTouched() ;
      if( this.form.invalid ){
          return ;
      }

      if( this.data.type == this.CONSTAIN.NEW ){
          this.create();
      }else{
          this.update() ;
      }
  }

  create(){
      this.promotionService.create( this.form.getRawValue() ) .subscribe({
          next: value => {
              this.toast.success("Thêm mới thành công") ;
              this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS)
          },
          error: err => {
              this.toast.error("Thêm mới thất bại")
          }
      })
  }

  update(){
      this.promotionService.create( this.form.getRawValue() ) .subscribe({
          next: value => {
              this.toast.success("Cập nhập thành công") ;
              this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS)
          },
          error: err => {
              this.toast.error("Cập nhập thất bại")
          }
      })
  }

  onClose(){
     this.dialogRef.close();
  }

  isValidators( name: any , error: any ){
      return this.form.get(name).hasError(error) && this.form.get(name).touched ;
  }

}
