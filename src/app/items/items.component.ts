import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "../service/data.service";
import { FormsModule} from "@angular/forms";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  btnDisplayed = false;

  tableid: number = 1;

  itemList: any = [];
  // itemList: any = [
  //   {foodid: 0, foodname: "Chicken", foodprice: 5, select: false, count: 0},
  //   {foodid: 1, foodname: "Shrimp", foodprice: 7, select: false, count: 0},
  //   {foodid: 2, foodname: "Pizza", foodprice: 8, select: false, count: 0},
  //   {foodid: 3, foodname: "Pasta", foodprice: 10, select: false, count: 0},
  //   {foodid: 4, foodname: "Burger", foodprice: 4, select: false, count: 0},
  //   {foodid: 5, foodname: "Steak", foodprice: 6, select: false, count: 0},
  //   {foodid: 6, foodname: "Noodle", foodprice: 5, select: false, count: 0},
  //   {foodid: 7, foodname: "Tea", foodprice: 2, select: false, count: 0},
  //   {foodid: 8, foodname: "Coffee", foodprice: 3, select: false, count: 0},
  //   {foodid: 9, foodname: "Ice Cream", foodprice: 2, select: false, count: 0},
  // ];

  selectedItem: any = [];

  constructor(private router: Router,
              private dataService: DataService) {

  }

  ngOnInit() {
    this.itemList = this.dataService.getItem();
  }

  selectFood(e: any, item: any) {
    if (e.target.checked) {
      item.select = true;
      item.count = 1;
      this.selectedItem.push(item);
      this.btnDisplayed = true;
    } else {
      item.select = false;
      item.count = 0;
      this.selectedItem.pop(item);
      if (this.selectedItem.length == 0) {
        this.btnDisplayed = false;
      }
    }
  }

  updateCount(item: any, count: number, flag: boolean) {
    if(flag) {
      item.count = count;
    } else {
      if(count === 1) {
        item.count += count;
      }
      else {
        if (item.count > 1) {
          item.count += count;
        }
      }
    }
  }

  countValidator(item: any, num:number) {
    if (num <= 0) {
      this.updateCount(item, 1, true);
    } else {
      this.updateCount(item, num, true);
    }
  }

  test() {
    console.log(this.tableid);
  }

  btnOrderNow() {
    let food_quantity: any = [];
    this.selectedItem.forEach((food: any) => {
      let item = {
        "foodid": food.foodid,
        "foodname": food.foodname,
        "foodprice": food.foodprice
      }

      food_quantity.push({
        "food": item,
        "count": food.count
      })
    })

    let order: any = {};
    order.orderid = "";
    order.tableid = this.tableid;
    order.food_quantity = food_quantity;

    this.dataService.selectItems = this.selectedItem;
    this.dataService.tableid = this.tableid;

    this.dataService.postOrderToDatabase(order).subscribe((res) => {
      console.log(res);
      if (res.total !== null) {
        alert("Order is placed successfully.");
        this.dataService.totalPrice = res.total;
        this.dataService.btnPlaceOrder_Displayed = false;
        this.dataService.btnCheckout_Displayed = true;
        this.router.navigate(['/home']);
      } else {
        alert("Something wrongs");
        return;
      }
    })
  }
}
