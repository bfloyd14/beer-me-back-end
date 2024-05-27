import { Beer } from '../models/beer.js'
import { Profile } from '../models/profile.js'

async function create(req, res){
  try {
    req.body.author = req.user.profile
    const beerPost = await Beer.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {beerPosts: beerPost}},
      { new : true}
    )
    beerPost.author = profile
    res.status(201).json(beerPost)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function index(req,res){
  try {
    const beers = await Beer.find({})
      .populate('author')
      .sort({createdAt: 'desc'})
    res.status(200).json(beers)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res){
  try {
    const beerToCheck = await Beer.findById(req.params.beerId)
    if(beerToCheck.author.equals(req.user.profile)){
      console.log('author is a match')
      const beer = await Beer.findByIdAndUpdate(
        req.parans.beerId,
        req.body,
        {new: true}
      ).populate('author')
      res.status(200).jason(beer)
    } else {
      res.status(401).jason({error: 'Not Authorized'})
    }
  } catch (err) {
    console.log(err)
  }
}

export{
  create,
  index,
  update,
}