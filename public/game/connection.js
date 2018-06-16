var socket = io('http://192.168.0.100:3000');
socket.emit('lever start', {chatroom: 'lever'});
socket.on('lever down', function(msg){
    //Complete action for pulling lever, ex. spin the slots and show the images
    console.log(msg);
    is_lever_down = true;

});

socket.emit('slider start', {chatroom: 'slider'});
socket.on('slider right', function(msg){
   //Complete action to be carried out when slider is moved to the right
   //this outputs the slider position
   console.log(msg.sliderPos);
   act_on_position(msg.sliderPos);

});
socket.on('slider left', function(msg){
   //Complete action to be carried out when slider is moved to the left
   //this outputs the slider position
   console.log(msg.sliderPos);
   act_on_position(msg.sliderPos);
});
    // function myFunction(event) {
    //     console.log("hello");
    //     var x = event.which || event.keyCode;
    //     if (x===65){
    //
    //     //leftmost foot pedal pressed
    //     //do something accordingly
    //
    //     } else if (x=== 83){
    //     //middle foot pedal pressed
    //     //do something accordingly
    //
    //     } else if (x=== 68){
    //     //rightmost foot pedal pressed
    //     //do something accordingly
    //
    //     }
    //
    // }

// socket.emit('buttons start', {chatroom: 'buttons'});
// socket.on('button load', function(msg){
//   console.log(msg.buttonNo);
//   if (msg.buttonNo === '1'){
//     //0 corresponds to first button from right
//     //do something here (ex. move cursor up on the screen, play a video)
//     console.log("1");
//   }
//   else if (msg.buttonNo === '2'){
//     //1 corresponds to second button from right
//     console.log("2");
//     //do something else here
//   }
//   else if (msg.buttonNo === '3'){
//     //2 corresponds to third button from right
//     console.log("3");
//   }
//   //do another thing here
//   else if (msg.buttonNo === '4'){
//     //3 corresponds to forth button from right
//     console.log("4");
//     //do more things here
//   }
//   else if (msg.buttonNo === '5'){
//     //4 corresponds to fifth button from right
//     console.log("5");
//     //do more things here
//   }
//
// });
// socket.on('button hit', function(msg){
//     //the flashing button was hit, yeeeeeaah
//     //do something here
//     console,log(msg.buttonNo);
// });
