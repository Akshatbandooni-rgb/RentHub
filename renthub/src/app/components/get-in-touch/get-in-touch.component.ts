import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DBService } from '../../services/db.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-get-in-touch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.scss',
})
export class GetInTouchComponent {
  form: FormGroup;
  sending = false;
  sent = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private db: DBService,
    private dialogRef: MatDialogRef<GetInTouchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.sending = true;
    const { apartment, user } = this.data;
    let landlordEmail = 'akshatbandooni6@gmail.com';
    if (apartment?.landlordId) {
      const landlord = this.db.getUserById(apartment.landlordId);
      if (landlord?.email) landlordEmail = landlord.email;
    }
    //Actual Email Sending Logic
    //Currently using setTimeout to simulate email sending
    setTimeout(() => {
      this.sending = false;
      this.sent = true;
      this.dialogRef.close({
        success: true,
        landlordEmail,
        message: this.form.value.message,
      });
    }, 1200);
  }
}
