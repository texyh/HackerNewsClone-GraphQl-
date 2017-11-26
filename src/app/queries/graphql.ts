

import gql from 'graphql-tag'
import { Link } from '../models/link.model';


export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`;

export interface AllLinkQueryResponse {
  allLinks: Link[];
  loading: boolean;
}

export const CREATE_LINK_MUTATION = gql`
# 2
mutation CreateLinkMutation($description: String!, $url: String!) {
  createLink(
    description: $description,
    url: $url,
  ) {
    id
    createdAt
    url
    description
  }
}
`;

export interface CreateLinkMutationResponse {
createLink: Link;
loading: boolean;
}