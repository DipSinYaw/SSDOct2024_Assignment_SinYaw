const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Config = sequelize.define("Config", {
        configId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        configName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        configValue: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
    }, {
        tableName: "Configs"
    });

    return Config;
};