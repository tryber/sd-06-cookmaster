const { ObjectID } = require('mongodb');
const connection = require('../connection');

class Crud {
  constructor(model) {
    this.Model = model;
  }

  async create(queryParams) {
    const db = await connection();

    const modelCreated = await db.collection(this.Model).insertOne(queryParams);

    const [model] = modelCreated.ops;
    return model;
  }

  async findById(modelId) {
    const db = await connection();

    const modelInfo = await db.collection(this.Model).findOne({ _id: ObjectID(modelId) });

    return modelInfo;
  }

  async findOne(queryParams) {
    let queryToDB = queryParams;
    
    if (queryParams.id) {
      queryToDB = {
        ...queryParams,
        _id: ObjectID(queryParams.id),
      };
    }
    const db = await connection();

    const modelInfo = await db.collection(this.Model).findOne(queryToDB);

    return modelInfo;
  }

  async findAll() {
    const db = await connection();

    const modelsFound = await db.collection(this.Model).find().toArray();

    return modelsFound;
  }

  async update(modelId, updateFields) {
    const db = await connection();

    await db.collection(this.Model)
      .updateOne({ _id: ObjectID(modelId) }, updateFields);

    const model = await this.findById(modelId);
    return model;
  }

  async delete(modelId) {
    const db = await connection();

    await db.collection(this.Model)
      .deleteOne({ _id: ObjectID(modelId) });
  }
}

module.exports = Crud;
