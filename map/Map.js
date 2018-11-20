"use static";

const rawData = require("./data/map.json");

class Map {
    constructor() {
        this.tileSize = rawData.tilewidth;
        this.width = rawData.width * this.tileSize;
        this.height = rawData.height * this.tileSize;
        this.terrain = _parseTerrain();
        this.spawnPoints = _parseSpawnPoints();
    }
}

function _parseTerrain() {
    const terrainLayer = _findLayer("Terrain");
    const terrain = {
        columns: terrainLayer.width,
        rows: terrainLayer.height,
        tiles: terrainLayer.data
    };
    
    return terrain;
}

function _parseSpawnPoints() {
    return _findLayer("Spawn").objects.map((spawnPoint) => {
        return { x: spawnPoint.x + spawnPoint.width * 0.5, y: spawnPoint.y + spawnPoint.height * 0.5 };
    });
}

function _findLayer(name) {
    return rawData.layers.find((layer) => {return layer.name === name});
}

module.exports = Map;