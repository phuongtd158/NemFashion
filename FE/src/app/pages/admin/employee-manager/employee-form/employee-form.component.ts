import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmployeeListComponent} from '../employee-list/employee-list.component';
import {EmployeeService} from 'app/shared/service/employee/employee.service'

export function checkSpace( c: AbstractControl ) {
    return ( c.value.trim() == '' ) ? {
        isSpace: true
    }: null ;
}

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
    TYPE_DIALOG = Constant.TYPE_DIALOG ;
    title = '' ;
    nameBtn = '' ;
    colorBtn = '' ;

    staff = this.fb.group( {
        id: null ,
        fullname: ['' , [ checkSpace ]],
        email: ['' , [Validators.required , Validators.email ]] ,
        password: ['' , [checkSpace ]] ,
        birthDate: ['' , [Validators.required ]] ,
        phone: ['' , [Validators.required , Validators.pattern("0[3,9]\\d{8}")]] ,
        address: ['' , [checkSpace ]] ,
        photo: 'https://res.cloudinary.com/dpnmnhu1m/image/upload/v1664847958/b92834f8d2ca4fffeb42062d37f2c6bd_now9cs.jpg' ,
        status: 1 ,
        role: this.fb.group( {
            id: 1
        })
    })

    constructor(private fb: FormBuilder ,
                @Inject(MAT_DIALOG_DATA) public dataDialog?: any ,
                private emService?: EmployeeService ,
                private dialogRef?: MatDialogRef<EmployeeListComponent>
                ) {

    }

    ngOnInit(): void {
        if ( this.dataDialog.type === this.TYPE_DIALOG.NEW ) {
            this.title = 'Thêm mới nhân viên'
            this.nameBtn = "Thêm mới"
            this.colorBtn = 'btn btn-success'
        }else{
            this.colorBtn = 'btn btn-primary'
            this.nameBtn = "Cập nhập"
            this.staff.patchValue( this.dataDialog.row )
        }
    }

    onSubmit() {
        this.staff.markAllAsTouched()
        if( this.staff.invalid ){
            return ;
        }

        if( this.dataDialog.type === this.TYPE_DIALOG.NEW ){
            this.emService.createEmployee( this.staff.getRawValue() ) ;
        }else {
            this.emService.updateEmployee( this.staff.getRawValue() ) ;
        }

        this.emService.isCloseDialog.subscribe(
            value => {
                if( value ){
                    this.dialogRef.close( Constant.RESULT_CLOSE_DIALOG.SUCCESS )
                    this.emService.isCloseDialog.next(false) ;
                }
            }
        )

    }

    onDismiss() {
        this.dialogRef.close( Constant.RESULT_CLOSE_DIALOG.CLOSE ) ;
    }

    isValidator( name:string , error: string ){
         return this.staff.get(name).hasError(error) && this.staff.get(name).touched ;
    }

}
