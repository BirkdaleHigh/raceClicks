var socket = io()

var Button = function(id){
  this.id = id || 1
  this.count = 0
}
Button.prototype.press = function(){
  this.count += 1
  socket.emit("button pressed", {"button": this.id})
}

var red = new Button("red")

document.querySelector('#red').addEventListener('click', function(){
  console.log('Red Button')
  red.press()

  return false
})