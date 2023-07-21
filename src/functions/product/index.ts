import { handlerPath } from '@libs/handler-resolver';

export const getAllProducts = {
  handler: `${handlerPath(__dirname)}/handler.getAllProducts`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
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
        path: 'products',
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
      },
    },
  ],
};

export const updateProduct = {
  handler: `${handlerPath(__dirname)}/handler.updateProduct`,
  events: [
    {
      http: {
        method: 'patch',
        path: 'products/{id}',
      },
    },
  ],
};
