import mongo from 'c:/Users/anupa/BitsOfGood/bootcamp-backend-f21-final/server/mongo'

export default async function handler(req, res) {
  const db = await mongo()
  const neighborhoods = db.collection('neighborhoods')
  const neighborhood = await neighborhoods.distinct('name')
  res.status(200).json(neighborhood)
}