const Models = require("../models");
const cron = require('node-cron');
const {tokenMap} = require('../utils/token');
const {jsonToArray, entriesToMap, mapToArray, arrayToJson} = require("../utils/convertion");

class ConfigService {
    constructor(sequelize) {
        if (!sequelize) {
            throw new Error("Sequelize instance is required");
        }
        Models(sequelize);
        this.models = sequelize.models;

        // Schedule a task to clean up expired tokens every minute
        cron.schedule('*/1 * * * *', () => {
            console.log('Running cron job to clean up expired tokens');
            this.cleanupExpiredTokens();
        });
    }

    async cleanupExpiredTokens() {
        const name = 'logoutTokens';
        const logoutTokenStore = await this.#getValueByName(name);
        if (logoutTokenStore && jsonToArray(logoutTokenStore).length > 0) {
            const logoutTokenMap = entriesToMap(jsonToArray(logoutTokenStore));
            logoutTokenMap.forEach((value, key) => tokenMap.set(key, value));
        }
        const now = Math.floor(Date.now() / 1000);

        for (const [token, exp] of tokenMap.entries()) {
            if (exp < now) {
                tokenMap.delete(token);
            }
        }

        const updatedLogoutTokenStore = arrayToJson(mapToArray(tokenMap));

        return this.updateValueByName(name, updatedLogoutTokenStore);
    }

    async addConfig(config) {
        const newConfig = await this.models.Config.create(
            config,
        );
        if (!newConfig) {
            throw new Error("Error adding config");
        }
        return newConfig;
    }

    async #getValueByName(configName) {
        const config = await this.models.Config.findOne({
            where: {configName},
        });
        if (!config) {
            return null;
        }
        return config.configValue;
    }

    async updateValueByName(configName, configValue) {
        let jsonArray;
        try {
            jsonArray = jsonToArray(configValue);
        } catch (error) {
            console.error("Error updating config:", error);
            throw error;
        }

        //validate configValue is an array
        if (!Array.isArray(jsonArray)) {
            throw new Error("configValue must be an array");
        }

        const getData = await this.models.Config.findOne({where: {configName: configName}});
        if (!getData) {
            return this.addConfig({configName, configValue});
        }

        const updatedConfig = await this.models.Config.update(
            {configValue},
            {where: {configName}},
        );
        if (!updatedConfig) {
            throw new Error("Error updating config");
        }
        return updatedConfig;
    }

    async deleteValueByName(configName) {
        const deletedConfig = await this.models.Config.destroy({
            where: {configName},
        });
        if (!deletedConfig) {
            throw new Error("Error deleting config");
        }
        return deletedConfig;
    }
}

module.exports = ConfigService;