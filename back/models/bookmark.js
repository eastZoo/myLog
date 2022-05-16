const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Bookmark extends Model {
    static init(sequelize) {
        return super.init({
            // id가 기본적으로 들어있다.
            bookmark: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // RetweetId
        }, {
            modelName: 'Bookmark',
            tableName: 'bookmark',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize,
        });
    }
    static associate(db) {

    }
};
