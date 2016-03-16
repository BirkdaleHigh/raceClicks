var socket = io()

var Button = function(id){
  var self = this

  self.id = id || 1
  self.count = 0
  self.el = document.getElementById(id)
  self.el.onclick = function(){ self.press() }
  self.progress = document.querySelector("progress." + this.id)
}
Button.prototype = {
  press: function(){
    this.count += 1

    if(this.progress.value >= this.progress.max){
      this.reset()
    }
    this.progress.value = this.count

    socket.emit("button pressed", {"button": this.id, "count": this.count})
  },
  reset: function(){
    this.count = 0
    this.progress.value = 0
  }
}

var red = new Button("red")
var blue = new Button("blue")
