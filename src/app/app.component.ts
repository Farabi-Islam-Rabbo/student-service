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
  categoryData: string[] = [];
  dataList: any[] = [];
  disableInput: boolean = true;
  bookMarkData: any[] = [];

  ngOnInit(): void {
    this.initializeFrom();
    this.getCategory();
    this.getBookmarkData();
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
      category: new FormControl('0', [Validators.required]),
      categoryinput: new FormControl(''),
    });
  }

  saveData() {
    // form Data save
    var formValue = [];
    let retrievedData = localStorage.getItem('Grid');
    console.log('getItem', JSON.stringify(retrievedData));

    if (retrievedData) {
      let saveData = JSON.parse(retrievedData ?? '');
      formValue.push(saveData);
      let formData = this.AddBookmarkForm.value;
      formValue.push(formData);
      localStorage.setItem('Grid', JSON.stringify(formValue));
      alert('Bookmark Saved!');
      this.ngOnInit();
    } else {
      localStorage.setItem('Grid', JSON.stringify(this.AddBookmarkForm.value));
      alert('Bookmark Saved!');
      this.ngOnInit();
    }

    // Category data save
    if (!this.disableInput) {
      let category = this.AddBookmarkForm.value.categoryinput;
      this.categoryData.push(category);
      localStorage.setItem('category', JSON.stringify(this.categoryData));
    } else {
      let category = this.AddBookmarkForm.value.category;
      this.categoryData.push(category);
      localStorage.setItem('category', JSON.stringify(this.categoryData));
    }
  }

  addCategory() {
    this.disableInput = false;
    this.AddBookmarkForm.value.category =
      this.AddBookmarkForm.value.categoryinput;
  }

  getCategory() {
    let retrievedData = localStorage.getItem('category');
    let categories = JSON.parse(retrievedData ?? '');
    this.dataList = categories;
    console.log('categories', categories);
  }

  getBookmarkData() {
    let retrievedData = localStorage.getItem('Grid');
    let bookMarkData = JSON.parse(retrievedData ?? '');
    this.bookMarkData = bookMarkData;
    console.log('Bookmark data', bookMarkData);
  }
}
