import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  
  constructor(private http:HttpClient) { 
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
  }

  getAllproductsAPI(){
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  getProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`)
  }

  appendTokenHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  } 

  addtowishlist(product:any){
    return this.http.post(`${this.SERVER_URL}/wishlist/add`,product,this.appendTokenHeader())
  }

  // /wishlist/get-allproducts
  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/wishlist/get-allproducts`,this.appendTokenHeader())
  }

  // get wishlist count
  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  // delete wishlist item
  removeWishlistItem(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist/remove/${id}`,this.appendTokenHeader())
  }

  // add to cart
  addtoCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenHeader())
  }

  // get cart products
  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/cart/get-allproducts`,this.appendTokenHeader())
  }

   // get cart count
   getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  // /cart increment api
  cartIncrementAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart/increment/${id}`,this.appendTokenHeader())
  }

    // cart decrement api
    cartDecrementAPI(id:any){
      return this.http.get(`${this.SERVER_URL}/cart/decrement/${id}`,this.appendTokenHeader())
    }

    // remove cart items
    removeCartItemAPI(id:any){
      return this.http.delete(`${this.SERVER_URL}/cart/remove/${id}`,this.appendTokenHeader())
    }

    // empty all cart items
    emptyCartAPI(){
      return this.http.delete(`${this.SERVER_URL}/cart/empty`,this.appendTokenHeader())
    }

    searchProductsAPI(searchKey:any){
      return this.http.get(`${this.SERVER_URL}/products/filter?search=${searchKey}`,this.appendTokenHeader())
  }
}
