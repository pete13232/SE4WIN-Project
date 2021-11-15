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