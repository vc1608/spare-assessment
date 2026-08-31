export const VIEWER_QUERY = `{ viewer { user { id name } } }`;

export const GET_POSTS_QUERY = `
  query GetPosts($first: Int) {
    posts(first: $first) {
      edges {
        node {
          id
          name
          tagline
        }
      }
    }
  }
`;

export const GET_TOPIC_QUERY = `
  query GetTopic($slug: String!) {
    topic(slug: $slug) {
      id
      name
      slug
    }
  }
`;

export const INTROSPECTION_QUERY = `{ __schema { queryType { name } } }`;

export const DEEPLY_NESTED_QUERY = `
  query {
    posts(first: 1) {
      edges {
        node {
          comments(first: 1) {
            edges {
              node {
                user {
                  submittedPosts(first: 1) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;