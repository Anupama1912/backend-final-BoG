import mongo from 'c:/Users/anupa/BitsOfGood/bootcamp-backend-f21-final/server/mongo'

export default async function handler(req, res) {
  const db = await mongo()
  const restaurants = db.collection('restaurants')
  const cuisine = await restaurants.distinct('cuisine')
  const c10 = cuisine.slice(0, 10);
  res.status(200).json(c10)
}