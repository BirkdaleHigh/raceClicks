var socket = io()

var Button = function(id){
  var self = this

  self.id = id || 1
  self.count = 0
  self.el = document.getElementById(id)
  self.el.onclick = function(){ self.press() }
  self.progress = document.querySelector("progress." + self.id)
}
Button.prototype = {
  press: function(){
    this.count += 1

    if(this.progress.value >= this.progress.max){
      this.reset()
    }
    socket.emit("button pressed", {"button": this.id, "count": this.count})
    this.update()
  },
  reset: function(){
    this.count = 0
    this.progress.value = 0
  },
  update: function(){
    this.progress.value = this.count
  }
}

socket.on("button pressed", function(evt){
  switch(evt.button){
    case 'red':
      red.count = evt.count
      red.update()
    break
    case 'blue':
      blue.count = evt.count
      blue.update()
    break;
  }
})

var form = document.getElementById('newuser')

form.addEventListener("click", function(e){
  e.preventDefault()
  var user = form.querySelector('#username').value
  console.log(user)
  socket.emit("new user", {user: user})
})


function newPlayer(name){
  var racers = document.querySelector(".racers")
  var container = document.createElement("div")
  var button = document.createElement("button")
  container.id = name
  button.innerText = name
  score.appendChild(item)
}

var sir = new Button("Sir")
var Luis = new Button("Luis")
var Nathan = new Button("Nathan")
var Juanos = new Button("Juanos")
var Thomas = new Button("Thomas")
var Elliot = new Button("Elliot")
