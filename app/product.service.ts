import { Item } from './item.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ProductService{

    taxType  = ['NonTax', 'SalesTax', 'DutyTax'];

    private items: Item[] = [
        new Item(
            'Book',
            'Novel',
            12.49,
            this.taxType[0],
            false
        ),
        new Item(
            'Music CD',
            'Top 100 Tracks',
            14.99,
            this.taxType[1],
            false
        ),
        new Item(
            'Chocolate Bar',
            'Peanut',
            0.85,
            this.taxType[0],
            false
        ),
        new Item(
            'Box of Chocolates',
            'Imported Caramel',
            10,
            this.taxType[0],
            true
        ),
        new Item(
            'Calvin Klein Perfume',
            'Imported Fragrance',
            47.50,
            this.taxType[2],
            true
        ),
        new Item(
            'Box of Chocolates',
            'Imported Dark Choco',
            11.25,
            this.taxType[0],
            true
        ),
        new Item(
            'Versace Perfume',
            'Imported Fragrance',
            27.99,
            this.taxType[2],
            true
        ),
        new Item(
            'Ralph Lauren Perfume',
            '8.5 Fl Oz',
            18.99,
            this.taxType[1],
            false
        ),
        new Item(
            'Headache Pills',
            'Pack of 5',
            9.75,
            this.taxType[0],
            false
        ),
        new Item(
            'Milk',
            'Dairy Pure Gallon Milk',
            3,
            this.taxType[0],
            false
        ),
        new Item(
            'Gallon Water',
            'Spring Water',
            1.99,
            this.taxType[0],
            false
        ),
        new Item(
            'T-Shirt',
            'Polo V-neck',
            6.49,
            this.taxType[1],
            false
        ),
    ]

    cartItems: Array<{name: string, description: string, price: number, category: string, imported: boolean, quantity: number}> = [];

    getItem(){
        return this.items.slice();
    }

    addItemToCart(name: string, description: string, price: number, category: string, isImported: boolean, index: number){
       var foundIndex = this.findItem(price);
       if(foundIndex == -1){
            this.cartItems.push({
                name: name,
                description: description,
                price: price,
                category: category,
                imported: isImported,
                quantity: 1
            });
        }
        else{
            this.cartItems[foundIndex].quantity += 1;
        }
        // console.log(this.cartItems[foundIndex].quantity);
        alert(this.cartItems[index].name + " has been added to cart!");
        return this.cartItems;
    }

    findItem(price){
        var foundIndex = -1;
        for(let i=0; i< this.cartItems.length; i++){
            if(this.cartItems[i].price == price){
                return i;
            }
        }
        return foundIndex;
    }

    // removeItemFromCart(i: number){
    //     this.cartItems.splice(i, 1);
    // }

    emptyCartItems(){
        this.cartItems.length = 0;
    }

}