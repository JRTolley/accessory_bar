export function makeDefaultContext() {
  return {
    session: { shop: undefined },
    request: { body: undefined },
    response: { body: undefined, status: undefined },
    cookies: {
      get: undefined,
    },
  };
}
