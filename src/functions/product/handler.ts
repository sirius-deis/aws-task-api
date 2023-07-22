import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';
import productService from '@functions/services';

const headers = {
  'Content-Type': 'application.json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

const ERROR_MESSAGE = 'Something went wrong';

export const getAllProducts = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const products = await productService.getAllProducts();

  return {
    statusCode: 200,
    body: JSON.stringify({ products }),
    headers,
  };
});

export const getProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const product = await productService.getProduct(id);

      return {
        statusCode: 200,
        body: JSON.stringify({ product }),
        headers,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          message: (error.statusCode && error.message && error.message) || ERROR_MESSAGE,
        }),
        headers,
      };
    }
  },
);

interface EventBody {
  body: {
    title: string;
    price: number;
  };
}

export const addProduct = middyfy(
  async (event: APIGatewayProxyEvent & EventBody): Promise<APIGatewayProxyResult> => {
    try {
      const product = await productService.createProduct({
        id: uuidv4(),
        title: event.body.title.trim(),
        price: event.body.price,
        createdAt: Date.now(),
      });

      return {
        statusCode: 201,
        body: JSON.stringify({ product }),
        headers,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          message: (error.statusCode && error.message && error.message) || ERROR_MESSAGE,
        }),
        headers,
      };
    }
  },
);

export const deleteProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;

    try {
      await productService.deleteProduct(id);

      return {
        statusCode: 204,
        body: undefined,
        headers,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          message: (error.statusCode && error.message && error.message) || ERROR_MESSAGE,
        }),
        headers,
      };
    }
  },
);

export const updateProduct = middyfy(
  async (event: APIGatewayProxyEvent & EventBody): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;

    const { title, price } = event.body;

    try {
      const updatedProduct = await productService.updateProduct(id, { title: title.trim(), price });

      return {
        statusCode: 200,
        body: JSON.stringify({ updatedProduct }),
        headers,
      };
    } catch (error) {
      return {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          message: (error.statusCode && error.message && error.message) || ERROR_MESSAGE,
        }),
        headers,
      };
    }
  },
);
