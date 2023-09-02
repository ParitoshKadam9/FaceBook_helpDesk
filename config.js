const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://Paritosh9:12345@richpanel.unhiqcy.mongodb.net/?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology : true
            }
        )
        console.log('mongodb connected')
    }
    catch(err) {
        console.log(err);
        process.exit();
    }
}

module.exports = connectDB