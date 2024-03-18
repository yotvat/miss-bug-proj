import express from 'express'
import { loggerService } from './services/logger.service.js'
import { bugService } from './services/bug.service.js'
import { utilService } from './services/util.service.js'

const app = express()

app.get('/', (req, res) => res.send('Hello there'))

// Get Bugs (READ)
app.get('/api/bug', (req, res) => {
    console.log('hi')
    // bugService.query()
    //     .then(bugs => {
    //         console.log('success')
    //          res.send(bugs)
    //     })
    //     .catch(err => {
    //         loggerService.error('Cannot get bugs', err)
    //         res.status(400).send('Cannot get bugs')
    //     })
})

// save Bug (add/update)










app.listen(3031, () => console.log('Server ready at port 3030'))