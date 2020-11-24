const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Note = sequelize.define('react_note', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {type: Sequelize.STRING, allowNull: false},
    text: {type: Sequelize.TEXT, allowNull: false},
    author: {type: Sequelize.STRING, allowNull: false},
    createdAt: {
        type: Sequelize.DATE,                  
      get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        }
    }
});

module.exports = Note;