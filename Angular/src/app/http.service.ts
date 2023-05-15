import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  seats!: Number
  body!: any
  url1: string = "https://train-booking-app.onrender.com/allSeats"
  url2: string = "https://train-booking-app.onrender.com/bookSeat"
  options =  new HttpHeaders({ 'Content-Type': 'application/json' })

  getNumberOfSeats(value: Number){
    this.seats = value
  }
  getSeats(){
    return this.http.get(this.url1)
  }
  //To book Seats function
  
  bookSeats(){
    this.body = { "totalSeats": this.seats }
    return this.http.post(this.url2, this.body, { headers: this.options })
  }
}
