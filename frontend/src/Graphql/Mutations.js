import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
        $email: String!
        $password: String!
        $firstname: String!
        $lastname: String!
        $address: String!
        $phoneNumber: String!
    )  {
        createUser(
            createUserInput: {
            email: $email
            password: $password
            firstname: $firstname
            lastname: $lastname
            address: $address
            phoneNumber: $phoneNumber
            role: CUSTOMER
            }
        )
        {
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
