"use strict"
var socket = io()
var buttons = []

// Default Players
var players = [
  "Sir",
  "Luis"
]

var Button = function(id){
  var self = this

  self.id = id || 1
  self.count = 0
  self.el = document.querySelector('#' + id + ' button')
  self.el.onclick = self.press.bind(self)
  self.progress = document.querySelector('#' + id + ' progress')
}
Button.prototype = {
  press: function(){
    this.count += 1

    if(this.progress.value >= this.progress.max){
      this.reset()
    }
    socket.emit("button pressed", {"button": this.id, "count": this.count})
  },
  reset: function(){
    this.count = 0
    this.progress.value = 0
  },
  update: function(){
    this.progress.value = this.count
  }
}

socket.on("connect", function(){
  console.log('Start Connection')
  // List of players
  players.forEach(function(player){
    newPlayer(player)
  })
  // Run newPlayer for each name in the list
})

socket.on("new user", function(evt){
  newPlayer(evt.user)
  console.log('new user')
})

socket.on("button pressed", function(evt){
  buttons.filter(function(btn){
    // Normalize human input when comparing strings.
    if(evt.button.toLowerCase() === btn.id.toLowerCase()){
      return true
    }
  }).forEach(function(btn){
    btn.count = evt.count
    btn.update()
  })
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
  if(e.srcElement.type == "submit"){
    var user = form.querySelector('#username').value
    console.log(user)
    var popover=document.querySelector(".popover")
    popover.style.display="none"
    socket.emit("new user", {user: user})
  }
})


function newPlayer(name){
  var racers = document.querySelector(".racers")

  // In memory, lets build up the parts of the document for the new player to interact with
  var container = document.createElement("div")
  var button = document.createElement("button")
  var progress = document.createElement("progress")
  progress.max = 50
  container.id     = name
  button.innerText = name
  // Put the elements together in their tree
  container.appendChild(button)
  container.appendChild(progress)
  
  // Stick the new player into the page
  racers.appendChild(container)

  buttons.push( new Button(name) )
}

