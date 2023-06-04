import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as $ from 'jquery';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  closeResult = '';

  userName:string='';
  userAvatar:string='';
  formModal:any;

  eventRegister="register";
  eventUserExists="userExists";
  eventActiveSession="";
  constructor(private routerActived:ActivatedRoute,
              private socket:SocketService, 
              private routerAc:Router
            ){

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
      alert (data);
      //this.open();
   
    }
    else
    {
      alert (data);
     // this.socket.emit(this.eventRegister,this.userName);
      this.routerAc.navigate(['chat/',this.userName, this.userAvatar]);
      
    }
  }
 
  
}
