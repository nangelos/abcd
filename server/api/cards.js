const router = require('express').Router()
const Cards = require('../db/models/cards')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const info = await Cards.findAll({})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const info = await Cards.findAll({where: {userId: id}})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {body} = req
  try {
    const info = await Cards.create({...body})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

//Still needs thought about how to do this. Need to find appropriate card, then update it
router.put('/:id', async (req, res, next) => {
  const {body} = req
  const {userId, cardNumber, cvv, expDate, zipCode} = body
  try {
    const info = await Cards.update(
      {...body},
      {where: {userId, cardNumber, cvv, expDate, zipCode}}
    )
    res.json(info)
  } catch (err) {
    next(err)
  }
})
