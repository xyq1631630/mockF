import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  itemList: any = [];
  btnDisplay = false;

  listFormGroup: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private dataService: DataService) {
    this.listFormGroup = this.fb.group({
      selectItems: []
    });
  }

  ngOnInit() {
    this.itemList = this.dataService.getItem();
    this.dataService.selectItems = [];
  }

  listControlChanged(list: any) {
    this.dataService.selectItems = list.selectedOptions.selected.map((item: any) => item.value).sort((a: any, b: any) => a - b);
    this.listFormGroup.get('selectItems')!.setValue(this.dataService.selectItems);
    this.btnValidation();
  }

  btnValidation(): void {
    if(this.dataService.selectItems.length == 0) this.btnDisplay = false;
    else this.btnDisplay = true;
  }

  btnOrderNow(): void {
    let order = {
      id: 0,
      price: this.dataService.getTotalAmount()
    }

    this.dataService.postOrderToDatabase(order).subscribe((res) =>{
      console.log(res);
      if (res.code === 200) {
        alert("Order is placed successfully");
        this.dataService.btnPlaceOrder_Displayed = false;
        this.dataService.btnCheckout_Displayed = true;
        this.router.navigate(['/home']);
      } else {
        alert("Something wrongs.");
        return;
      }
    })



  }
}
