const product = require('../utils/db.json')

const getProduct = async (req, res) => {
  try {
    res.status(200).json(product)
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

module.exports = { getProduct }
