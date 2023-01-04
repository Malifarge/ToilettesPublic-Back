require('./models')
const { Toilettes } = require('./models')
const toilettesPubliques = require('./sanisettesparis.json')

const createToilettes = async () => {
  await Toilettes.destroy({ where: {} })


  toilettesPubliques.forEach(async (toilette) => {
    const {geo_point_2d,horaire,adresse,arrondissement} = toilette.fields
    const latitude = geo_point_2d[0]
    const longitude = geo_point_2d[1]

    const point = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const toilettes = await Toilettes.create({
        horaire,
        adresse,
        arrondissement,
        position: point
    })

  })
}

createToilettes()