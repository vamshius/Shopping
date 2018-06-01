import { Component, OnInit, Input } from '@angular/core';
import{ ProductService } from '../product.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private productService: ProductService) { }

  //cartList: Array<any> = [];
  cartList: Array<{name: string, description: string, price: number, category: string, imported: boolean, quantity: number}> = [];
  salesTax: number = 0.10;
  dutyTax: number = 0.05;
  defaultQuantity: number = 1;
  totalPrice: number;
  taxAmountOfEachItem: Array<number> = [];
  eachItemAfterTax: Array<number> = [];
  totalAmount: number;
  finalTax: Array<number> = [];
  totalTax: number;
  viewToggle: boolean = false;
  tempPrice: Array<number> = [];
  tempTax = 0;

  ngOnInit() {
    this.cartList = this.productService.cartItems;
    this.generateTax();
    this.getTaxAmountOfEachItem();
    this.getTotals();
  }

  viewReceipt(){
    this.viewToggle = true;
  }

  generateTax(){
    for(let i in this.cartList){
      if(this.cartList[i].category === "NonTax" && this.cartList[i].imported == false){
        this.finalTax[i] = 0;
      }
      else if(this.cartList[i].category == "NonTax" && this.cartList[i].imported == true){
        this.finalTax[i] = this.dutyTax;
      }
      else if(this.cartList[i].category === "DutyTax"){
        this.finalTax[i] = this.salesTax + this.dutyTax;
      }
      else{
        this.finalTax[i] = this.salesTax;
      }
      this.finalTax.push(this.finalTax[i]);
    }
    return this.finalTax;
  }

  getTaxAmountOfEachItem(){
    let temp;
    for(let i in this.cartList){
      temp = this.cartList[i].price * this.finalTax[i];
      this.taxAmountOfEachItem[i] = parseFloat((Math.ceil(temp * 20)/20).toFixed(2));
      this.taxAmountOfEachItem.push(this.taxAmountOfEachItem[i]);
    }
    return this.taxAmountOfEachItem;
  }


  getTotals(){
    let total = 0;
    let amount = 0;
    let totTax = 0;
    for(let i in this.cartList){
      total += ( this.cartList[i].price * this.cartList[i].quantity );
      amount += (this.cartList[i].price + this.taxAmountOfEachItem[i]) * this.cartList[i].quantity;
      totTax += (this.taxAmountOfEachItem[i] * this.cartList[i].quantity );
    }
    this.totalPrice = total;
    this.totalAmount = amount;
    this.totalTax = totTax;
  }

  // onQuantityChange(q: number, i: number){
  //   if( q > 0){ 
  //   this.tempPrice[i] = this.cartList[i].price + this.cartList[i].price;
  //   this.tempTax = this.taxAmountOfEachItem[i] + this.taxAmountOfEachItem[i];
  //   } 
  //   this.cartList[i].price = this.tempPrice[i];
  //   this.taxAmountOfEachItem[i] = this.tempTax;
  //   console.log(this.tempPrice, this.tempTax);
  // }

  emptyCart(){
    let ask = confirm('Are you sure to empty cart?');
    if(ask == true){
      this.productService.emptyCartItems();
      this.totalAmount = 0;
      this.totalTax = 0;
    }else{
      return false;
    }
  }

}
