import gql from 'graphql-tag';
import { User } from '../models/user.model';

export const CREATE_USER_MUTATION = gql`
mutation CreateUserMutation($name: String, $email: String, $password: String) {
  createUser(name: $name,authProvider: {email: {email: $email,password: $password}}) {
    id
  }

  signinUser(email: {email: $email,
    password: $password
  }) {
    token
    user {
      id
    }
  }
}
`;

export interface CreateUserMutationResponse {
loading: boolean;
createUser: User;
signinUser: {
  token: string,
  user?: User
};
}

export const SIGNIN_USER_MUTATION = gql`
mutation SigninUserMutation($email: String!, $password: String!) {
  signinUser(email: {
    email: $email,
    password: $password
  }) {
    token
    user {
      id
    }
  }
}
`;
export interface SigninUserMutationResponse {
    loading: boolean;
    signinUser: {
      token: string,
      user?: User
    };
  }
