import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';
import productService from '@functions/services';
import catchAndHeadersMiddleware from '@functions/utils/catchAndHeadersHandler';

export const getAllProducts = middyfy(
  catchAndHeadersMiddleware(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const result = await productService.getAllProducts(event.queryStringParameters?.nextPageKey);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }),
);

export const getProduct = middyfy(
  catchAndHeadersMiddleware(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const product = await productService.getProduct(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ product }),
    };
  }),
);

interface EventBody {
  body: {
    title: string;
    price: number;
    category: string;
  };
}

export const addProduct = middyfy(
  catchAndHeadersMiddleware(
    async (event: APIGatewayProxyEvent & EventBody): Promise<APIGatewayProxyResult> => {
      const product = await productService.createProduct({
        id: uuidv4(),
        title: event.body.title.trim(),
        price: event.body.price,
        createdAt: Date.now(),
        category: event.body.category.trim(),
      });

      return {
        statusCode: 201,
        body: JSON.stringify({ product }),
      };
    },
  ),
);

export const deleteProduct = middyfy(
  catchAndHeadersMiddleware(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;

    await productService.deleteProduct(id);

    return {
      statusCode: 204,
      body: undefined,
    };
  }),
);

export const updateProduct = middyfy(
  catchAndHeadersMiddleware(
    async (event: APIGatewayProxyEvent & EventBody): Promise<APIGatewayProxyResult> => {
      const id = event.pathParameters.id;

      const { title, price, category } = event.body;

      const updatedProduct = await productService.updateProduct(id, {
        title: title.trim(),
        price,
        category,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ updatedProduct }),
      };
    },
  ),
);
