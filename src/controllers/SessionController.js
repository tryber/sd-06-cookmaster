const { CreateSessionService } = require('../services/index');

class SessionController {
  async create(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this
    const createSessionService = new CreateSessionService();

    const token = await createSessionService.execute(req.body);

    const SESSION_CREATED = 200;

    return res.status(SESSION_CREATED).json({ token });
  }

  // async list(req, res) {
  //   const listProductService = new ListProductsService();

  //   const products = await listProductService.execute();

  //   const PRODUCT_FOUND = 200;

  //   return res.status(PRODUCT_FOUND).json({ products });
  // }

  // async show(req, res) {
  //   const { id } = req.params;

  //   const getProductByIdService = new GetProductByIdService();

  //   const productFound = await getProductByIdService.execute(id);

  //   const PRODUCT_FOUND = 200;

  //   return res.status(PRODUCT_FOUND).json(productFound);
  // }

  // async update(req, res) {
  //   const { id } = req.params;

  //   const getProductByIdService = new GetProductByIdService();

  //   const updateProductService = new UpdateProductService();

  //   await getProductByIdService.execute(id);

  //   const updatedProduct = await updateProductService.execute(id, req.body);

  //   const PRODUCT_UPDATED = 200;

  //   return res.status(PRODUCT_UPDATED).json(updatedProduct);
  // }

  // async delete(req, res) {
  //   const { id } = req.params;

  //   const getProductByIdService = new GetProductByIdService();

  //   const deleteProductService = new DeleteProductService();

  //   const productDeleted = await getProductByIdService.execute(id);

  //   await deleteProductService.execute(id, req.body);

  //   const PRODUCT_DELETED = 200;

  //   return res.status(PRODUCT_DELETED).json(productDeleted);
  // }
}

module.exports = SessionController;
