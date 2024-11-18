const app = require('./app')
require('dotenv').config({ path: './.env' })

const port = 3000

app.listen(port, () => {
    console.log('Listening on port 3000...')
})
