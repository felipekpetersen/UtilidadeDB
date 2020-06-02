var express = require('express');
var router = express.Router();
var Bairro = require('../models/Bairro')
const User =  require('../models/User')
const Location =  require('../models/Location')
const ShoppingList =  require('../models/ShoppingList')
const Event =  require('../models/Event')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Batata', batata: [1, 2] });
});

router.post('/createUser', async function (req, res, next) {
  let newUser = new User(req.body)
  console.log(req.body)
  try {
    await newUser.save()
    res.json({ result: true })
  } catch (err) {
    console.log('Error: ', err)
    res.json({ result: err })
  }
});

router.post('/enterEvent', async function (req, res, next) {
  let user = await User.findOne({ id: req.params.userId })
  let event = await Event.findOne({ id: req.params.eventId })
  if (user) {
    if (!user.events) { //push?, pode ser 
      user.events = []
    }
    try {
      user.events.push(event._id) //user.push(newEvent) ???
      await user.save()
    }  catch (err) {
      res.json({ 
        result: false 
      })
    }
    res.json({ 
      result: true 
    })
  } else {
    res.json({ 
      result: false 
    })
  }
});

router.get('/getEvents/:userId', async function (req, res, next) {
  let user = await User.findOne({ id: req.params.userId })
  // let location = await Location.findOne({ })
  if (user) {
    try {
      // user.events[0] = Location.findOne({_id: "5ecc0cb9ba139f456810c74f"})
      console.log("all Locations: ", Location.find({}))
      res.json(user.events)
    } catch (err) {
      res.json({ result: false })
    }
  } else {
    res.json({ result: false })
  }
});

router.post('/createEvent', async function (req, res, next){
  let user = await User.findOne({ id: req.body.userId})
  // console.log('user: ', user)

  if (user) {
    try {
      //pega os elementos
      let newEvent = new Event(req.body.event)

      // try {
        let newLocation = await Location.create(req.body.location) // await newLocation.save()
        newEvent.location = newLocation._id
      // } catch (err) {
      //   res.json({ 
      //     result: false 
      //   })
      // }

      let shoppingList = req.body.shoppingList

      //popula o shoppiglist do evento 
      // try {
        let newList = []
        for (let i = 0; i < shoppingList.length; i++) {
          let newItem = await ShoppingList.create(shoppingList[i]) // await newItem.save() // tem que criar o obj no banco
          newList.push(newItem._id) // já é um arr //mas pq vc esta fazendo push nele mesmo? || igual ao append
        }
      // } catch (err) {
      //   res.json({ 
      //     result: false 
      //   })
      // }

      //coloca location no newEvent --- aqui no newEvent, quando pego ele, parece que ta com o objeto inteiro
      // try {
        newEvent.shoppingList = newList // [aqui é um arr de _id], mesmo que [String]
        await newEvent.save()
      // } catch (err) {
      //   res.json({ 
      //     result: false 
      //   })
      // }

      //coloca o evento no usuario --- aqui parece que no user tem so a ref do objeto 
      if (!user.events) { //push?, pode ser 
        user.events = []
      }

      try {
        user.events.push(newEvent._id) //user.push(newEvent) ???
        await user.save()
      }  catch (err) {
        res.json({ 
          result: false 
        })
      }

      res.json({ //acho que já funfa
				result: true //ok vou testar!! Thanksssssss, noizessss
      })
      
    } catch (err) {
      res.json({ 
				result: false 
			})
    }
  } else { 
    res.json({ //okkkk! thansksss
			result: false 
		}) //ahhh
  }
});

router.post('/updateWhoBrings', async function (req, res, next) {
  let list = await ShoppingList.findOne({_id: req.body.listId})
  
  if (list) {
    try { 
      list.whoBrings = req.body.username
    } catch (err) {
      res.json({
        result: false 
      })
    }
  } else { 
    res.json({
			result: false 
		})
  }
});

router.post('/updateEvent', async function (req, res, next) {
  let event = await Event.findOne({id:req.body.event.id})

  if (event) {
    try {
      event.name = req.body.event.name
      event.color = req.body.event.color
      event.date = req.body.event.date
      event.startHour = req.body.event.startHour
      event.endHour = req.body.event.endHour
      // event.shoppingList = req.body.event.shoppingList
      // event.location = req.body.event.location

      await event.save()
      res.json({ result: true })
    } catch (err) {
      res.json({ result: false })
    }
  } else {
    res.json({ result: false })
  }
});

module.exports = router;
