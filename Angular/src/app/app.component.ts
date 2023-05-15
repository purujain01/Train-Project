import { Component } from '@angular/core';
import { HttpService } from './http.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  seats!: Number
  title = 'Angular';
  seatsInfo!: any
  seatsNumber!: any
  obs1!: Observable<any>
  obs2!: Observable<any>
  error!: any
  message!: any
  show: boolean = false
  mess!: any
  loading: boolean = false
  status: any = new Map()
  num: any[][] = [[]]

  constructor( private httpService: HttpService){
    var k = 0
    for(var i = 0;i <= 12; i++){
      this.num[i] = []
    }
    for(var i = 1;i <= 80; i++){
      this.num[k].push(i)
      if(i%7 == 0) k++;
    }
    this.getSeats()
  }
  getSeats(){

    this.obs1 = this.httpService.getSeats()
    this.obs1.subscribe({
      next: observable => this.seatsInfo = observable,
      error: err => this.error = err,
      complete: () => {
        (this.seatsInfo)
        if(this.seatsInfo?.Error) this.error = this.seatsInfo.console.error
        else {
            this.seatsInfo = this.seatsInfo.data
            this.seatsInfo.forEach((obj: any) => {
              this.status.set(obj.SeatNumber,true)
            })
        }
        
      }
    })
  }

  bookSeats(){
    this.error = undefined
    this.mess = undefined
    this.show = false
    if(!this.seats) this.error = "Input required"
    else if(this.seats == 0) this.error = "Number of seats cannot be 0"
    else {
      this.loading  = true
      this.httpService.getNumberOfSeats(this.seats)
      this.obs2 = this.httpService.bookSeats()                             

      this.obs2.subscribe({
        next: observable => this.mess = observable,
        error: err => this.error = err,
        complete: () => {
          if(this.mess?.Error){
            this.error = this.mess.Error
          }
          else{
            this.show = true
            this.getSeats()
          }
          this.loading = false
        }
      })
    }
    
  }

  assignColour(j: Number){

    if(this.status.has(j) == true) return 'red'
    else return '#98FB98'
  }

}
