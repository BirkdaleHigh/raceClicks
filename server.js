var app =   require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req,res){
  res.sendFile(__dirname + '/public/index.html')
})
app.get('/client.js', function(req,res){
  res.sendFile(__dirname + '/public/client.js')
})

io.on('connection', function(socket){
  console.log('  User Connected')
  
  socket.on('button pressed', function(evt){
    console.log(evt)
    io.emit("button pressed", evt)
  })
})
io.on('disconnect', function(socket){
  console.log('User Disconnected')
})





http.listen(3000, '0.0.0.0',function(){
  console.log(`listening on ${http.address().address} at: ${http.address().port}`)
})