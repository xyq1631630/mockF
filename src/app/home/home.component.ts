import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataService } from "../service/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  btnCheckout_Displayed: boolean;
  btnPlaceOrder_Displayed: boolean;

  dialog_Displayed: boolean = false;
  btnPlayNow_Displayed: boolean = false;

  itemListAfterSelected: any = [];
  total: number = 0;
  tableid: number = 0;

  constructor(private router: Router,
              private dataService: DataService) {
    this.btnPlaceOrder_Displayed = this.dataService.getSituationOfbtnPlaceOrder();
    this.btnCheckout_Displayed = this.dataService.getSituationOfbtnCheckOut();
  }

  ngOnInit(): void {
  }

  btnPlaceOrder() {
    this.router.navigate(['/list']);
  }

  btnCheckOut() {
    this.btnCheckout_Displayed = false;
    this.dialog_Displayed = true;

    this.itemListAfterSelected = this.dataService.selectItems;
    this.total = this.dataService.totalPrice;
    this.tableid = this.dataService.tableid;

  }

  btnPlayNow() {
    alert("Thanks. Please visit us again");
  }
}
