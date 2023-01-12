
  room = 'default-room'
  fetch('/api/me').then(response=>response.json())
  .then(data=>{
    var socket = io()
    room = data.username
    console.log(room)
    socket.emit('join-room', room)
    socket.on('new-notification', data=>{
      alert(data)
    })
  })
