import { Quiz } from './quiz';

(function() {
	const endpoint = 'https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json';

	const cardContent = document.querySelector('#cardContent');
	const progressBars = document.querySelectorAll('.jsProgressBar');
	const questionsBar = document.querySelector('#questionsBar');
	const questionsLabel = document.querySelector('#questionsLabel');
	const mistakesBar = document.querySelector('#mistakesBar');
	const  mistakesLabel = document.querySelector('#mistakesLabel');
	const btnStart = document.querySelector('#btnStart');
	const btnAnswers = document.querySelectorAll('.jsBtnAnswer');

	let initialQuestionsLength = 0;
    let quiz = new Object(); 

	function showAnswers(){
		[...btnAnswers].forEach(btn => {
			const val = parseInt(btn.dataset.value);
			btn.innerHTML = quiz.currentQuestion.answers[val].answer;
		});
	}

	function showProgress(){
		questionsBar.style.width = `${100*(quiz.questions.length/initialQuestionsLength)}%`;
		questionsLabel.innerHTML = `${quiz.questions.length} questions left`;
		mistakesBar.style.width = `${(quiz.mistakes * 2.5)}%`;
		mistakesLabel.innerHTML = `${quiz.mistakes} mistakes made`;
	}

	function submitAnswerEvents(){
		[...btnAnswers].forEach(btn => {
			btn.addEventListener('click',() => {
				const val = parseInt(btn.dataset.value);
				quiz.guess(val);
				play();
			});
		});
	}

	function renderQuizView(){
		const elems = [...btnAnswers, ...progressBars];
		[...elems].forEach(btn => btn.classList.remove('hidden'));
    
		initialQuestionsLength = quiz.questions.length;
    
		btnStart.classList.add('hidden');
		cardContent.classList.add('content-box__content--question');
	}

	function renderEndQuizView(){    
		[...btnAnswers].forEach(btn => btn.classList.add('hidden'));
    
		showResult();
    
		btnStart.classList.remove('hidden');
		btnStart.innerHTML = 'Try again!';
    
		btnStart.removeEventListener('click', start);
		btnStart.addEventListener('click', () => {
			location.reload();
		});
    
		cardContent.classList.remove('content-box__content--question');
		[...progressBars].forEach(bar => bar.classList.add('hidden'));
	}

	function showResult(){
		const text = !quiz.mistakes ? 'Wow! Perfect score!' : 
        (quiz.mistakes < 0.5 * initialQuestionsLength) ? 'Pretty good! I\'m sure you will nail the next round!': 'Oh. Don\'t worry. Next time will be better for sure!';
        
		cardContent.innerHTML = `<p> ${text} </p><h3> Summary </h3><p> You've answered <span class="sg-text sg-text--emphasised"> ${initialQuestionsLength} questions </span> in <span class="sg-text sg-text--emphasised"> ${quiz.turns} whops</span>.</p><p>That means, on the way you've made <span class="sg-text sg-text--peach sg-text--emphasised">${quiz.mistakes} mistakes.</span></p>`;
	}

	function showCard(){
    // show question    
		cardContent.innerHTML = quiz.currentQuestion.question;
    // show quiz progress
		showProgress();
    // show answers
		showAnswers();
	}

	function play(){
		if(quiz.isEnded()){
			renderEndQuizView();
		} else {
			showCard();
		}
	}

	function start(){
		renderQuizView();
		submitAnswerEvents();
		play();
	}

	fetch(endpoint)
    .then(resp => resp.json())
    .then(data => {
    
    quiz = new Quiz(data);    
	btnStart.addEventListener('click',start);
    });
    
})();
