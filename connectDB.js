const mongoose = require('mongoose')

connectDB = (port, path, app) => {
    mongoose.connect(path)
    .then(()=>{
        console.log("Connected to Database.")
        app.listen(port, () => {
            console.log(`Server started and Listening at: http://localhost:${port}`)
        })
    })
    .catch(()=>{
        console.log("Connection to Database Failed !!")
    })
}

module.exports = connectDB
