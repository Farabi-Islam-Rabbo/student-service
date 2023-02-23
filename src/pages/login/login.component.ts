import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password:any;
  AddBookmarkForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    const sign_in_btn= document.querySelector("#sign-in-btn");
    const sign_up_btn= document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn?.addEventListener("click", () => {
      container?.classList.add("sign-up-mode");
    });
    
    sign_in_btn?.addEventListener("click", () => {
      container?.classList.add("sign-up-mode");
    });

}

}



