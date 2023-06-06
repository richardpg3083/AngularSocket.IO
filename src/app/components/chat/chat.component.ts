import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {param } from 'jquery';
import * as $ from 'jquery';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/services/socket.service';
import { dataMessage } from 'src/app/models/user.model';
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
    eventSendMessage="sendMessage";
    dataMess:dataMessage;
     fileURL:any;
     public userMessage:string='';
     public userFile:any='';
      constructor(
              private rutaActiva: ActivatedRoute,
              private socket:SocketService,
             ){
              this.dataMess=new dataMessage;
             
             }
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

this.socket.listen1(this.eventSendMessage).subscribe(data=>{
  this.dataMess  = data as dataMessage;
  let printMessages:any=$("#messages");
  if(this.dataMess.user==$('#UserNick').val())
  {
    $("#messages").append(`<div class="message my_message "><p>${this.dataMess.message}<br /><span>${this.dataMess.user}</span></p></div>`);
    if(this.dataMess.image!==undefined )
    {
      const imagen = document.createElement("img");
      imagen.src = this.dataMess.image;
      $("#messages").append(imagen);
    }
    
    printMessages.scrollTop = printMessages.scrollHeight;
  }
  else
  {
    $("#messages").append(`<div class="message frnd_message "><p>${this.dataMess.message}<br /><span>${this.dataMess.user}</span></p></div>`);
    if(this.dataMess.image!==undefined )
    {
      const imagen = document.createElement("img");
      imagen.src = this.dataMess.image;
      $("#messages").append(imagen);
    }
    
    printMessages.scrollTop = printMessages.scrollHeight;
  }

});

  }

  SendMessage()
  {
    
       if (this.fileURL != undefined) {
      
      if (this.userMessage.startsWith("-private:")) {
        const selectUser = this.userMessage.split(" ")[1];
        const message = this.userMessage.substr(selectUser.length + 10);
        this.socket.emit("sendMessagesPrivate", {
          message,
          image: this.fileURL,
          selectUser,
        });
      } else {
        this.socket.emit("sendMessage", {
          message: this.userMessage.trim(),
          image: this.fileURL,
        });
      }
    } else {
      console.log("entro por else");
      console.log(this.userMessage);
      if (this.userMessage.trim() != "") {
        if (this.userMessage.startsWith("-private:")) {
          const selectUser = this.userMessage.split(" ")[1];
          const message = this.userMessage.substr(selectUser.length + 10);
          this.socket.emit("sendMessagesPrivate", {
            message,
            image: this.fileURL,
            selectUser,
          });
        } else {
          console.log("entro por else de mensaje privado");
          this.socket.emit("sendMessage", {
            message: this.userMessage.trim(),
            image: this.fileURL,
          });
        }
      }
    }
  
    this.userMessage = "";
    this.fileURL = undefined;
    let printMessages:any=$("#messages");
    printMessages.scrollTop = printMessages.scrollHeight;
  }

}
