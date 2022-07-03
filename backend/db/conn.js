const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/getapet')
    console.log("Conectou no banco")
}

main().catch((err) => console.warn(err))

module.exports = mongoose
