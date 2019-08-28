import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  checkStatus = null;
  timeInterval = 5000;

  constructor(private http: HttpClient) {}

  getUpdate(URL: string, progress: { show: boolean; value: number; message: string }): void {
    this.http.get(URL, { observe: 'response' }).subscribe(
      (response: HttpResponse<{ status: number }>) => {
        if (response.status === 200 && response.body.status < 1) {
          progress.show = true;
          progress.value = response.body.status * 100;
          progress.message = 'UPDATE';
          this.checkStatus = interval(this.timeInterval).subscribe(() => {
            this.http
              .get(URL, { observe: 'response' })
              .subscribe((current: HttpResponse<{ status: number }>) => {
                if (current.body.status < 1) {
                  progress.value = current.body.status * 100;
                } else {
                  progress.show = false;
                  progress.value = 0;
                  progress.message = 'NO_UPDATE';
                  this.checkStatus.unsubscribe();
                }
              });
          });
        }
      },
      error => {
        progress.show = false;
        if (this.checkStatus != null) {
          this.checkStatus.unsubscribe();
        }
        if (error.status === 422) {
          progress.message = 'NOT_FOUND';
        }
        if (error.status === 500) {
          progress.message = 'SERVER_ERROR';
        }
      },
    );
  }
}
