import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';
import productService from '@functions/services';

const headers = {
  'Content-Type': 'application.json',
};

export const getAllProducts = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const products = await productService.getAllProducts();
  return formatJSONResponse({
    statusCode: 200,
    body: { products },
    headers,
  });
});

export const getProduct = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const product = await productService.getProduct(id);

      return formatJSONResponse({
        statusCode: 200,
        body: { product },
        headers,
      });
    } catch (error) {
      return formatJSONResponse({ statusCode: 500, message: error });
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
        title: event.body.title,
        price: event.body.price,
        createdAt: Date.now(),
      });

      return formatJSONResponse({
        statusCode: 201,
        body: { product },
        headers,
      });
    } catch (error) {
      return formatJSONResponse({ statusCode: 500, message: error });
    }
  },
);
