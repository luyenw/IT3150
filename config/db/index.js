const mongoose = require('mongoose');
const connect = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/forum');
        console.log('connect successully')
    }catch(error){
        console.log('connect failure')
    }
}
module.exports = connect