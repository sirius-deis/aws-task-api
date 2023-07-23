import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import productSchema from '../schemas/product';
import AppError from '@functions/utils/appError';

export enum SORT_OPTIONS {
  PRICE = 'price',
  CREATED_AT = 'createdAt',
}

export default class ProductService {
  private tableName: string = 'products';

  constructor(private docClient: DocumentClient) {}

  private validateInput(title: string, price: number, category: string): void | never {
    if (
      title.length < 4 ||
      title.length > 256 ||
      price < 1 ||
      category.length < 2 ||
      category.length > 36
    ) {
      throw new AppError('Input does not pass validation', 400);
    }
  }

  async getAllProducts(
    sortField: SORT_OPTIONS = SORT_OPTIONS.CREATED_AT,
  ): Promise<productSchema[]> {
    const products = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    const sortedProducts = (products.Items as productSchema[]).sort(
      (p1, p2) => p1[sortField] - p2[sortField],
    );

    return sortedProducts;
  }

  async getProduct(id: string): Promise<productSchema | never> {
    const product = await this.docClient
      .get({
        TableName: this.tableName,
        Key: {
          id,
        },
      })
      .promise();

    if (!product.Item) {
      throw new AppError('Provided id does not exist', 404);
    }

    return product.Item as productSchema;
  }

  async createProduct(product: productSchema): Promise<productSchema> {
    this.validateInput(product.title, product.price, product.category);

    await this.docClient
      .put({
        TableName: this.tableName,
        Item: product,
      })
      .promise();

    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.getProduct(id);

    await this.docClient
      .delete({
        TableName: this.tableName,
        Key: {
          id,
        },
      })
      .promise();
  }

  async updateProduct(
    id: string,
    fieldsToUpdate: { title?: string; price?: number; category: string },
  ): Promise<productSchema | never> {
    await this.getProduct(id);
    this.validateInput(fieldsToUpdate.title, fieldsToUpdate.price, fieldsToUpdate.category);

    const updatedProduct = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `set ${Object.keys(fieldsToUpdate)
          .map((key) => `#${key} = :${key}`)
          .join(', ')}`,
        ExpressionAttributeNames: Object.keys(fieldsToUpdate).reduce(
          (acc, key) => ({ ...acc, [`#${key}`]: key }),
          {},
        ),
        ExpressionAttributeValues: Object.entries(fieldsToUpdate).reduce(
          (acc, [key, value]) => ({ ...acc, [`:${key}`]: value }),
          {},
        ),
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return updatedProduct.Attributes as productSchema;
  }
}
