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
  query ($categoryId: Int!) {
    ProductByCategory(categoryId: $categoryId) {
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

export const GET_PRODUCTS_BY_NAME = gql`
  query ($name: String!) {
    ProductByName(name: $name) {
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

export const GET_CATEGORIES = gql`
  query ($page: Int!) {
    categories(page: $page) {
      id
      name
      picURL
      count
    }
  }
`;
