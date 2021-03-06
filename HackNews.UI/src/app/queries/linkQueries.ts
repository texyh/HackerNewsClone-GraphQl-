

import gql from 'graphql-tag'
import { Link } from '../models/link.model';
import { User } from '../models/user.model';


export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user{
          id
        }
      }
    }
  }
`;

export interface AllLinkQueryResponse {
  allLinks: Link[];
  loading: boolean;
}

export const ALL_LINKS_SEARCH_QUERY = gql`
query AllLinksSearchQuery($searchText: String!) {
  allLinks(filter: {
    OR: [{
      url_contains: $searchText
    }, {
      description_contains: $searchText
    }]
  }) {
    id
    url
    description
    createdAt
    postedBy {
      id
      name
    }
    votes {
      id
      user {
        id
      }
    }
  }
}
`;

export interface AllLinksSearchQueryResponse {
loading: boolean;
allLinks: Link[];
}

export const CREATE_LINK_MUTATION = gql`
mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
  createLink(
    description: $description,
    url: $url,
    postedById: $postedById
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

export const CREATE_VOTE_MUTATION = gql`
mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
  createVote(userId: $userId, linkId: $linkId) {
    id
    link {
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
`;

export interface CreateVoteMutationResponse {
loading: boolean;
createVote: {
  id: string;
  link: Link;
  user: User;
};
}