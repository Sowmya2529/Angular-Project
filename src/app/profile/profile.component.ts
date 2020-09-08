import { Component, OnInit } from '@angular/core';
import { ProfileModel } from './../models/ProfileModel';
import { UploadService } from './../services/upload.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  ProfileImage:any
  userId = localStorage.getItem('userId')
  img: string | ArrayBuffer;
  profileDetails:any;
  firstName:any;
  lastName:any;
  email:any;
  companyname: any;
  imageChangedEvent:any;
  selectedProfileFile: File = null;
  profileImage: any = '';
  editProfile: boolean = false;
  profile: any;
  fileToUpload: File = null;
  metaData: string;
  cropped_blob: Blob;
  phone:any;
  lastNameInitial: any;
  firstNameInitial: any;
 

  constructor(private upload: UploadService,private profileService:ProfileService) {
    this.companyname = localStorage.getItem('companyName');
    this.profile = {
      position: 'Assitant Manager',
    };
  }

  ngOnInit(): void {
    this.getProfileDetails();
    this.getUserById();
    document.querySelector('body').classList.remove('selector');
    this.metaData = 'Profile';
  }

    getFormData (files: FileList) {
        this.selectedProfileFile = files.item(0);

        if (this.selectedProfileFile) {
          this.UploadProfileImage();
            // const uploadForm = new FormData();
            // uploadForm.append('profilePicture', this.selectedProfileFile);
            // this.upload.uploadImage(uploadForm);
        }
    }

    getUserById(){
      this.upload.getUserById(this.userId).subscribe(
        result =>{
          console.log("Get UserBy Id",result);
          if(result.imageUrl){
            this.ProfileImage = result.imageUrl;
          }
          else{
            this.firstNameInitial = result.firstName;
            this.lastNameInitial = result.lastName
          }
        
        },
        error =>{
          console.log("Get UserById API  error",error)
        }
      )
    }

    UploadProfileImage(){
      const uploadForm = new FormData();
      uploadForm.append('profilePicture', this.selectedProfileFile);
      this.upload.uploadImage(uploadForm).subscribe(
          (result) => {
            console.log("Profile Upload API",result);
            this.updateUser(result)         
          },
          (err) =>  console.log("Profile Upload error",err)
        );
      
    }

    updateUser(result:any){
      let data = {
        imageUrl:result.imageUrl
      }
      console.log(data)
      this.upload.UpdateUser(this.userId,data).subscribe(
        result =>{
          console.log("Update User API for image",result);
          if(result.imageUrl){
            this.ProfileImage = result.imageUrl
          }
         
        },
        error=>{
          console.log("Upload User API error",error)
        }
      )
    }


  setProfileEdit = (status = false) => {
    this.editProfile = status;
  }

  getProfileDetails(){
    this.profileService.getProfileDetails(this.userId).subscribe(
      result =>{
        this.profileDetails = result;
        this.firstName =   this.profileDetails.firstName;
        this.lastName = this.profileDetails.lastName;
        this.email = this.profileDetails.email
        this.phone = this.profileDetails.phoneNumber
      },
      error =>{
        console.log("Profile details API error",error);
      }
    )
  }
}
