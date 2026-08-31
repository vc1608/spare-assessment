import { expect, test, describe } from "bun:test";
import { sendGraphQLRequest } from "../utils/api-client";
import { TEST_DATA } from "../config/test-data";
import {
  VIEWER_QUERY,
  GET_POSTS_QUERY,
  GET_TOPIC_QUERY,
  INTROSPECTION_QUERY,
  DEEPLY_NESTED_QUERY,
} from "./graphql-queries";

describe("Product Hunt GraphQL API Suite", () => {
  test("1. Should return an error when request is unauthenticated", async () => {
    const { status, body } = await sendGraphQLRequest(VIEWER_QUERY, {}, "");
    expect(status).toBe(401);
  });

  test("2. Should handle malformed GraphQL syntax gracefully without crashing", async () => {
    const { status, body } = await sendGraphQLRequest(TEST_DATA.MALFORMED_QUERY);
    expect(status).toBe(200);
    expect(body.errors).toBeDefined();
  });

  test("3. Should fetch list of posts with valid structure", async () => {
    const { status, body } = await sendGraphQLRequest(GET_POSTS_QUERY, { first: 3 });
    expect(status).toBe(200);
    if (body.data) {
      expect(Array.isArray(body.data.posts.edges)).toBe(true);
    }
  });

  test("4. Should reject requests made with invalid HTTP methods (GET)", async () => {
    const response = await fetch(TEST_DATA.GRAPHQL_ENDPOINT, { method: "GET" });
    expect(response.status).not.toBe(200);
  });

  test("5. Should return null for an invalid topic", async () => {
    const { status, body } = await sendGraphQLRequest(GET_TOPIC_QUERY, {
      slug: TEST_DATA.INVALID_TOPIC_SLUG,
    });
    expect(status).toBe(200);
    if (body.data) {
      expect(body.data.topic).toBeNull();
    }
  });

  test("6. Should enforce application/json Content-Type requirement", async () => {
    const response = await fetch(TEST_DATA.GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: VIEWER_QUERY,
    });
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test("7. Should support schema introspection queries", async () => {
    const { status, body } = await sendGraphQLRequest(INTROSPECTION_QUERY);
    expect(status).toBe(200);
    if (body.data) {
      expect(body.data.__schema.queryType.name).toBe("Query");
    }
  });

  test("8. Should accept and process complex nested query resolutions", async () => {
    const { status, body } = await sendGraphQLRequest(DEEPLY_NESTED_QUERY);
    expect(status).toBe(200);
    expect(body).toHaveProperty("data");
  });
});