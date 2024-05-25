import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  comment: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  }
})

const beerSchema = new Schema({
  name: {required: true,
    type: String,
    },
  image: String,
  category: {
    type: String,
    enum: ['Domestic', 'Import', 'Craft', 'FMB', 'Hard Seltzer']
  },
  style: {
    type: String,
    required: true,
    enum: ['Ale', 'Lager', 'IPA', 'Stout', 'Pale Ale', 'Pilsner', 'Amber Ale', 'Porter', 'Witbier', 'Brown Ale', 'American Pale Ale', 'Kolsch', 'Barley Wine', 'Helles', 'Saison', 'Gose', 'Tripel', 'Amber Ale', 'Red Ale', 'Hefeweizen', 'Marzen', 'Lambic', 'Scotch Ale', 'Doppelbock', 'Vienna Lager', 'Scharzbier', 'Weizenbock', 'Helles Bock', 'Dunkel', 'American Wheat Beer', 'Hard Seltzer', 'Cider', 'FMB'
    ]
  },
  brewery: String,
  location: String,
  abv: {
    type: Number,
    required: true,
},
reviews: [reviewSchema]
},
{
  timestamps: true,
})


const Beer = mongoose.model('Beer', beerSchema)

export { Beer }
