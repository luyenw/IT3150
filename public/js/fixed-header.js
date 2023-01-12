window.onload = () => {
    const alert_panel = document.getElementsByClassName('alerts-panel')[0]
    const alert_icon = document.getElementsByClassName('icon--alert')[0]
    const header = document.getElementById('header')
    const main = document.getElementsByTagName('main')[0]
    
    header.style.position = 'fixed'
    header.style.left = '0'
    header.style.right = '0'
    
    main.style.marginTop = header.clientHeight + 'px'

    alert_icon.addEventListener('click', function(e){
        alert_panel.style.top = (header.getBoundingClientRect().height) + 'px'
        alert_panel.classList.toggle('show')
        alert_panel.style.left = (parseFloat(alert_icon.getBoundingClientRect().x) - parseFloat(alert_panel.getBoundingClientRect().width)/2 + parseFloat(alert_icon.getBoundingClientRect().width/2)) + 'px'
    })
}