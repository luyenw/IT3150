window.onload = () => {
  const alert_panel = document.getElementsByClassName('alerts-panel')[0]
  const noti_list = document.getElementsByClassName('noti-list')[0]
  const alert_icon = document.getElementsByClassName('icon--alert')[0]
  const header = document.getElementById('header')
  const main = document.getElementsByTagName('main')[0]
  const noti_li = document.getElementsByClassName('alert')[0]
  console.log(noti_li)
  header.style.position = 'fixed'
  header.style.left = '0'
  header.style.right = '0'
  
  main.style.marginTop = header.clientHeight + 'px'

  alert_icon.addEventListener('click', function(e){
      alert_panel.style.top = (header.getBoundingClientRect().height) + 'px'
      alert_panel.classList.toggle('show')
      noti_li.classList.toggle('li--active')
      alert_panel.style.right = '30px'
  })

  options = {
    minute: "2-digit",
    hour: "2-digit",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "numeric"
  };
  function get_item(element){
    return `<div class="notification-element">`
    + '<div class="noti-img"><a class="avatar avatar--s"><img src="'+element.avatarUrl+'"/></a></div>'
    + '<div class="noti-body">'
    + '<div class="noti-content">'
    + '<p><b>'+element.from+'</b>'
    + ' commented on '
    + '<b>'+element.in+'</b></p><br>' 
    + `</div>`
    + element.at + `</div></div>`
  }
  // const alert_panel = document.getElementsByClassName('alerts-panel')[0]
  room = 'default-room'
  fetch('/api/me').then(response=>response.json())
  .then(data=>{
    fetch('/api/noti').then(respone=>respone.json())
    .then(list=>{
      noti_list.innerHTML = ''
      list.forEach(element => {
        console.log(element)
        noti_list.insertAdjacentHTML("beforeend", 
          get_item(element)
        )
      });
    })
    var socket = io()
    room = data.username
    console.log(room)
    socket.emit('join-room', room)
    socket.on('new-notification', data=>{
      fetch('/api/noti').then(respone=>respone.json())
      .then(list=>{
        noti_list.innerHTML = ''
        list.forEach(element => {
          console.log(element)
          noti_list.insertAdjacentHTML("beforeend", 
            get_item(element)
          )
        });
        })
      })
  })
}