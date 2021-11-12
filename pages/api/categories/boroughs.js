import mongo from 'c:/Users/anupa/BitsOfGood/bootcamp-backend-f21-final/server/mongo'

export default async function handler(req, res) {
  const db = await mongo()
  const restaurants = db.collection('restaurants')
  const borough = await restaurants.distinct('borough')
  const b10 = borough.slice(0, 10);
  res.status(200).json(b10)
}