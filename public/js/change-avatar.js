const panel = $('.hidden-panel')
console.log(panel)
const blur_layer = $('.blur-layer')
const element = $('.avatarWrapper-update')
element.click(()=>{
    alert('ok')
    panel.addClass('show')
    blur_layer.addClass('show')
})

blur_layer.click(()=>{
    panel.removeClass('show')
    blur_layer.removeClass('show')
})