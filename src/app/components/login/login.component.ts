import { Component, OnInit , Input,Output, EventEmitter} from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute,Route } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  userName:string='';
  userAvatar:string='';

  eventRegister="register";
  eventUserExists="userExists";
  
  constructor(private routerActived:ActivatedRoute,private socket:SocketService){

}
  ngOnInit():void{
    this.socket.listen(this.eventUserExists).subscribe((data)=>{
        this.ValidarUser(data);
    });
  }

  EnviarUser(userNickName:string):void
  {
    this.userName=userNickName;
    if ($("#av1").is(':checked')==true)
    {
      this.userAvatar=String($("#av1").val());
    }

    if ($("#av2").is(':checked')==true)
    {  
      this.userAvatar=String($("#av1").val());
    }

    if ($("#av3").is(':checked')==true)
    {    
      this.userAvatar=String($("#av1").val());
    }

    if ($("#av4").is(':checked')==true)
    { 
      this.userAvatar=String($("#av1").val());
    }
    
    this.socket.emit(this.eventRegister,this.userName);


  }
  ValidarUser(data:any):void
  {
    if(data)
    {
      alert("Existe");
    }
    else
    {
      alert("no existe");
    }
  }
}
