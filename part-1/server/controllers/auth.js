const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      // console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
        const isPassValid = bcrypt.compareSync(password, users[i].password)
        // if (users[i].username === username && users[i].password === password) {
        if (isPassValid) {
          let userDisplay = {...users[i]}
          delete userDisplay.password
          return res.status(200).send(userDisplay)
        }
      }
    }
    res.status(400).send("User not found.")
  },
    register: (req, res) => {
        // console.log('Registering User')
        // console.log(req.body)
        const { username, email, firstName, lastName, password } = req.body;
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(password, salt)
        // console.log(hash)

        const newUserObj = {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hash
        }

        users.push(newUserObj)
        // console.log(users)
        let userDisplay = {...newUserObj}
        delete userDisplay.password
        // console.log(userDisplay)
        res.status(200).send(userDisplay)
    }
}