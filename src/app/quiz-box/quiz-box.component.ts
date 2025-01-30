import { Input, Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-quiz-box',
  imports: [CommonModule],
  templateUrl: './quiz-box.component.html',
  styleUrl: './quiz-box.component.css'
})


export class QuizBoxComponent {
  @Input({ required: true }) questions!: Signal<any[]>;

  selectedAnswers: any[] = [];  // Speichert die Antworten des Benutzers

  // Vergleiche die Antworten und gib Feedback
  checkAnswer(questionIndex: number, selectedAnswer: string) {
    const correctAnswer = this.questions()[questionIndex].correct;
    if (selectedAnswer === correctAnswer) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
  }
}
