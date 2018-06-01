import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../item.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  sub: Subscription;

  constructor(private productService: ProductService, private router: Router) { }
  ShopItems: Array<any>;

  ngOnInit() {
    this.ShopItems = this.productService.getItem();
  }
  
  onAddToCart(name: string, description: string, price: number, category: string, isImported: boolean, index: number){
    this.productService.addItemToCart(name, description, price, category, isImported, index);
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }

}
