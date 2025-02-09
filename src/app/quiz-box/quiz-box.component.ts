import { Input, Component, Signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-box.component.html',
  styleUrl: './quiz-box.component.css'
})
export class QuizBoxComponent {
  @Input({ required: true }) questions!: Signal<any[]>;
  @Output() quizCompleted = new EventEmitter<boolean>();

  selectedAnswers: any[] = []; 
  visibleQuestion: number = 0;

  checkAnswer(questionIndex: number, selectedAnswer: string) {
    const correctAnswer = this.questions()[questionIndex].correct;

    this.selectedAnswers[questionIndex] = selectedAnswer;

    if (selectedAnswer === correctAnswer) {
      if (this.visibleQuestion < this.questions().length - 1) {
        this.visibleQuestion++;
      } else {
        alert('Quiz Completed! 🎉');
        this.quizCompleted.emit(true); 
      }
    } else {
      alert('Incorrect! Try again.');
    }
  }
}

