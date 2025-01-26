import { Component } from '@angular/core';
import { NotedApiService } from './noted-api.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  selectedFiles: File[] = [];
  constructor(private notedApiService: NotedApiService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.selectedFiles.length > 0) {
      this.notedApiService.uploadFiles(this.selectedFiles).subscribe(
        response => {
          console.log('Upload erfolgreich:', response); 
        },
        error => {
          console.error('Upload fehlgeschlagen:', error);
        }
      );
    }
  }
}
