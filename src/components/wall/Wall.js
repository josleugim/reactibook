import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {ADD_POST, DELETE_POST, POSTS} from "../constantsGQL";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {simple, simpleError} from "../common/SweetAlert";

function Wall(props) {
    const { register, handleSubmit, errors } = useForm();
    const [createPost] = useMutation(ADD_POST, {
        refetchQueries: [{
            query: POSTS
        }]
    });
    const [postList, setPostList] = useState([]);
    const { loading, error, data } = useQuery(POSTS);
    const [filterValue, setFilterValue] = useState('');
    const [deletePost] = useMutation(DELETE_POST, {
       refetchQueries: [{
           query: POSTS
       }]
    });
    const postFormSubmit = (data, e) => {
        createPost({
            variables: {
                text: data.text,
                readAccess: data.readAccess
            }
        })
            .then(() => e.target.reset())
            .catch(() => simpleError('Ocurrió un error al crear la publicación'));
    };

    useEffect(() => {
        if (data) {
            setPostList(data.posts);
        }
    }, [data]);

    return (
        <div>
            <div className="columns">
                <div className="column">
                    <form className="box" onSubmit={handleSubmit(postFormSubmit)}>
                        <div className="field">
                            <div className="control">
                            <textarea
                                className="textarea"
                                name="text"
                                placeholder="¿Qué estas pensando?"
                                ref={register({ required: true })}
                            ></textarea>
                                { errors.text && (<p className="tag is-warning">El texto es requerido</p>) }
                            </div>
                            <div className="select">
                                <select
                                    name="readAccess"
                                    defaultValue="friends"
                                    ref={register()}
                                >
                                    <option value="friends">Amigos</option>
                                    <option value="public">Público</option>
                                </select>
                            </div>
                            <button
                                className="button"
                                type="submit"
                            >
                                Publicar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="section is-left">
                        <button
                            className="button"
                            onClick={() => setFilterValue('')}
                        >
                            Todos
                        </button>
                        <button
                            className="button"
                            onClick={() => setFilterValue('public')}
                        >
                            Público
                        </button>
                        <button
                            className="button"
                            onClick={() => setFilterValue('friends')}
                        >
                            Amigos
                        </button>
                    </div>
                </div>
            </div>
            {
                postList
                    .filter(post => {
                        if (filterValue) {
                            return post.readAccess === filterValue
                        }

                        return post
                    })
                    .map((post, index) => {
                    return (
                        <div className="columns" key={index}>
                            <div className="column">
                                <div className="box">
                                    <p>{ post.text }</p>
                                    <a
                                        className="is-link"
                                        onClick={event => {
                                            deletePost({ variables: { id: post._id } })
                                                .then(() => simple('Publicación borrada exitosamente'))
                                                .catch(() => simpleError('Ocurrió un error al borrar la publicación'))
                                        }}
                                    >Borrar</a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Wall