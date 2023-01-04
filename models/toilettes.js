const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Toilettes = sequelize.define('Toilettes', {
    horaire:{
        type: DataTypes.STRING
    },
    adresse:{
        type: DataTypes.STRING
    },
    arrondissement:{
        type: DataTypes.STRING
    },
    position: {
      type: DataTypes.GEOMETRY
    }

  })

  return Toilettes
}