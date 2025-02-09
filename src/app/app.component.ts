import { Component, Signal, signal } from '@angular/core';
import { NotedApiService } from './noted-api.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizBoxComponent } from './quiz-box/quiz-box.component';
import { FormsModule } from '@angular/forms'; 
import {UploadResponse} from './response-interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, QuizBoxComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  selectedFiles: File[] = [];
  quizzQuestions = signal<any[]>([]);
  showQuizQuestions: boolean = false;
  showSpinner: boolean = false;
  showMarkdown: boolean = false;
  options: boolean = false;
  response: any = "";
  markdownContent: string = '';  
  editableMarkdown: string = '';
  quizzFinished: boolean = false;
  slideValue: number = 3;

  constructor(private readonly notedApiService: NotedApiService) {}


  showOptions(){
    this.options = !this.options;
  }

  showQuiz(){
    this.showQuizQuestions = !this.showQuizQuestions;
  }

  showMarkdownEditor(){
    this.showMarkdown = !this.showMarkdown;
  }

  onQuizCompleted(completed: boolean){
    this.quizzFinished = completed;
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
    if (this.selectedFiles.length === 0) return;
  
    this.startUpload();
  }
  
  private startUpload(): void {
    this.showSpinner = true;
    
    this.notedApiService.uploadFiles(this.selectedFiles, this.slideValue).subscribe(
      response => this.handleUploadSuccess(response),
      error => this.handleUploadError(error)
    );
  }
  
  private handleUploadSuccess(response: UploadResponse): void {
    this.markdownContent = response.results[0].markdownContent;
    this.editableMarkdown = this.markdownContent;
    this.response = response;
    this.uploadStatus = true;
    this.displayUploadResponseMessage(true);
    this.quizzQuestions.set(Array.isArray(response.questions) ? response.questions : Object.values(response.questions));
    this.showSpinner = false;
  }
  
  private handleUploadError(error: any): void {
    this.uploadStatus = false;
    this.displayUploadResponseMessage(false);
  }

  
  responseMessage = "";
  displayMessage: boolean = false;
  displayUploadResponseMessage(uploadStatus:boolean): void{
    this.displayMessage = true;
    if(uploadStatus){
      this.responseMessage = 'sucessfully generated file';
    } else {
      this.responseMessage = 'error: please try later again'
    }
    setTimeout(() => {
      this.displayMessage = false;
    }, 3000);
  }


  downloadEditedMarkdown(): void {
    const blob = new Blob([this.editableMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Edited_Markdown.md';
    a.click();
    URL.revokeObjectURL(url);
  }
}
