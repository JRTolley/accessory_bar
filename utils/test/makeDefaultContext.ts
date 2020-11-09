export function makeDefaultContext() {
  return {
    session: { shop: undefined },
    request: { body: undefined },
    response: { body: { status: undefined } },
    cookies: {
      get: undefined,
    },
  };
}
