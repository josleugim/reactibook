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

const ADD_POST = gql`
mutation($text: String!, $readAccess: String!) {
    addPost(input: { text: $text, readAccess: $readAccess }) {
        _id
        text
        readAccess
    }
}
`;

const DELETE_POST = gql`
mutation($id: ID!) {
    deletePost(id: $id)
}
`;

const POSTS = gql`
query($readAccess: String) {
    posts(filters: { readAccess: $readAccess }) {
        _id
        text
        readAccess
    }
}
`;

export {
    LOGIN,
    ADD_POST,
    POSTS,
    DELETE_POST
}