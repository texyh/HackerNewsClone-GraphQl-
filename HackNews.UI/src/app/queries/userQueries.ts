import gql from 'graphql-tag';
import { User } from '../models/user.model';

export const CREATE_USER_MUTATION = gql`
mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
  signupUser(
    name: $name,
    email: $email,
    password: $password)
  {
    id,
    token
  }

}
`;

export interface CreateUserMutationResponse {
loading: boolean;
signupUser: {
  token: string,
  id: string
};
}

export const SIGNIN_USER_MUTATION = gql`
mutation SigninUserMutation($email: String!, $password: String!) {
  authenticateUser(
    email: $email,
    password: $password
  ) {
    token
    id
  }
}
`;
export interface SigninUserMutationResponse {
    loading: boolean;
    signinUser: {
      token: string,
      id: string
    };
  }
