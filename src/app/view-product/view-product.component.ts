import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  product:any = {}
  
  constructor(private route:ActivatedRoute,private api:ApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} =res

      // get details of particular component
      this.getProduct(id)
    })
  }

  getProduct(id:any){
    this.api.getProductAPI(id).subscribe({
      next:(res:any)=>{
        this.product = res
        console.log(this.product);
      },
      error:(err:any)=>{
        console.log(err.error);
      }
    })
  }

  addToWishList(product:any){
    if(sessionStorage.getItem("token")){
      this.api.addtowishlist(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.title} Product has added tp your wishlist!!!`)
          this.api.getWishlistCount()
        }
      })
    }else{
      this.toaster.showWarning("operation denied... Please login")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
        Object.assign(product,{quantity:1})
        this.api.addtoCartAPI(product).subscribe({
          next:(res:any)=>{
            this.toaster.showSuccess(res)
            this.api.getCartCount()
          },
          error:(err:any)=>{
            console.log(err);
            this.toaster.showError(err.console.error());
            
          }
        })
      }else{
      this.toaster.showWarning("operation denied... Please login")
    }
  }
}
