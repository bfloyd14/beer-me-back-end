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


export{
  create,

}