class Question {
    constructor(question){
        this.question = question.question;
        this.answers = question.answers;
    }
    
    isCorrect(answerIndex){
        return this.answers[answerIndex].correct;
    }    
}

export { Question }