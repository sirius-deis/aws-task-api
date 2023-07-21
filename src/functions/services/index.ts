import dynamoDbClient from '../db';
import ProductService from './productsService';

export default new ProductService(dynamoDbClient);
