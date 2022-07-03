import cart1 from "../classCart.js";
import product1 from "../classProducts.js";

class CartController {
  constructor() {}
  async createCartController(req, res) {
    try {
      const cart = { timestamp: Date.now(), products: [] };
      const response = await cart1.save(cart);
      res.status(201).json(response);
    } catch {
      res.sendStatus(500);
    }
  }

  async deleteCartController(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "The parameter is not a number" });
        return;
      }
      await cart1.deleteById(id);
      res.status(200).json({ message: `Cart deleted with id: ${id}` });
    } catch {
      res.sendStatus(500);
    }
  }

  async getProductsInCartByIdController(req, res) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "The parameter is not a number" });
        return;
      }
      const response = await cart1.getProductsInCartById(id);
      res.status(200).json(response);
    } catch {
      res.sendStatus(500);
    }
  }

  async postProductInCartByIdController(req, res) {
    try {
      const idCart = Number(req.params.id);
      const idProduct = Number(req.body.id);
      if (isNaN(idCart) || isNaN(idProduct)) {
        return res.status(400).json({ error: "The parameter is not a number" });
      }
      const product = await product1.getById(idProduct);
      if (product) {
        const response = await cart1.addProduct(idCart, product);
        res.status(200).json(response);
      } else if (!product) {
        res.status(404).json({ error: "Product not exist" });
      } else {
        res.status(204).json(product.message);
      }
    } catch {
      res.sendStatus(500);
    }
  }

  async deleteProductInCartByIdController(req, res) {
    try {
      const idCart = Number(req.params.id);
      const idProduct = Number(req.params.id_prod);
      if (isNaN(idCart) || isNaN(idProduct)) {
        return res.status(400).json({ error: "The parameter is not a number" });
      }
      const response = await cart1.deleteProductFromCart(idCart, idProduct);
      res.status(200).json(response);
    } catch {
      res.sendStatus(500);
    }
  }
}

const cartController = new CartController();

export default cartController;
