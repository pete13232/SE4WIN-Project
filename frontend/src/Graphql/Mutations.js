import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
        $username: String!
        $password: String!
        $firstname: String!
        $lastname: String!
        $address: String!
        $phoneNumber: String!
        $email: String!
    )  {
        createUser(
            createUserInput: {
            username:  $username
            password: $password
            firstname: $firstname
            lastname: $lastname
            address: $address
            phoneNumber: $phoneNumber
            email: $email
            roleId: CUSTOMER
            }
        )
        {
            username
            password
            firstname
            lastname
            address
            phoneNumber
            email
            role
        }
    }
    
`;
