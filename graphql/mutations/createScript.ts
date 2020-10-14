import gql from "graphql-tag";

export const createScript = gql`
    mutation createScript($displayScope: String!, src=)

`;
