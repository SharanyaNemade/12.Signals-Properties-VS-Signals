import { Component,effect,signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals {
  data = signal(10);
  count = signal(0);


  constructor(){
    effect(() => {
      console.log("this is count", this.count());
      console.log("this is data", this.data());

      if(this.count() == 10)
      {
        this.count.set(0);
      }
    });
  }
  
    // set is used to update the value of signal
  updateData(){
    this.data.set(this.data()+1);
  }

  updateCount()
  {
    this.count.set(this.count() + 1);
  }
}
