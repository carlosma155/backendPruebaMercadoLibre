const axios = require('axios');

const { config } = require('../config/index')

class ItemsService {

    async getItems({ tags } = {}) {
        const itemsRequest = await axios(`https://api.mercadolibre.com/sites/MLA/search?q=${tags.q}`);

        const allData = itemsRequest.data;  
        const hasCategory = allData.available_filters.find(x => x.id ==="category");
        const itemsFiltered = allData.results.slice(0,4);    
        const items = itemsFiltered.map(item => (  
            {                
                "author": {
                    "name": config.firstName,
                    "lastname": config.lastname
                },
                "categories": hasCategory !== undefined ? allData.available_filters.find(x => x.id ==="category").values.sort((a,b) => b.results - a.results).map(x => x.name) : [],
                "items": [
                    {
                        "id": item.id,
                        "title": item.title,
                        "price": {
                            "currency": item.currency_id,
                            "amount": Math.trunc(item.price),
                            "decimals": item.price - Math.trunc(item.price)
                        },
                        "picture": item.thumbnail,
                        "condition": item.condition,
                        "free_shipping": item.shipping.free_shipping,
                        "address": item.address.state_name
                    }
                ]                    
            }
        ));       

        return items;
    }

    async getItem({ itemId }) {
        const itemRequest = await axios(`https://api.mercadolibre.com/items/${itemId}`);
        const itemDescriptionRequest = await axios(`https://api.mercadolibre.com/items/${itemId}/description`);

        const itemData = itemRequest.data;
        const itemCategoryId = itemData.category_id;
        const itemCategoryRequest = await axios(`https://api.mercadolibre.com/categories/${itemCategoryId}`);

        const itemCategory = itemCategoryRequest.data.name;
        const itemDescription = itemDescriptionRequest.data;

        const item = {
            "author": {
                "name": config.firstName,
                "lastname": config.lastname
            },
            "item": {
                "id": itemData.id,
                "title": itemData.title,
                "price": {
                    "currency": itemData.currency_id,
                    "amount": Math.trunc(itemData.price),
                    "decimals": itemData.price - Math.trunc(itemData.price)
                },
                "picture": itemData.pictures.slice(0,1).map(x => x.url).toString(),
                "condition": itemData.condition,
                "free_shipping": itemData.shipping.free_shipping,
                "sold_quantity": itemData.sold_quantity,
                "description": itemDescription.plain_text,
                "category": itemCategory
            }
        };
        
        return item;
    }
}

module.exports = ItemsService;