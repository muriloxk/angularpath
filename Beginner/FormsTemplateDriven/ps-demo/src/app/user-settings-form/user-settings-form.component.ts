import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../Data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../Data/data.service';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes...'
  };

  userSettings: UserSettings = { ...this.originalUserSettings };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('in onSubmit', form.valid);
    this.dataService.postUserSettingsForm(this.userSettings).subscribe(
      result => console.log('success: ', result),
      error => console.log('error: ', error)
    );
  }

  onBlur(form: NgModel) {
    console.log('On blur...', form);
  }
}
