import { Component,OnInit, Input } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(){}

  ngOnInit():void{

  }
  
}
