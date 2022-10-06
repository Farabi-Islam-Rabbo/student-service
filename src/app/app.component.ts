import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  AddBookmarkForm!: FormGroup;

  ngOnInit(): void {
    this.initializeFrom();
  }
  initializeFrom() {
    this.AddBookmarkForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      url: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ]),
      category: new FormControl('', [Validators.required]),
    });
  }

  saveData() {
    let formData = this.AddBookmarkForm.value;
    window.localStorage.setItem('gridGrid', JSON.stringify(formData));
  }

  addCategory() {
    let category = this.AddBookmarkForm.value.category;
    localStorage.setItem('category', JSON.stringify(category));
  }
}
