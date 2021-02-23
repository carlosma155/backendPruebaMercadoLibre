const express = require('express');
const ItemsService = require('../services/items');

function itemsApi(app) {
    const router = express.Router();
    app.use('/api/items', router)

    const itemsService = new ItemsService();
    
    router.get('/', async (req, res, next) => {

        const { query: tags } = req;
        
        try {
            const items = await itemsService.getItems({ tags })

            res.status(200).json({
                data: items
            })
        } catch (error) {
            next(error)
        }
    })

    router.get('/:itemId', async (req, res, next) => {

        const { itemId } = req.params;

        try {
            const item = await itemsService.getItem({ itemId })

            res.status(200).json({
                data: item
            })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = itemsApi;