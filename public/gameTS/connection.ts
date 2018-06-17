import { Sina } from './Sina'
import * as io from 'socket.io-client'

const socket = io('http://192.168.0.100:3000')

socket.emit('lever start', { chatroom: 'lever' })

socket.on('lever down', function(msg) {
	//Complete action for pulling lever, ex. spin the slots and show the images
	console.log(msg);
	Sina.dataStore.dispatch('lever pulled', {})
});

socket.emit('slider start', { chatroom: 'slider' });

socket.on('slider right', function({ sliderPos: position }) {
	//Complete action to be carried out when slider is moved to the right
	//this outputs the slider position
	Sina.dataStore.emit('using slider', { position })
});

socket.on('slider left', function({ sliderPos: position }) {
	//Complete action to be carried out when slider is moved to the left
	//this outputs the slider position
  Sina.dataStore.emit('using slider', { position })
});
