const router = require('express').Router()
const {Absences} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const info = await Absences.findAll({})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const info = await Absences.findAll({
      where: {studentId: id},
    })
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {body} = req
  try {
    const info = await Absences.create({...body})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  const {id} = req.params
  const {body} = req
  console.log('in the Absence put route: ', id, body)
  try {
    const info = await Absences.update({...body}, {where: {id: id}})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params
  try {
    const data = await Absences.destroy({where: {id: id}})
    res.json(data)
  } catch (err) {
    next(err)
  }
})
