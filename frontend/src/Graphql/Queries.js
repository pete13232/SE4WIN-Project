import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query ($sort: Int!, $page: Int!) {
    products(sort: $sort, page: $page) {
      data {
        id
        name
        price
        picURL
      }
      totalCount
    }
  }
`;
export const GET_USER_ORDERS = gql`
  query {
    orderByUser {
      id
      product {
        name
        picURL
      }
      quantity
      netPrice
      orderAddress
      status
    }
  }
`;

export const GET_PRODUCT_INFO = gql`
  query ($input: Int!) {
    product(id: $input) {
      category {
        name
      }
      name
      desc
      price
      picURL
      stock
    }
  }
`;
export const GET_USER_ADDRESS = gql`
  query {
    me {
      address
    }
  }
`;

export const GET_USER_INFO = gql`
  query {
    me {
      email
      firstname
      lastname
      address
      phoneNumber
    }
  }
`;

export const ADMIN_GET_PRODUCTS = gql`
  query {
    AdminProducts {
      id
      name
      category {
        name
      }
      desc
      price
      picURL
      stock
    }
  }
`;
export const ADMIN_SEARCH_PRODUCTS = gql`
  query ($name: String!) {
    AdminProductByName(name: $name) {
      data {
        id
        name
        category {
          name
        }
        desc
        price
        picURL
        stock
      }
    }
  }
`;

export const ADMIN_GET_CATEGORIES = gql`
  query {
    AdminCategories {
      id
      name
      picURL
    }
  }
`;

export const ADMIN_GET_ORDERS = gql`
  query {
    orders {
      id
      user {
        id
      }
      product {
        id
        name
      }
      quantity
      orderAddress
      netPrice
      receiptURL
      status
    }
  }
`;
export const ADMIN_SEARCH_ORDERS = gql`
  query ($id: Int!) {
    order(id: $id) {
      id
      user {
        id
      }
      product {
        id
        name
      }
      quantity
      orderAddress
      netPrice
      receiptURL
      status
    }
  }
`;
export const ADMIN_GET_USER_INFO = gql`
  query ($input: Int!) {
    user(id: $input) {
      id
      email
      firstname
      lastname
      address
      phoneNumber
    }
  }
`;
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query ($categoryId: Int!, $sort: Int!, $page: Int!) {
    ProductByCategory(categoryId: $categoryId, sort: $sort, page: $page) {
      data {
        id
        category {
          name
        }
        name
        desc
        price
        picURL
        stock
      }
      totalCount
    }
  }
`;

export const GET_PRODUCTS_BY_NAME = gql`
  query ($name: String!, $sort: Int!, $page: Int!) {
    ProductByName(name: $name, sort: $sort, page: $page) {
      data {
        id
        category {
          name
        }
        name
        desc
        price
        picURL
        stock
      }
      totalCount
      hasNextPage
    }
  }
`;

export const GET_CATEGORY = gql`
  query ($id: Int!) {
    category(id: $id) {
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      picURL
    }
  }
`;
export const GET_CATEGORIES_BY_NAME = gql`
  query ($name: String!) {
    AdminCategoriesByName(name: $name) {
      data {
        id
        name
        picURL
      }
    }
  }
`;
