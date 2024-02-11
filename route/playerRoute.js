const express = require('express');
const Player = require('../model/playerModel');
const fs = require('fs')

const playerRouter = express.Router();

playerRouter.get('/top-players', async (req, res) => {
    try {
        const topPlayers = await Player.find().limit(50)

        //res.json(topPlayers);
        res.status(200).send({ status: true, message : "Data fetched Successfully", data : topPlayers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

playerRouter.get('/player/:username/rating-history', async (req, res) => {
    try {
        const player = await Player.findOne({ username: req.params.username });
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        const { ratingHistory } = player;
        const classicalRating = ratingHistory.find(entry => entry.name === 'Classical');
        if (!classicalRating) {
            return res.status(404).json({ error: 'Classical rating not found' });
        }
        
        const last30Entries = classicalRating.points.slice(-30);

        res.json({ classicalRating: { name: classicalRating.name, points: last30Entries } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

playerRouter.get('/players/rating-history-csv', async (req, res) => {
    try {
        const players = await Player.find().limit(50);

        const csvData = [];

        for (const player of players) {
            const classicalRating = player.ratingHistory.find(entry => entry.name === 'Classical');

            if (classicalRating) {
                const last30Entries = classicalRating.points.slice(-30);

                const rowData = [player.username];
                last30Entries.forEach(entry => {
                    rowData.push(entry.date, entry.rating);
                });

                csvData.push(rowData.join(','));
            }
        }

        const csvString = csvData.join('\n');

        fs.writeFileSync('rating-history.csv', csvString);

        res.download('rating-history.csv', 'rating-history.csv', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                fs.unlinkSync('rating-history.csv');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = playerRouter
