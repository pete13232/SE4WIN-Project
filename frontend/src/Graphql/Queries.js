import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      picURL
    }
  }
`;
export const GET_USER_ORDERS = gql`
  query{
    orderByUser{
      id
      product{
        name
        picURL
      }
      quantity
      netPrice
      order_address
      status
    }
  }
`;

export const GET_PRODUCT_INFO = gql`
  query($input:Int!) {
    product(id:$input){
      category{
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
  query{
    me{
      address
    }
  }
`;

export const GET_USER_INFO = gql`
  query {
    me{
      email
      firstname
      lastname
      address
      phoneNumber
  }
}
`;

