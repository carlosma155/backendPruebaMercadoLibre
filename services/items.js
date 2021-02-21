const axios = require('axios');

const { config } = require('../config/index')

class ItemsService {

    async getItems({ tags } = {}) {
        const itemsMercadoLibre = await axios(`https://api.mercadolibre.com/sites/MLA/search?q=${tags.title}`)

        const allItems = itemsMercadoLibre.data.results;
        
        const categoriesCount = allItems.map(item => {return {"count": item.tags.length, "itemId": item.id}})    

        const itemsList = categoriesCount.map(item => 
        {return {                
                    "author": {
                        "name": config.firstName,
                        "lastname": config.lastname
                    },
                    "categories": item.tags,
                    "items": [
                        {
                            "id": item.id,
                            "title": item.title,
                            "price": {
                                "currency": item.currency_id,
                                "amount": item.price,
                                "decimals": 0
                            },
                            "picture": item.thumbnail,
                            "condition": item.condition,
                            "free_shipping": item.shipping.free_shipping
                        }
                    ]
                    
                }
        })

        

        return itemsList[3];
    }

    async getItem({ itemId }) {
        const itemMercadoLibre = await axios(`https://api.mercadolibre.com/items/${itemId}`)
        const itemDescriptionMercadoLibre = await axios(`https://api.mercadolibre.com/items/${itemId}/description`)

        const itemInfo = itemMercadoLibre.data;
        const itemDescription = itemDescriptionMercadoLibre.data;

        const item = {
            "author": {
                "name": config.firstName,
                "lastname": config.lastname
            },
            "item": {
                "id": itemInfo.id,
                "title": itemInfo.title,
                "price": {
                    "currency": itemInfo.currency_id,
                    "amount": itemInfo.price,
                    "decimals": 0
                },
                "picture": itemInfo.pictures.url,
                "condition": itemInfo.condition,
                "free_shipping": itemInfo.shipping.free_shipping,
                "sold_quantity": itemInfo.sold_quantity,
                "description": itemDescription.plain_text
            }
        }
        
        return item;
    }
}

module.exports = ItemsService;