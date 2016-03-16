var socket = io()

var Button = function(id){
  var self = this

  self.id = id || 1
  self.count = 0
  document.getElementById(id).onclick = function(){ self.press() }
}
Button.prototype.press = function(){
  this.count += 1
  socket.emit("button pressed", {"button": this.id, "count": this.count})
}

var red = new Button("red")
var blue = new Button("blue")