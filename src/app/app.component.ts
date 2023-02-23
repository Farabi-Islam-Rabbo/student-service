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
  dataList: string[] = [];
  disableInput: boolean = true;
  detailsModel: boolean = false;
  existingEntries: any[] = [];
  categoryEntries: any[] = [];
  tableData: any[] = [];
  singleItem: any = {};

  ngOnInit(): void {
    this.initializeForm();
  }

  getData() {
    const getBookmarkData = localStorage.getItem('Grid');
    const parsedArr = JSON.parse(getBookmarkData ? getBookmarkData : '');

    const getCategory = localStorage.getItem('category');
    const parsedArrCate = JSON.parse(getCategory ? getCategory : '');

    //Find The Unique Data
    const uniqueArray = parsedArrCate
      .map((item: any) => item.category)
      .filter(
        (value: any, index: any, self: any) => self.indexOf(value) === index
      );

    //Assign unique value to array for get value in dropdown
    this.dataList = uniqueArray;

    //Result for getting category wise data
    const finalResult = uniqueArray.map((item: any) => {
      return parsedArr.filter((x: any) => x.category === item);
    });
    this.tableData = finalResult;
    console.log("my data====", this.tableData);
  }

  initializeForm() {
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
    this.getData();
  }

  saveData() {
    // form Data save
    let retrievedData = localStorage.getItem('Grid'); //Get bookmark data from locastorage

    if (retrievedData?.length) {
      //check retrive data has value or not
      this.existingEntries = JSON.parse(retrievedData ?? ''); //Checking extisting
      if (this.existingEntries == null) this.existingEntries = []; //If existing item is null
    }
    var formValue = {
      title: this.AddBookmarkForm.value.title,
      url: this.AddBookmarkForm.value.url,
      category: this.AddBookmarkForm.value.category,
      status: this.AddBookmarkForm.value.status
    };

    this.existingEntries.push(formValue);
    localStorage.setItem('Grid', JSON.stringify(this.existingEntries));

    // Category data save
    let categoryData = localStorage.getItem('category');
    if (categoryData?.length) {
      this.categoryEntries = JSON.parse(categoryData ?? ''); //check previous data
      if (this.categoryEntries == null) this.categoryEntries = [];
    }
    var Value = { category: this.AddBookmarkForm.value.category };

    this.categoryEntries.push(Value);
    localStorage.setItem('category', JSON.stringify(this.categoryEntries));
    this.ngOnInit();
    this.getData();
  }

  addCategory() {
    this.disableInput = false;
    this.AddBookmarkForm.value.category =
      this.AddBookmarkForm.value.categoryinput;
  }
  removeBtn() {
    this.disableInput = true;
  }
  detailsBtn(title:any) {
    console.log("title====",this.tableData)
    this.tableData.map((e)=>{
      console.log('heyyyyy=====',e[0].title)
      if(e[0].title == title){
        console.log('ghghghgh======')
        this.singleItem.title = e[0].title
        this.singleItem.url= e[0].url
        this.singleItem.category= e[0].category

      }
    })
    //this.singleItem = this.tableData.find(e=> e[0].title == title)
    console.log("single item====",this.singleItem)
    if(this.detailsModel){
      this.detailsModel = false;
    }else{
    this.detailsModel = true;
    }
  }
}
