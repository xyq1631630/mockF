import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "./app.config";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_URL = AppConfig.API_URL;

  btnPlaceOrder_Displayed = true;
  btnCheckout_Displayed = false;

  totalPrice: number = 0;
  tableid: number;

  // itemList = [
  //   {id: 0, name: "Chicken", price: 5, selected: false},
  //   {id: 1, name: "Shrimp", price: 7, selected: false},
  //   {id: 2, name: "Pizza", price: 8, selected: false},
  //   {id: 3, name: "Pasta", price: 10, selected: false},
  //   {id: 4, name: "Burger", price: 4, selected: false},
  //   {id: 5, name: "Steak", price: 6, selected: false},
  //   {id: 6, name: "Noodle", price: 5, selected: false},
  //   {id: 7, name: "Tea", price: 2, selected: false},
  //   {id: 8, name: "Coffee", price: 3, selected: false},
  //   {id: 9, name: "Ice Cream", price: 2, selected: false},
  // ];

  itemList: any = [];

  selectItems: any = [];

  constructor(private http: HttpClient) {

    this.getItemsFromDatabase().subscribe((data) => {
      console.log(data);
      data.forEach((element: any) => {
        this.itemList.push({
          foodid: element.foodid,
          foodname: element.foodname,
          foodprice: element.foodprice,
          count: 0,
          select: false
        });
      })

    })
  }

  getItem() {
    return this.itemList;
  }

  getSituationOfbtnCheckOut() {
    return this.btnCheckout_Displayed;
  }

  getSituationOfbtnPlaceOrder() {
    return this.btnPlaceOrder_Displayed;
  }

  getItemsFromDatabase(): Observable<any> {
    return this.http.get(this.API_URL + '/food', {withCredentials: true})
      .pipe(map((res) => {
        return res;
      }))
  }

  postOrderToDatabase(order: any): Observable<any> {
    return this.http.post(this.API_URL + '/addNewOrder', order)
      .pipe(map((res) => {
        return res;
      }))
  }
}
