export const TEST_DATA = {
  GRAPHQL_ENDPOINT: "https://api.producthunt.com/v2/api/graphql",
  DEV_TOKEN: process.env.PRODUCT_HUNT_TOKEN || "fake_dev_token_for_ci",
  SEARCH_QUERY: "Hyperfocus",
  INVALID_TOPIC_SLUG: "non-existent-topic-slug-9999",
  VALID_TOPIC_SLUG: "tech",
  INVALID_EMAIL: "invalid-email-format",
  MALFORMED_QUERY: "query { posts { edges { node { invalidFieldSyntax } } }",
};