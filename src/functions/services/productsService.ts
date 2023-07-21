import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import productSchema from '../schemas/product';

export default class ProductService {
  private tableName: string = 'products';

  constructor(private docClient: DocumentClient) {}

  async getAllProducts(): Promise<productSchema[]> {
    const products = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return products.Items as productSchema[];
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
      throw new Error('Provided id does not exist');
    }

    return product.Item as productSchema;
  }

  async createProduct(product: productSchema): Promise<productSchema> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: product,
      })
      .promise();

    return product;
  }
}
