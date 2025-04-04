import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, RouterModule, TranslatePipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: "",
    privacypolicy: false,
  }

  mailTest = false;

  submissionStatus: 'success' | 'error' | null = null;
  errorMessage = '';

  post = {
    endPoint: 'https://ha-dao.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post<any>(this.post.endPoint, this.post.body(this.contactData), this.post.options)
        .subscribe({
          next: (response) => {
            this.submissionStatus = 'success';
            ngForm.resetForm();
            this.checkboxWasCheckedBefore = false;
          },
          error: (error) => {
            console.error(error);
            this.submissionStatus = 'error';
            this.errorMessage = error.message || 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
            this.checkboxWasCheckedBefore = false;
            ngForm.resetForm();
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      this.submissionStatus = 'success';
      ngForm.resetForm();
      this.checkboxWasCheckedBefore = false;
    }
  }

  closePopup() {
    this.submissionStatus = null;
    this.errorMessage = '';
  }

  checkboxWasCheckedBefore = false;

  checkboxChanged() {
    if (this.contactData.privacypolicy) {
      this.checkboxWasCheckedBefore = true;
    }
  }
}
