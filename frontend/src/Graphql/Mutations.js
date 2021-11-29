import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      email
      password
      firstname
      lastname
      address
      phoneNumber
      role
    }
  }
`;
export const LOGIN_USER = gql`
  mutation ($input: LoginUserInput!) {
    login(loginUserInput: $input)
  }
`;

export const CREATE_ORDER = gql`
  mutation ($input: CreateOrderInput!) {
    createOrder(createOrderInput: $input) {
      id
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
      email
      firstname
      lastname
      phoneNumber
      address
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation ($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
    }
  }
`;

export const UPDATE_STOCK = gql`
  mutation ($quantity: Int!, $productId: Int!) {
    updateStock(quantity: $quantity, productId: $productId) 
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation ($input: UpdateProductInput!) {
    updateProduct(updateProductInput: $input) {
      id
    }
  }
`;


export const REMOVE_PRODUCT = gql`
  mutation ($input: Int!) {
    removeProduct(id: $input) 
  }
`;

export const CHANGE_STATUS = gql`
  mutation ($id: Int!,$status:Order_Status!) {
    changeStatus(id: $id,status:$status) 
  }
`;

export const CREATE_CATEGORY = gql`
  mutation ($input:CreateCategoryInput! ) {
    createCategory(createCategoryInput:$input) {
      name
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation ($input:UpdateCategoryInput! ) {
    updateCategory(updateCategoryInput:$input) {
      name
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation ($input: Int!) {
    removeCategory(id: $input) 
  }
`;

export const UPDATE_ORDER = gql`
  mutation ($input: UpdateOrderInput!) {
    updateOrder(updateOrderInput: $input) {
      id
    }
  }
`;

