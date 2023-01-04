const panel = $('.hidden-panel')
const blur_layer = $('.blur-layer')
const element = $('.avatarWrapper-update')

element.click(()=>{
    panel.addClass('show')
    blur_layer.addClass('show')
})

blur_layer.click(()=>{
    panel.removeClass('show')
    blur_layer.removeClass('show')
})