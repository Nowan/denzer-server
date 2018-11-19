"use static";

const rawData = require("./data/map.json");

class Map {
    constructor() {
        this.terrain = _getTerrain();
        this.spawnPoints = _getSpawnPoints();
    }
}

function _getTerrain() {
    return _findLayer("Terrain").data;
}

function _getSpawnPoints() {
    return _findLayer("Spawn").objects.map((spawnPoint) => {
        return { x: spawnPoint.x + spawnPoint.width * 0.5, y: spawnPoint.y + spawnPoint.height * 0.5 };
    });
}

function _findLayer(name) {
    return rawData.layers.find((layer) => {return layer.name === name});
}

module.exports = Map;