import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {param } from 'jquery';
import * as $ from 'jquery';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/services/socket.service';
import { dataMessage, dataMessageImage } from 'src/app/models/user.model';
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
    dataMessImg:dataMessageImage;
     fileURL:any;
     public userMessage:string='';
     
      constructor(
              private rutaActiva: ActivatedRoute,
              private socket:SocketService,
             ){
              this.dataMess=new dataMessage;
              this.dataMessImg=new dataMessageImage;
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
    alert(this.fileURL);
       if (this.fileURL != "") {
      console.log("entro por si fileUrl ")
      if (this.userMessage.startsWith("-private:")) {
        console.log("entro por SI mensaje privado");
        const selectUser = this.userMessage.split(" ")[1];
        const message = this.userMessage.substr(selectUser.length + 10);
        this.dataMessImg.message=this.userMessage.trim();
        this.dataMessImg.image=this.fileURL;
        this.socket.emit1("sendMessagesPrivate", this.dataMessImg);
      } else {
        this.dataMessImg.message=this.userMessage.trim();
        this.dataMessImg.image=this.fileURL;
        this.socket.emit1("sendMessage", this.dataMessImg);
      }
    } else {
      console.log("entro por else");
      console.log(this.userMessage);
      if (this.userMessage.trim() != "") {
        if (this.userMessage.startsWith("-private:")) {
          const selectUser = this.userMessage.split(" ")[1];
          const message = this.userMessage.substr(selectUser.length + 10);
          this.dataMessImg.message=this.userMessage.trim();
          this.dataMessImg.image=this.fileURL;
          this.socket.emit("sendMessagesPrivate", this.dataMessImg);
        } else {
          console.log("entro por else de mensaje privado");
          this.dataMessImg.message=this.userMessage.trim();
          this.dataMessImg.image=this.fileURL;
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

  if (this.fileURL != undefined) {
      
    if (this.userMessage.startsWith("-private:")) {
      const selectUser = this.userMessage.split(" ")[1];
      const message = this.userMessage.substr(selectUser.length + 10);
      this.dataMessImg.message=this.userMessage.trim();
      this.dataMessImg.image=this.fileURL;
      this.socket.emit1("sendMessagesPrivate", this.dataMessImg);
    } else {
      this.dataMessImg.message=this.userMessage.trim();
          this.dataMessImg.image=this.fileURL;
          this.socket.emit("sendMessage",this.dataMessImg);
    }
  } else {
    console.log("entro por else");
    console.log(this.userMessage);
    if (this.userMessage.trim() != "") {
      if (this.userMessage.startsWith("-private:")) {
        const selectUser = this.userMessage.split(" ")[1];
        const message = this.userMessage.substr(selectUser.length + 10);
        this.dataMessImg.message=this.userMessage.trim();
        this.dataMessImg.image=this.fileURL;
        this.socket.emit1("sendMessagesPrivate", this.dataMessImg);
      } else {
        console.log("entro por else de mensaje privado");
        this.dataMessImg.message=this.userMessage.trim();
          this.dataMessImg.image=this.fileURL;
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
