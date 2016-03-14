var socket = io()

document.querySelector('#button').addEventListener('click', function(){
  console.log('boop.')
  socket.emit("button pressed", {"button": 1})
  return false
})