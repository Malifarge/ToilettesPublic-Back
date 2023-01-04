const express= require('express')
const app = express()
const sequelize=require('sequelize')
const {Toilettes} = require('../models')

app.get('/', async (req, res) => {
    const { r, latitude, longitude } = req.query
  
    // distance max jusqu'a laquelle on veut chercher
    const radius = r * 1000
  
    // définition de notre point de départ (centre du cercle)
    const location = sequelize.literal(
      `ST_GeomFromText('POINT(${longitude} ${latitude})')`
    )
  
    // calculer la distance entre notre point de départ
    // et les toilettes
    const distance = sequelize.fn(
      'ST_Distance_Sphere',
      sequelize.col('toilettes.position'),
      location
    )
  
    const toilettes = await Toilettes.findAll({
      where: {
        // on veut récupérer les toilettes dont la distance
        // est inférieure ou égale (lte = lower than or equal) au rayon
        position: sequelize.where(distance, { [sequelize.Op.lte]: radius })
      }
    })
  
    res.json(toilettes)
  })
  
  module.exports = app