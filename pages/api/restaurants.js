// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from '../../server/mongo'


// export default async function handler(req, res) {
//   // console.log(req.query)
//   var url = require('url')
//   const db = await mongo()
//   const restaurants = db.collection('restaurants')
//   var urlQuery = url.parse(req.url,true).query
//   console.log(typeof urlQuery)
//   var param = Object.values(urlQuery).toString()

//   const pg = req.query.page ?? 1
//   console.log(req.query)
//   let pgSize = parseInt(req.query['page-size']) ?? 10
  
//   if (isNaN(pgSize)) {
//     pgSize = 10
//   }
//   let results = await restaurants.find({}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//   console.log(Object.keys(urlQuery).includes('cuisine','borough'))
//   if (Object.keys(urlQuery).includes('cuisine','borough')) {
//     results = await restaurants.find({'cuisine': urlQuery.cuisine, 'borough': urlQuery.borough}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//   } else if (Object.keys(urlQuery).includes('sort_by')) {

//     if (Object.values(urlQuery).includes('grades.asc')) {
//       results = await restaurants.find().sort({'grades.0.grade': 1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//     } else if (Object.values(urlQuery).includes('grades.desc')) {
//       results = await restaurants.find().sort({'grades.0.grade': -1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//     } else {

//         if (param.includes('asc')) {
//           var par = `${param}`.slice(0,-4)
//           results = await restaurants.find().sort({[par]: 1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//         } else if (param.includes('desc')) {
//           var par = `${param}`.slice(0,-5)
//           results = await restaurants.find().sort({[par]: -1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//         }

//     }
    
//   }
//     res.status(200).json(results)
// }

export default async function handler(req,res) {
  const db = await mongo()
  const restaurants = db.collection('restaurants')

  const params = req.query
  const pg = params.page ?? 1
  console.log(params)
  let pgSize = parseInt(params['page-size']) ?? 10
  if (isNaN(pgSize)) {
    pgSize = 10
  }
  //console.log(Object.keys(params))
  let results = await restaurants.find({}).limit(pgSize).skip(pgSize*(pg-1)).toArray()

  //console.log(Object.keys(params).includes('cuisine'))
  if (Object.keys(params).includes('cuisine','borough')) {
    results = await restaurants.find({'cuisine': params.cuisine, 'borough': params.borough}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
  } else if (Object.keys(params).includes('sort_by')) {

    if (params['sort_by'].includes('grades.asc')) {
      results = await restaurants.find().sort({'grades.0.grade': 1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
    } else if (params['sort_by'].includes('grades.desc')) {
      results = await restaurants.find().sort({'grades.0.grade': -1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
    } else {
        var sort = req.query['sort_by']
        if (sort.includes('asc')) {
          var par = `${sort}`.slice(0,-4)
          results = await restaurants.find().sort({[par]: 1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
        } else if (sort.includes('desc')) {
          var par = `${sort}`.slice(0,-5)
          results = await restaurants.find().sort({[par]: -1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
        }

    }
    
  }
  res.status(200).json(results)
}