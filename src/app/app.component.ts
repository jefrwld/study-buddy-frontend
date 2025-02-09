import { Component, Signal, signal } from '@angular/core';
import { NotedApiService } from './noted-api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';
import {Question} from './types';
import { MarkdownModule } from 'ngx-markdown';
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
  options: boolean = false;
  flashcardHandler: boolean = false;
  markdownHandler: boolean = false;
  response: any = "";
  markdownContent: string = '';
  constructor(private notedApiService: NotedApiService) {}


  showOptions(){
    this.options = !this.options;
  }
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
          this.markdownContent = response.results[0].markdownContent;
          this.response = response;
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


  downloadMarkdown() {
    const markdownContent = this.response.results[0].markdownContent;  // Inhalt aus dem JSON-Response
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Personal_Introduction.md';  // Name der Datei
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
