import express from 'express'
import { loggerService } from './services/logger.service.js'
import { bugService } from './services/bug.service.js'
import cookieParser from 'cookie-parser'

const app = express()

// Express config:
app.use(express.static('public'))
app.use(cookieParser())

//Express Routing:



// Get Bugs (READ)
app.get('/api/bug', (req, res) => {
    console.log('hi')
    bugService.query()
        .then(bugs => {
            console.log('success')
            res.send(bugs)
        })
        .catch(err => {
            loggerService.error('Cannot get bugs', err)
            res.status(400).send('Cannot get bugs')
        })
})




// save Bug (add)
app.get('/api/bug/save', (req, res) => {
    const bugToSave = {
        title: req.query.title,
        severity: +req.query.severity,
        description: req.query.description,
        createdAt: req.query.createdAt,
        _id: req.query._id
    }
    bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch((err) => {
            loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bug')
        })
})

// get by id
app.get('/api/bug/:id', (req, res) => {
    const bugId = req.params.id
    const visitedBugs = req.cookies.visitedBugs || []

    if (!visitedBugs.includes(bugId)) visitedBugs.push(bugId)
    res.cookie('visitedBugs', visitedBugs, { maxAge: 7 * 1000 })

    if (visitedBugs.length > 3) return res.status(401).send('Wait for a bit')
    else console.log('user visited the following bugs:', visitedBugs)

    bugService.getById(bugId)
        .then(bug => {
            res.send(bug)
        })
        .catch(err => {
            loggerService.error(err)
            res.status(400).send('Cannot get bug')
        })
})


//Delete
app.get('/api/bug/:id/remove', (req, res) => {
    console.log('delete....');
    const bugId = req.params.id
    bugService.remove(bugId)
        .then(() => res.send(bugId))
        .catch((err) => {
            loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })
})










app.listen(3031, () => console.log('Server ready at port 3030'))