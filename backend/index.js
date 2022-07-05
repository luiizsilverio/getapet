const express = require('express')
const cors = require('cors')
const UserRoutes = require('./routes/UserRoutes')

const app = express()

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
app.use('/users', UserRoutes)

app.listen(5000)