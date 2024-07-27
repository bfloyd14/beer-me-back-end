import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)
    
    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    req.body.user = req.profile
    const profile = await Profile.findById(req.user.profile)
    .populate()
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res){
  try {
    const profileToCheck = await Profile.findById(req.params.profileId)
    if(profileToCheck.equals(req.user.profile)){
      console.log('author is a match')
      const profile = await Profile.findByIdAndUpdate(
        req.params.profileId,
        req.body,
        {new: true}
      ).populate(req.user.profile)
      res.status(200).jason(profile)
    } else {
      res.status(401).jason({error: 'Not Authorized'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { index, addPhoto, show, update }
