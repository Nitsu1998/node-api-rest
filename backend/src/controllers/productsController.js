import { ProductDao } from "../models/index.js";
import { faker } from '@faker-js/faker'
import logger from "../helpers/logger.js";

faker.locale = 'en'

class ProductsController {

  async getProductsController(req, res) {
    try {
      const products = await ProductDao.getAll();
      return res.json(products);
    } catch {
      logger.error(err)
      res.sendStatus(500);
    }
  }

  async postProductController(req, res) {
    try {
      await ProductDao.save(req.body)
      return res.sendStatus(201);
    } catch {
      logger.error(err)
      res.sendStatus(500);
    }
  }

  async getByIdController(req, res) {
    try {
      const product = await ProductDao.getById(req.params.id)
      if (product) {
        return(
          res.status(200).json(product)
        )
      } 
      if (!product) {
        return(
          res.status(404).json({ error: "Product not exist" })
        )
      } 
      return (res.status(204).json(product.message))
    } catch {
      logger.error(err)
      res.sendStatus(500);
    }
  }

  async updateByIdController(req, res) {
    try {
      const response = await ProductDao.updateById(req.params.id, req.body);
      if(response?.message) {
        return res.status(200).json(response)
      }
      return res.status(404).json(response)
    } catch {
      logger.error(err)
      res.sendStatus(500);
    }
  }

  async deleteByIdController(req, res) {
    try {
      const response = await ProductDao.deleteById(req.params.id) 
      if(response?.message) {
        return res.status(200).json(response)
      }
      return res.status(404).json(response)
    } catch {
      logger.error(err)
      res.sendStatus(500);
    }
  }
  
  async getRandomProductsController(req, res) {
    try{
      const products = []
      for (let i = 0; i <= 4; i++) {
        products.push ({
          name: faker.commerce.productName(),
          price: faker.commerce.price(0, 1000, 0, '$'),
          description: faker.commerce.productDescription(),
          image: faker.image.imageUrl('product'),
          code: '#' + faker.random.alphaNumeric(7),
          stock: faker.commerce.price(0, 100, 0),
          timestamp: faker.date.recent(10).getTime()
        })
      }
      return res.status(200).json(products)
    }catch(err){
      logger.error(err)
      console.log(err)
    }
  }
  
}
const productController = new ProductsController();

export default productController;
