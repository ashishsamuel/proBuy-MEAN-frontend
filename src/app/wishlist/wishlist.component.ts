import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  allProducts:any = []

  constructor(private api:ApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    this.getWishlistProducts()
  }

  getWishlistProducts(){
      this.api.getWishlistAPI().subscribe((res:any)=>{
        console.log(res);
        this.allProducts = res
      })
  }

  removeWishlistProduct(id:any){
    this.api.removeWishlistItem(id).subscribe({
      next:(res:any)=>{
        this.getWishlistProducts()
        this.api.getWishlistCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    }

    )
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
        Object.assign(product,{quantity:1})
        this.api.addtoCartAPI(product).subscribe({
          next:(res:any)=>{
            this.toaster.showSuccess(res)
            this.api.getCartCount()
            this.removeWishlistProduct(product._id)
          },
          error:(err:any)=>{
            console.log(err);
            this.toaster.showError(err.error)
            
          }
        })
      }else{
      this.toaster.showWarning("operation denied... Please login")
    }
  }

}
