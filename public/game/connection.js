const socket = io('http://192.168.0.100:3000');

socket.emit('lever start', { chatroom: 'lever' });

socket.on('lever down', function(msg) {
	//Complete action for pulling lever, ex. spin the slots and show the images
	console.log(msg);
	is_lever_down = true;
});

socket.emit('slider start', { chatroom: 'slider' });

socket.on('slider right', function(msg) {
	//Complete action to be carried out when slider is moved to the right
	//this outputs the slider position
	console.log(msg.sliderPos);
	act_on_position(msg.sliderPos);
});

socket.on('slider left', function(msg) {
	//Complete action to be carried out when slider is moved to the left
	//this outputs the slider position
	console.log(msg.sliderPos);
	act_on_position(msg.sliderPos);
});
