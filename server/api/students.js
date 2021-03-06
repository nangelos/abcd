const router = require('express').Router()
const {Student, Absences} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const info = await Student.findAll({})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('post req.body: ', req.body)
    let {body} = req
    const info = await Student.create({...body})
    res.status(201).json(info)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const {body} = req
    console.log('here is the req.body: ', body)
    const data = await Student.update({...body}, {where: {id: id}})
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const data = await Student.destroy({where: {id: id}})
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log('get :id params: ', req.params)
    let {id} = req.params
    const user = await Student.findAll({
      where: {id: id},
      include: [{model: Absences}],
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:id', async (req, res, next) => {
  try {
    console.log('get user/:id params: ', req.params)
    let {id} = req.params
    const user = await Student.findAll({
      where: {userId: id},
      include: [{model: Absences}],
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
