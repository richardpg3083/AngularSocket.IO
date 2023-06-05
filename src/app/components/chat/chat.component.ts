import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {param } from 'jquery';
import * as $ from 'jquery';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    public nickName:string='';
    public avatar:string='';
    
 constructor(private rutaActiva: ActivatedRoute){

 }
 ngOnInit(): void {
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
 }
}
