import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constants';
import { ProfileDetails } from '../../types/user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    username: '',
    email: '',
  };

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
  });

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.userService.user) {
      const { username, email } = this.userService.user!;
      this.profileDetails = { username, email };

    } else {
      const userDetails = JSON.parse(localStorage.getItem('user')!);
      this.profileDetails = { username: userDetails.username, email: userDetails.email }
    }


    this.form.setValue({
      username: this.profileDetails.username,
      email: this.profileDetails.email
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;

    const { username, email } = this.profileDetails;

    this.userService.updateProfile(username, email).subscribe(() => {
      localStorage.setItem('user', JSON.stringify({ email, username }))
      this.toggleEditMode();
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }
}
