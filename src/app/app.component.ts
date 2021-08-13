import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator'
import { FormArray } from '@angular/forms';
import { Users } from './in-memory-data.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: 'XlsRead' | undefined;
  file!: File;
  arrayBuffer: any;
  data:[][] | undefined;
  filelist: any;
  submitted: boolean =false;




  get alternateEmails(): any {
    return this.RegistrationForm.get('alternateEmails') as FormArray;
  }
  get f() { return this.RegistrationForm.controls; }
  addAlternateEmails() {
    this.alternateEmails.push(this.fb.control(''));
  }
  get addresses() {
    return this.RegistrationForm.get("alternateEmails") as FormArray;
  }








  
  removeAlternateEmails(k: number) {
    this.addresses.removeAt(k);
  }
  RegistrationForm!: FormGroup;
  user: any;
  constructor(private fb: FormBuilder, private users: Users) {
    this.user=this.users.getUsers();

  }
  ngOnInit() {
this.users.getUsers().subscribe(data=>{
  this.user=data;
})



    this.RegistrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      subscribe: [false],
      password: ['', [Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30})'), Validators.required]],
      confirmPassword: [''],
      city: ['', [Validators.required, Validators.pattern("^[A-Z][a-z][A-Za-z]*$")]],
      state: ['', [Validators.required, Validators.pattern("^[A-Z][a-z][A-Za-z]*$")]],
      postalCode: ['', [Validators.required, Validators.pattern("[0-9]")]],
      fil: ['', [Validators.required]],
      button: [''],
      alternateEmails: this.fb.array([])
    }, { Validator: PasswordValidator });
    this.RegistrationForm.get('subscribe')?.valueChanges.subscribe(checkedValue => {
      const email = this.RegistrationForm.get('email');
      this.RegistrationForm.statusChanges.subscribe(data => {
        console.log("Form status");
        console.log(data);
      })
      if (checkedValue()) {
        email?.setValidators(Validators.required);
      }
      else
        email?.clearValidators();
      email?.updateValueAndValidity();
    })
  }




  setData() {
    this.RegistrationForm.setValue({
      userName: 'nik',
      password: "rathore",
      confirmPassword: "rathore",
      address: {
        city: "bhopal",
        state: "mp",
        postalCode: "34353"
      }

    })
  }
  checkedValue(_checkedValue: any) {
    throw new Error('Function not implemented.');
  }
  resetForm() {

  }

  onsubmit() {
    this.submitted = true;
    if (this.RegistrationForm.invalid) {

    }
  }
  /*
  onChange(event) {
    this.file = event.target.files[0];
  }
  
  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {
  
                // Short link via api response
                this.shortLink = event.link;
  
                this.loading = false; // Flag variable 
            }
        }
  
  
  
  /*
  
  
  addfile($event)     
    {    
    this.file= event.target.files[0];     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (_e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];    
        console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
          var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
              this.filelist = [];    
              console.log(this.filelist)    
      
    }    
  } 
  
  
  
  */
  
  
  onFileChange(evt:any){
    const target: DataTransfer=<DataTransfer>(evt.target);
    if(target.files.length!=1) throw new Error("cannot use multiple files");
    const reader: FileReader=new FileReader();
    reader.onload=(e:any)=>
    {
      const bstr: string =e.target.result;
      const wb: XLSX.WorkBook=XLSX.read(bstr, {type:'binary'});
      const wsname: string =wb.SheetNames[0];
      const ws: XLSX.WorkSheet=wb.Sheets[wsname];
      this.data=(XLSX.utils.sheet_to_json(ws,{header:1}));
      
    }
    reader.readAsBinaryString(target.files[0]);



  }
  
  

}