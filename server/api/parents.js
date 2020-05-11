const router = require('express').Router()
const {ParentInfo} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const info = await ParentInfo.findAll({})
    res.json(info)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('post req.body: ', req.body)
    let {body} = req
    const info = await ParentInfo.create({body})
    res.status(201).json(info)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    console.log('put function: still needs work: ', req.params)
    const {id} = req.params
    const data = await ParentInfo.udpate({
      where: {id},
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log('get :id params: ', req.params)
    let {id} = req.params
    const user = await ParentInfo.findAll({
      where: {id: id},
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
