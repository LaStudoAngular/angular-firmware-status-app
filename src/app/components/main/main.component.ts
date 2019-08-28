import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { UpdateService } from '../../@services/update.service';

@Component({
  selector: 'fw-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  bufferValue = 5;
  form: FormGroup;
  progress = {
    show: false,
    value: 0,
    message: '',
  };
  currentIMEI = '';
  localesList = [{ code: 'en' }, { code: 'ru' }];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private updateService: UpdateService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      imei: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(15),
          Validators.minLength(15),
        ],
      ],
    });
    this.route.params.subscribe((params: Params) => {
      if (params.lang) {
        const locale = this.localesList.find((el: { code: string }) => (el.code = params.lang));
        if (locale) {
          this.translate.use(locale.code);
        }
      }
    });
  }

  onClearInput(): void {
    this.form.get('imei').setValue('');
  }

  onSubmit(): void {
    if (this.form.valid) {
      const value: string = this.form.get('imei').value;
      const URL = `${environment.url}?imei=${value}`;

      if (value !== this.currentIMEI) {
        this.currentIMEI = value;
        this.updateService.getUpdate(URL, this.progress);
      }
    }
  }
}
