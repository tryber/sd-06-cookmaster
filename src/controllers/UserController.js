const User = require('../database/models/User');

const HashProvider = require('../providers/hashProvider');

const CreateUserService = require('../services/CreateUserService');
// const ListProductsService = require('../services/ListProductsService');
// const FindProductByIDService = require('../services/FindProductByIDService');
// const UpdateProductService = require('../services/UpdateProductService');
// const DeleteProductByIDService = require('../services/DeleteProductByIDService');

class ProductController {
  async create(request, response) {
    this.count += 1;
    const { name, email, password, role } = request.body;

    const userModel = new User();
    const hashProvider = new HashProvider();
    const createUserService = new CreateUserService(userModel, hashProvider);

    const userToCreate = { name, email, password, role };

    const newProduct = await createUserService.execute(userToCreate);

    const CREATED = 201;

    return response.status(CREATED).json(newProduct);
  }

  // async list(_request, response) {
  //   const productModel = new Product();
  //   const listProductsService = new ListProductsService(productModel);

  //   const products = await listProductsService.execute();

  //   const SUCCESS = 200;

  //   return response.status(SUCCESS).json({ products });
  // }

  // async show(request, response) {
  //   const { id: productID } = request.params;

  //   const productModel = new Product();
  //   const findProductByIDService = new FindProductByIDService(productModel);

  //   const product = await findProductByIDService.execute(productID);

  //   const SUCCESS = 200;

  //   return response.status(SUCCESS).json(product);
  // }

  // async update(request, response) {
  //   const { id } = request.params;
  //   const { name, quantity } = request.body;

  //   const productModel = new Product();
  //   const updateProductService = new UpdateProductService(productModel);

  //   const productToUpdate = {
  //     id,
  //     name,
  //     quantity,
  //   };

  //   const newProductInfo = await updateProductService.execute(productToUpdate);

  //   const UPDATED = 200;

  //   return response.status(UPDATED).json(newProductInfo);
  // }

  // async delete(request, response) {
  //   const { id: productID } = request.params;

  //   const productModel = new Product();
  //   const deleteProductByIDService = new DeleteProductByIDService(productModel);

  //   const deletedProduct = await deleteProductByIDService.execute(productID);

  //   const SUCCESS = 200;

  //   return response.status(SUCCESS).json(deletedProduct);
  // }
}

module.exports = ProductController;
