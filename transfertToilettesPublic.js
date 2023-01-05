require('./models')
const { Toilettes } = require('./models')
const toilettesPubliques = require('./sanisettesparis.json')

const createToilettes = async () => {
  
  await Toilettes.destroy({ where: {} })

  // construire boîte de promesse

  const createToilettesInDb = async(geo_point_2d,horaire,adresse,arrondissement) =>{
    const latitude = geo_point_2d[0]
    const longitude = geo_point_2d[1]

    const point = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
    await Toilettes.create({
     adresse,
     horaire,
     arrondissement,
     position: point
    })
   } 

 const promises = toilettesPubliques.map(toilette=>{
    return createToilettesInDb(toilette.fields.geo_point_2d,toilette.fields.horaire,toilette.fields.adresse,toilette.fields.arrondissement)
 })
 
//  executer les promesses dans l'ordre avec Promise.all

 await Promise.all(promises)
}

createToilettes()