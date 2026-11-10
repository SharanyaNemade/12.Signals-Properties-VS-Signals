import { Component } from '@angular/core';

@Component({
  selector: 'app-data-type',
  imports: [],
  templateUrl: './data-type.html',
  styleUrl: './data-type.css',
})
export class DataType {
  data1:any = "anil sidhu";
  data2:any = 100;
  data3:boolean = true;
  isUpdated: boolean = false;


  updateData(val:number,user:string){
    const defaultVal = 30;
    console.log(user);

    this.data1=val;
    this.data2=val;

    console.log(this.sum(10,20));
  }


  sum(a:number,b:number):number{
    return a+b;
  }


  handleEvent(event: PointerEvent | Event | MouseEvent){
    console.log(event);
  }


  // updateData(): void{
  //   if(this.isUpdated){
  //   this.data1 = "anil sidhu";
  //   this.data2 = 100;
  //   this.data3 = true;
  //   this.isUpdated = false;
  //   }

  //   else{
  //   this.data1 = "anil sidhu updated";
  //   this.data2 = 200;
  //   this.data3 = false;
  //   this.isUpdated = true;
  //   }
  // }
}
