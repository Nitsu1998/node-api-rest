const fs = require("fs");

class Products {
  constructor(fileName) {
    this.fileName = fileName;
  }
  async save(newProduct) {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(`./${this.fileName}`, "utf-8")
      );
      const id = data.length + 1;
      data.push({ id: id, ...newProduct });
      await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data));
      return { message: `Product added id: ${id}` };
    } catch (err) {
      console.log(err);
    }
  }
  async getById(id) {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(`./${this.fileName}`, "utf-8")
      );
      const product = data.find((product) => product.id === id);
      if (product?.deleted) {
        return { message: "This product has the information deleted" };
      } else if (!product) {
        return null;
      } else {
        return product;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
  async updateById(id, infoToUpdate) {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(`./${this.fileName}`, "utf-8")
      );
      const product = data.find((product) => product.id === id);
      if (!product) {
        return null;
      } else {
        let productsUpdate = [];
        const { title, price, img } = infoToUpdate;
        data.forEach((element) => {
          if (element.id === id) {
            productsUpdate.push({ id, title, price, img });
          } else {
            productsUpdate.push(element);
          }
        });
        await fs.promises.writeFile(
          `./${this.fileName}`,
          JSON.stringify(productsUpdate)
        );
        return { message: `Product updated id: ${id}` };
      }
    } catch (err) {
      console.log(err);
    }
  }
  async deleteById(id) {
    try {
      let productUpdate = [];
      let data = JSON.parse(
        await fs.promises.readFile(`./${this.fileName}`, "utf-8")
      );
      data.forEach((element) => {
        if (element.id !== id) {
          productUpdate.push(element);
        } else {
          productUpdate.push({ id: id, deleted: true });
        }
      });
      await fs.promises.writeFile(
        `./${this.fileName}`,
        JSON.stringify(productUpdate)
      );
    } catch (err) {
      console.log(err);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  }
}

const product1 = new Products("products.txt");

module.exports = product1;