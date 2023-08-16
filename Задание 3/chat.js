const wsUrl = "wss://echo-ws-service.herokuapp.com";

const input = document.querySelector('.input');
const btnMess = document.querySelector('.btn-mess');
const btnGeo = document.querySelector('.btn-geo');
const userMessages = document.querySelector('.user-messages');
const wrapperChat =  document.querySelector('.wrapper-chat');


function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	userMessages.innerHTML += element;
	wrapperChat.scrollTop = wrapperChat.scrollHeight;
  }


 let websocket = new WebSocket(wsUrl); 
	websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
	websocket.onmessage = function(evt) {
		writeToScreen(`Server: ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`Server: ${evt.data}`, 'flex-start');
	};
  

  btnMess.addEventListener('click', () => {
	let message = input.value;
	websocket.send(message);
	writeToScreen(`You: ${message}`);
	input.value = ''

  });

  

const error = () => {
	let textErr0r = 'Невозможно получить ваше местоположение';
	writeToScreen(textErr0r);
  };
  
  
  const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Геолокация</a>`);
  };
  
  btnGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  console.log('Geolocation не поддерживается вашим браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(success, error);
	}
  });
