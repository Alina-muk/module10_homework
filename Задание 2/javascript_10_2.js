const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
	alert (`Ширина - ${screenWidth}, высота - ${screenHeight}`)
	
});