import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as $ from 'jquery';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header bg-danger">
			<h4 class="modal-title">Mensaje del sistema</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Hola, <span class="text-danger fw-bold">{{ name }}!</span> este nombre de usuario ya existe.</p>
      <p class="text-primary">Inserte otro nombre usuario</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Cerrar</button>
		</div>
	`,
})
export class NgbdModalContent {
	@Input() name:any;

	constructor(public activeModal: NgbActiveModal) {}
}

@Component({
	selector: 'ngbd-modal-welcom',
	standalone: true,
	template: `
		<div class="modal-header bg-info">
			<h4 class="modal-title">Mensaje del sistema</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Bienvenido <span class="text-danger fw-bold">{{ name }}!</span>  a este chat</p>
      <p class="text-dark">Recuerda, respetar a los demás usuarios.</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Aceptar</button>
		</div>
	`,
})
export class NgbdModalwelcom {
	@Input() name:any;

	constructor(public activeModal: NgbActiveModal) {}
}


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
              private routerAc:Router,
              private modalService: NgbModal
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
      //alert (data);
      this.open();
   
    }
    else
    {
      this.openWelcom();
      //alert (data);
     // this.socket.emit(this.eventRegister,this.userName);
      this.routerAc.navigate(['chat/',this.userName, this.userAvatar]);
      
    }
  }
 
  open() {
		const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.name = this.userName;
	}
  openWelcom() {
		const modalRef = this.modalService.open(NgbdModalwelcom);
		modalRef.componentInstance.name = this.userName;
	}
}
