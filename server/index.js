const PORT = process.env.PORT ?? 8000 
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const app = express()
const sql = require('./src/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
   console.log('Server is running...')
})

// get all todos

app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params
    try {
        const userEmailSql = userEmail;
        const todos = await sql`SELECT * FROM todos WHERE user_email = ${userEmailSql}` ;
        res.status(200).json(todos)
    } catch (e) { 
        console.log(e)      
        res.status(500).json({message: e.message})
    }
})

// new todo
app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body
    const id = uuidv4()

      try {
          const newTodo = await sql`INSERT INTO todos(id, user_email, title, progress, date) VALUES(${id}, ${user_email}, ${title}, ${progress}, ${date})`;
          res.status(200).json(newTodo)
      } catch (e) {       
          res.status(500).json({message: 'Server error'})
      }
  })

// edit todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params

    const { user_email, title, progress, date } = req.body
    try {
        const editTodo = await 
        sql`UPDATE todos SET user_email = ${user_email}, title = ${title}, progress = ${progress}, date = ${date} WHERE id = ${id}`
        res.status(200).json(editTodo)
    } catch (e) {       
        res.status(500).json({message: 'Server error'})
    }
})   

// delete todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteTodo = await sql`DELETE FROM todos WHERE id = ${id}`
        res.status(200).json(deleteTodo)
    } catch (e) {       
        res.status(500).json({message: 'Server error'})
    }
})


// signup

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    
    try {
        const signUp = await sql`INSERT INTO users(email, hashed_password) VALUES(${email}, ${hashedPassword})`
        
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

        res.json({ email, token })

    } catch (error) {
        if(error){
            res.json({detail: error.detail})
        }
    }
})

// login

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const users = await sql`SELECT * FROM users WHERE email = ${email}` 

        if (!users.rows.length) return res.json({detail: 'User not found'})

         const success = await bcrypt.compare(password, users.rows[0].hashed_password)
         const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

         if (success) {
             res.status(200).json({'email': users.rows[0].email, token})
            } else {
             res.status(401).json({detail: 'Login Failed'})
            }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})