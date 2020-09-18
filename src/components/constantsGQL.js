import gql from 'graphql-tag';

const LOGIN = gql`
query($email: String!, $password: String!) {
    login(filters: { email: $email, password: $password }) {
        completeName
        email
        token
        errors {
            code
            message
        }
    }
}
`;

export {
    LOGIN
}