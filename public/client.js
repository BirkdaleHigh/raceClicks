var socket = io()

var Button = function(id){
  var self = this

  self.id = id || 1
  self.count = 0
  self.el = document.querySelector('#' + id + ' button')
  self.el.onclick = function(){ self.press() }
  self.progress = document.querySelector('#' + id + ' progress')
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
  newPlayer(evt.user)
  console.log('new user')
})

socket.on("new user", function(evt){
  switch(evt.button){
    case 'Sir':
      sir.count = evt.count
      sir.update()
    break;
    case 'Luis':
      Luis.count = evt.count
      Luis.update()
    break;
    case 'Nathan':
      Nathan.count = evt.count
      Nathan.update()
    break;
    case 'Juanos':
      Juanos.count = evt.count
      Juanos.update()
    break;
    case 'Thomas':
      Thomas.count = evt.count
      Thomas.update()
    break;
    case 'Elliot':
      Elliot.count = evt.count
      Elliot.update()
    break;
  }
})
socket.on("reset", function(evt){
  console.log(evt.winner + " you win!")
  var score=document.getElementById("score")
    var item=document.createElement("li")
    item.innerText=evt.winner
    score.appendChild(item)
    sir.reset()
    Luis.reset()
    Nathan.reset()
    Juanos.reset()
    Thomas.reset()
    Elliot.reset()
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
  var progress = document.createElement("progress")
  progress.max = 50
  container.id = name
  button.innerText = name
  container.appendChild(button)
  container.appendChild(progress)
  
  racers.appendChild(container)
}

var sir = new Button("Sir")
var Luis = new Button("Luis")
var Nathan = new Button("Nathan")
var Juanos = new Button("Juanos")
var Thomas = new Button("Thomas")
var Elliot = new Button("Elliot")
