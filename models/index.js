require('dotenv').config()

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toilettes', 'root', process.env.MDP, {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
})

const connectDb = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to db')
  } catch (e) {
    console.log(e)
  }
}

connectDb()

const Toilettes = require('./toilettes')(sequelize)

sequelize.sync({ alter: true })

const db = {
  sequelize,
  Toilettes
}

module.exports = db