import { Component, Signal, signal } from '@angular/core';
import { NotedApiService } from './noted-api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';

import {Question} from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, QuizBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  selectedFiles: File[] = [];
  quizzQuestions = signal<any[]>([]);
  showSpinner: boolean = false;
  constructor(private notedApiService: NotedApiService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }
  uploadStatus: boolean = false;
  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.selectedFiles.length > 0) {
      this.showSpinner = true;
      this.notedApiService.uploadFiles(this.selectedFiles).subscribe(
        response => {
          console.log('Upload erfolgreich:', response);  
          this.uploadStatus = true;
          this.displayUploadResponseMessage(this.uploadStatus);
          this.quizzQuestions.set(response.questions);
          this.showSpinner = false;
          console.log(response.questions);
        },
        error => {
          console.error('Upload fehlgeschlagen:', error);
          this.uploadStatus = false;
          this.displayUploadResponseMessage(this.uploadStatus);
        }
      );
    }
  }
  responseMessage = "";
  displayMessage: boolean = false;
  displayUploadResponseMessage(uploadStatus:boolean): void{
    this.displayMessage = true;
    if(uploadStatus = true){
      this.responseMessage = 'sucessfully generated file';
    } else {
      this.responseMessage = 'error: please try later again'
    }
    setTimeout(() => {
      this.displayMessage = false;
    }, 3000);
  }
}
