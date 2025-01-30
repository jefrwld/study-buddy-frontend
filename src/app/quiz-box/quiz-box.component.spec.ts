import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBoxComponent } from './quiz-box.component';

describe('QuizBoxComponent', () => {
  let component: QuizBoxComponent;
  let fixture: ComponentFixture<QuizBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
