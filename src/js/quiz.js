import { Question } from './question';

class Quiz {
    constructor(questions){
        this.turns = 0;
        this.mistakes = 0;
        this.questions = [];
        this.createQuestions(questions);
        this.getCurrentQuestion();
    }
    createQuestions(questions){
        questions.forEach(question => this.questions.push(new Question(question)));
    }
    
    getCurrentQuestion(){
        this.currentQuestion = this.questions[0];    
    }
    
    isEnded(){
        return !this.questions.length;
    }
    
    moveToBack(){
        this.questions.push(this.questions.shift());
    }
    
    removeQuestion(){
        this.questions.shift();
    }
    
    guess(pickedAnswerIndex){
     if(this.currentQuestion.isCorrect(pickedAnswerIndex)){
            this.removeQuestion();
        } else {
            this.mistakes += 1;
            this.moveToBack();
        }
      this.turns += 1;
      this.getCurrentQuestion();
    }
}

export { Quiz }