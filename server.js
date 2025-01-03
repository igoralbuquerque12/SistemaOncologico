const app = require('./app')
require('dotenv').config({ path: './.env' })

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}...`)
})
