const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log(`[db] Connected to: ${DB_URL}`)
  } catch (err) {
    console.log(`[db] ${err}`)
  }
}

module.exports = { dbConnect }