const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db',
  define: {
    timestamps: false
  }
})

// Entity definitions

const User = sequelize.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
})

const app = express()
app.use(cors())
app.use(express.json())

// User endpoints

app.post('/users', async (req, res) => {
  try {
    await User.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.get('/users/:username', async (req, res) => {
  try {
    const found = false;
    const users = await User.findAll();
    for(var u of users) {
      if(u.username === req.params.username) {
        found = true;
        break;
      }
    }
    if (found) {
      res.status(200).json(found)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})


app.post('/login', async (req, res) => {
  try {
    var username = req.body.username
    var password = req.body.password

    const users = await User.findAll();
    for(var u of users) {
      if(u.username === username) {
        if(u.password === password) {
          res.status(200).json({ firstName: u.firstName, lastName: u.lastName, username: u.username, role: u.role })
        } else {
          res.status(400).json({ message: 'Incorrect user or password' })
        }
        break;
      }
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

app.listen(8080, async () => {
  try {
    await sequelize.sync({ alter: true })
    console.warn('created tables')
    const teacher = User.build({ firstName: "El", lastName: "Professor", username: "user1", password: "user1", role: "professor" });
    const student = User.build({ firstName: "Bob", lastName: "Stamina", username: "user2", password: "user2", role: "student" });
    const sample = [teacher, student]
    sample.forEach(async (u) => {
      console.warn('creating ' + u.username)
      //await User.create(e)
      u.save()
    })
  } catch (err) {
    console.warn(err)
  }
})
