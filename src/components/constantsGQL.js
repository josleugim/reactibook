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
mutation($text: String!, $readAccess: String!, $imageId: String) {
    addPost(input: { text: $text, readAccess: $readAccess, imageId: $imageId }) {
        _id
        text
        readAccess
        fullFile
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
        fullFile
    }
}
`;

const UPDATE_POST = gql`
mutation($id: ID!, $text: String!, $readAccess: String!) {
    updatePost(id: $id, input: { text: $text, readAccess: $readAccess }) {
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
    DELETE_POST,
    UPDATE_POST
}