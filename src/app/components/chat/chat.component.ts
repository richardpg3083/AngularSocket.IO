import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {param } from 'jquery';
import * as $ from 'jquery';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/services/socket.service';
import { dataMessage, dataMessageImage,dataMessagePriv,dataMessageImagePrivate } from 'src/app/models/user.model';
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
 
    dataMessImg:dataMessageImage;
   
     dataMessImgPriv:dataMessageImagePrivate;
     fileURL:any;
     public userMessage:string='';
     
      constructor(
              private rutaActiva: ActivatedRoute,
              private socket:SocketService,
             ){
              
              this.dataMessImg=new dataMessageImage;
              this.dataMessImgPriv=new dataMessageImagePrivate;
             
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

    $("#userChat").html(this.nickName+"<br /><p class='text-light fs-6'>en línea</p>");
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
  this.dataMessImg  = data as dataMessage;
  let printMessages:any=$("#messages");
  if(this.dataMessImg.user==$('#UserNick').val())
  {
    $("#messages").append(`<div class="message my_message "><p>${this.dataMessImg.message}<br /><span>${this.dataMessImg.user}</span></p></div>`);
    if(this.dataMessImg.image!==undefined )
    {
      const imagen = document.createElement("img");
      imagen.src = this.dataMessImg.image;
      $("#messages").append(imagen);
    }
    
    printMessages.scrollTop = printMessages.scrollHeight;
  }
  else
  {
    $("#messages").append(`<div class="message frnd_message "><p>${this.dataMessImg.message}<br /><span>${this.dataMessImg.user}</span></p></div>`);
    if(this.dataMessImg.image!==undefined )
    {
      const imagen = document.createElement("img");
      imagen.src = this.dataMessImg.image;
      $("#messages").append(imagen);
    }
    
    printMessages.scrollTop = printMessages.scrollHeight;
  }

});

  }

  SendMessage()
  {
   
       if (this.fileURL != "") {
     
      if (this.userMessage.startsWith("-private:")) {
        
        const selectUser = this.userMessage.split(" ")[1];
        const message = this.userMessage.substr(selectUser.length + 10);
        this.dataMessImgPriv.message=this.userMessage.trim();
        this.dataMessImgPriv.image=this.fileURL;
        this.dataMessImgPriv.userPriv=selectUser;
        this.dataMessImgPriv.user=this.nickName;
        this.socket.emit1("sendMessagesPrivate", this.dataMessImgPriv);
      } else {
        this.dataMessImg.message=this.userMessage.trim();
        this.dataMessImg.image=this.fileURL;
        this.dataMessImg.user=this.nickName;
        this.socket.emit1("sendMessage", this.dataMessImg);
      }
    } else {
     
      if (this.userMessage.trim() != "") {
        if (this.userMessage.startsWith("-private:")) {
          const selectUser = this.userMessage.split(" ")[1];
          const message = this.userMessage.substr(selectUser.length + 10);
          this.dataMessImgPriv.message=this.userMessage.trim();
          this.dataMessImgPriv.image=this.fileURL;
          this.dataMessImgPriv.userPriv=selectUser;
          this.dataMessImgPriv.user=this.nickName;
          this.socket.emit("sendMessagesPrivate", this.dataMessImgPriv);
        } else {
          
          this.dataMessImg.message=this.userMessage.trim();
          this.dataMessImg.image=this.fileURL;
          this.dataMessImg.user=this.nickName;
          this.socket.emit("sendMessage",this.dataMessImg);
        }
      }
    }
  
    this.userMessage = "";
    this.fileURL = undefined;
    let printMessages:any=$("#messages");
    printMessages.scrollTop = printMessages.scrollHeight;
  }
KeyPress()
{ 
  if (this.fileURL != "") {
     
  if (this.userMessage.startsWith("-private:")) {
    
    const selectUser = this.userMessage.split(" ")[1];
    const message = this.userMessage.substr(selectUser.length + 10);
    this.dataMessImgPriv.message=this.userMessage.trim();
    this.dataMessImgPriv.image=this.fileURL;
    this.dataMessImgPriv.userPriv=selectUser;
    this.dataMessImgPriv.user=this.nickName;
    this.socket.emit1("sendMessagesPrivate", this.dataMessImgPriv);
  } else {
    this.dataMessImg.message=this.userMessage.trim();
    this.dataMessImg.image=this.fileURL;
    this.dataMessImg.user=this.nickName;
    this.socket.emit1("sendMessage", this.dataMessImg);
  }
} else {
 
  if (this.userMessage.trim() != "") {
    if (this.userMessage.startsWith("-private:")) {
      const selectUser = this.userMessage.split(" ")[1];
      const message = this.userMessage.substr(selectUser.length + 10);
      this.dataMessImgPriv.message=this.userMessage.trim();
      this.dataMessImgPriv.image=this.fileURL;
      this.dataMessImgPriv.userPriv=selectUser;
      this.dataMessImgPriv.user=this.nickName;
      this.socket.emit("sendMessagesPrivate", this.dataMessImgPriv);
    } else {
      
      this.dataMessImg.message=this.userMessage.trim();
      this.dataMessImg.image=this.fileURL;
      this.dataMessImg.user=this.nickName;
      this.socket.emit("sendMessage",this.dataMessImg);
    }
  }
}

this.userMessage = "";
this.fileURL = undefined;
let printMessages:any=$("#messages");
printMessages.scrollTop = printMessages.scrollHeight;
 

}

btnSendFile(element:any)
{
  element.click();
  
}
FileChange(event:any)
{
  const file:File = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    this.fileURL = reader.result ;
    
  };
  reader.readAsDataURL(file);
 
  this.fileURL
    ? alert("Error al adjuntar, seleccione nuevamente.")
    : alert("Foto adjunta, lista para enviar.");
}

}
