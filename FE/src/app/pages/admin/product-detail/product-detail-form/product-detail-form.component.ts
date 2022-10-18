import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SizeService } from '../../../../shared/service/size/size.service';
import { ColorService } from '../../../../shared/service/color/color.service';
import { ProductDetailService } from '../../../../shared/service/productDetail/product-detail.service';
import { Regex } from '../../../../shared/validators/Regex';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ColorCreateDialogComponent } from '../../dialog/color-create-dialog/color-create-dialog.component';

@Component({
  selector: 'app-product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styleUrls: ['./product-detail-form.component.scss']
})
export class ProductDetailFormComponent implements OnInit {
  isLoading: boolean = false;

  files: File[] = [];

  selectedColor: any;

  productId: any;
  colorId: any = {
    id: '',
    code:''
  };
  allColor: any;
  colorFormGroup = this.fb.group({
    id: ['',Validators.required],
    name: ['', [Validators.required,Validators.pattern(Regex.unicode)]],
    code: ['', Validators.required],
    status: ['']
  })

  sizeFormGroup = this.fb.group({
    1: ['',Validators.required],
    2: ['',Validators.required],
    3: ['',Validators.required],
    4: ['',Validators.required],
    5: ['',Validators.required],
    6: ['',Validators.required],
  })
  // Size Color API create
  productDetailFormGroup = this.fb.group({
    product: this.fb.group({
      id: ['']
    }),
    color: this.fb.group({
      id: ['']
    }),
    size: this.fb.group({
      id: ['']
    }),
    quantity: ['']
  })

  sizes: any;

  s: boolean = false;
  m: boolean = false;
  l: boolean = false;
  xl: boolean = false;
  xxl: boolean = false;
  xxxl: boolean = false;
  checkSelectedSize: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
    private readonly productDetailService: ProductDetailService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getAllColor();
  }

  createProductDetail(){
    this.sizeFormGroup.markAllAsTouched();
    this.productDetailFormGroup.markAllAsTouched();
    if (this.s == false
        && this.m == false
        && this.l == false
        && this.xl == false
        && this.xxl == false
        && this.xxxl == false
      ) {
      this.checkSelectedSize = true;
    }
      if (
       Object.values( Object.values(this.productDetailFormGroup.value)[1])[0] == ""
      ) {
        this.toastrService.error('Bạn chưa chọn màu sắc');
        this.sizeFormGroup.markAsUntouched();
      }
      
      for (let i = 0; i < Object.keys(this.sizeFormGroup.value).length; i++) {
        if (Object.values(this.sizeFormGroup.value)[i] != "") {
          this.productDetailFormGroup.patchValue({size: {id: Object.keys(this.sizeFormGroup.value)[i]}});
          this.productDetailFormGroup.patchValue({quantity: Object.values(this.sizeFormGroup.value)[i]});
          this.productDetailFormGroup.patchValue({product:{id: this.productId}});
          console.log(this.productDetailFormGroup.value);
          this.productDetailService.createProductDetail(this.productDetailFormGroup.value).subscribe();
        }
      }
      console.log('Test');
      
  }

  check(){
    this.createProductDetail();
    // console.log(Object.values( Object.values(this.productDetailFormGroup.value)[1])[0] );
    
  }

  selectColor(code: any){
    this.selectedColor = code;
    console.log(this.selectedColor);
    
  }

  getAllColor(){
    this.isLoading = true;
    this.colorService.getAllColor().subscribe({
      next: (res)=>{
        this.isLoading = false;
        this.allColor = res;
      },
      error: (err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  openDialogCreateColor(){
    let dialogRef = this.dialog.open(ColorCreateDialogComponent,{
      width: '1000px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllColor();
    })
  }

  selectSize(size: string){
    this.sizeFormGroup.markAsUntouched();
    this.checkSelectedSize = false;
    if (size == 's') {
      this.s = !this.s;
    }
    if (size == 'm') {
      this.m = !this.m;
    }
    if (size == 'l') {
      this.l = !this.l;
    }
    if (size == 'xl') {
      this.xl = !this.xl;
    }
    if (size == '2xl') {
      this.xxl = !this.xxl;
    }
    if (size == '3xl') {
      this.xxxl = !this.xxxl;
    }
  }
  
  //Select image
	onSelect(event) {
    if(this.files){
      this.files.splice(0,1);
    }
		this.files.push(...event.addedFiles);
    
	}
  //Remove image
	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  onChangeColor(event){
    this.colorFormGroup.patchValue({code: event.target.value});
  }

  // Reset when submit form
  onSubmit(){
    this.colorFormGroup.patchValue({code: '#ff12ff'});
    this.files = [];
  }

  finish(){
    
  }

}
