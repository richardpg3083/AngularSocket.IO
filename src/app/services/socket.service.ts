import { Injectable, Input, Output,EventEmitter } from '@angular/core';
import {io} from 'socket.io-client';
import { UserExist, User, Message } from '../models/user.model';
import {Observable, Subscriber} from 'rxjs'
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class SocketService 
{ 
  socket:any;
  server:string="http://localhost:3000";
 
  constructor() 
  { 
    this.socket=io(this.server);   
  }

  listen(eventName:String)
  {
    return new Observable((Subscriber)=>{
      this.socket.on(eventName,(data:any)=>{
        Subscriber.next(data);
      })
    })
  }

  emit(eventName:string, data:any)
  {
    this.socket.emit(eventName,data);
  }
  
}
