const Box = require('../models/BoxModel')

exports.get_root = (req, res) =>{
    res.render('pages/admin/index')
}
exports.post_new_box = (req, res) => {
    const box = new Box({title: req.body.title})
    box.save()
    res.redirect('/')
}