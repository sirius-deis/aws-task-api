import { handlerPath } from '@libs/handler-resolver';

const inputType = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
  },
  required: ['title', 'price', 'category'],
};

export const getAllProducts = {
  handler: `${handlerPath(__dirname)}/handler.getAllProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/',
        cors: true,
      },
    },
  ],
};

export const getProduct = {
  handler: `${handlerPath(__dirname)}/handler.getProduct`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true,
      },
    },
  ],
};

export const addProduct = {
  handler: `${handlerPath(__dirname)}/handler.addProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products/',
        cors: true,
        request: {
          schemas: {
            'application/json': inputType,
          },
        },
      },
    },
  ],
};

export const deleteProduct = {
  handler: `${handlerPath(__dirname)}/handler.deleteProduct`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'products/{id}',
        cors: true,
      },
    },
  ],
};

export const updateProduct = {
  handler: `${handlerPath(__dirname)}/handler.updateProduct`,
  events: [
    {
      http: {
        method: 'put',
        path: 'products/{id}',
        cors: true,
        request: {
          schemas: {
            'application/json': inputType,
          },
        },
      },
    },
  ],
};
