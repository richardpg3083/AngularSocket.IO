import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {param } from 'jquery';
import * as $ from 'jquery';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    public nickName:string='';
    public avatar:string='';
    public users:any;
    eventActiveSession="activeSessions";
 constructor(
              private rutaActiva: ActivatedRoute,
              private socket:SocketService,
              ){}
 ngOnInit(): void 
 {
    const user=this.rutaActiva.snapshot.paramMap.get('user');
    if(user)
    {
        this.nickName+=`${user}`;
    }
    const avat=this.rutaActiva.snapshot.paramMap.get('avatar');
    if(avat)
    {
        this.avatar+=`${avat}`;
    }

    $("#userChat").html(this.nickName+"<br /><p class='text-dark fs-6'>en línea</p>");
    $("#UserNick").val(this.nickName);
    $("#imgUserchat").attr("src", "../../../assets/img/"+this.avatar+".png");
   
    this.socket.listen(this.eventActiveSession).subscribe((data)=>{
      $('#usersActive').empty();
this.users=data;
      for (const user in this.users) {
        $('#usersActive').append( `<li>${user}</li>`);
      }
  });
  }
}
