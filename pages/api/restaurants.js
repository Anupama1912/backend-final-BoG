// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from '../../server/mongo'


// export default async function handler(req,res) {
//   const db = await mongo()
//   const restaurants = db.collection('restaurants')

//   const params = req.query
//   const pg = params.page ?? 1
//   console.log(params)
//   let pgSize = parseInt(params['page-size']) ?? 10
//   if (isNaN(pgSize)) {
//     pgSize = 10
//   }
//   //console.log(Object.keys(params))
//   let results = await restaurants.find({}).limit(pgSize).skip(pgSize*(pg-1)).toArray()

//   //console.log(Object.keys(params).includes('cuisine'))
//   if (Object.keys(params).includes('cuisine','borough')) {
//     results = await restaurants.find({'cuisine': params.cuisine, 'borough': params.borough}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//   } else if (Object.keys(params).includes('sort_by')) {

//     if (params['sort_by'].includes('grades.asc')) {
//       results = await restaurants.find().sort({'grades.0.grade': 1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//     } else if (params['sort_by'].includes('grades.desc')) {
//       results = await restaurants.find().sort({'grades.0.grade': -1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//     } else {
//         var sort = req.query['sort_by']
//         if (sort.includes('asc')) {
//           var par = `${sort}`.slice(0,-4)
//           results = await restaurants.find().sort({[par]: 1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//         } else if (sort.includes('desc')) {
//           var par = `${sort}`.slice(0,-5)
//           results = await restaurants.find().sort({[par]: -1}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
//         }

//     }
    
//   }
//   res.status(200).json(results)
// }

export default async function handler(req,res) {
  const db = await mongo()
  const restaurants = db.collection('restaurants')

  const params = req.query
  const {page, 'page-size': pageSize, sort_by, ...restf} = params

  const pg = page ?? 1
  let pgSize = parseInt(pageSize) ?? 10
  if (isNaN(pgSize)) {
    pgSize = 10
  }

  // delete params.page
  // delete params['page-size']

  console.log(sort_by)
  console.log(pg)

  // const sorts = params['sort_by'] ?? ''
  const sorts = sort_by ?? ''
  if (sorts.includes('asc')) {
    var sort = 1
    var par = `${sorts}`.slice(0,-4)
    if (par == 'grades') {
      par = 'grades.0.score'
    }
  } else if (sorts.includes('desc')) {
    var sort = -1
    var par = `${sorts}`.slice(0,-5)
    if (par == 'grades') {
      par = 'grades.0.score'
    }
  }
  console.log({[par]: sort})
  // delete params['sort_by']
  let results = await restaurants.find(restf).sort({[par]: sort}).limit(pgSize).skip(pgSize*(pg-1)).toArray()
  res.status(200).json(results)
}