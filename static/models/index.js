const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/tripplanner', {logging: false})

//the seed file expected you to import each model from its own file
const Place=db.define('place',{
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull:false
    }, 
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false
    }
}, {});

const Hotel=db.define('hotel',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_stars: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            max: 5,
            min: 1
        }
    },
    amenities: {
        type: Sequelize.STRING(),
        allowNull:false
    }
}, {})

const Activity=db.define('activity',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age_range: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {})

const Restaurant=db.define('restaurant',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate: {
            max: 5,
            min: 1
        }
    }
}, {})

Restaurant.belongsTo(Place);
Hotel.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
    db: db,
    Place: Place,
    Hotel: Hotel,
    Activity: Activity,
    Restaurant: Restaurant

}