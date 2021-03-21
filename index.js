const main = document.querySelector('main');
const toggleBtn = document.querySelector('.toggle-btn');
const modal = document.querySelector('.modal');
const speakBtn = document.querySelector('.speak-btn');
const closeBtn = document.querySelector('.close-btn');
const selectBtn = document.querySelector('#voice');
const textArea = document.querySelector('#text');

//data to display
const data = [
	{
		image: 'img/food.jpg',
		info: 'khana khana hai',
	},
	{
		image: 'img/angry.jpg',
		info: 'may ghussa hu',
	},
	{
		image: 'img/play.jpg',
		info: 'mujhe khelne jana hai',
	},
	{
		image: 'img/study.jpg',
		info: 'mujhe padhna hai',
	},
	{
		image: 'img/happy.jpg',
		info: 'may bhaut kush hu',
	},
];

let voices;
//speech message
const message = new SpeechSynthesisUtterance();

//event listeners
//when page loads
window.addEventListener('DOMContentLoaded', () => {
	data.forEach((item) => loadData(item));
});

//toggle modal
toggleBtn.addEventListener('click', () => {
	modal.classList.toggle('active');
});

//close modal
closeBtn.addEventListener('click', () => {
	modal.classList.toggle('active');
});

//speak custom text
speakBtn.addEventListener('click', () => {
	message.text = textArea.value;
	speechSynthesis.speak(message);
});

//choose language
selectBtn.addEventListener('click', () => {
	voices = speechSynthesis.getVoices();

	voices.forEach((voice) => {
		let option = document.createElement('option');
		option.value = voice.name;
		option.innerHTML = `${voice.name} / ${voice.lang}`;
		selectBtn.appendChild(option);
	});
});

selectBtn.addEventListener('change', (e) => {
	changeVoice(e.target.value);
});

// functions

//load data
function loadData(item) {
	let card = document.createElement('div');

	card.addEventListener('click', speakData);
	card.setAttribute('class', 'card');

	card.innerHTML = `<img src="${item.image}"><p>${item.info}</p>`;

	main.appendChild(card);
}
//change voice
function changeVoice(name) {
	message.voice = voices.find((voice) => voice.name === name);
}

//speak data
function speakData(e) {
	let info = e.target.parentElement.children[1].textContent;

	message.text = info;
	console.log(message);
	speechSynthesis.speak(message);
}
