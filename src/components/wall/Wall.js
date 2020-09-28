import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ADD_POST, DELETE_POST, POSTS, UPDATE_POST } from "../constantsGQL";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { simple, simpleError, confirmation } from "../common/SweetAlert";
import Dropzone from 'react-dropzone';
import { UploadFile } from "../../helpers/Uploads";
import '../../styles/Wall.scss';

function Wall(props) {
    const { register, handleSubmit, errors } = useForm();
    const [editPost, setEditPost] = useState({
        editedText: '',
        isActive: true,
        imageId: ''
    });
    const [createPost] = useMutation(ADD_POST, {
        refetchQueries: [{
            query: POSTS
        }]
    });
    const [updatePost] = useMutation(UPDATE_POST, {
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
                readAccess: data.readAccess,
                imageId: editPost.imageId
            }
        })
            .then(() => e.target.reset())
            .catch(() => simpleError('Ocurrió un error al crear la publicación'));
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditPost({...editPost, [name]: value})
    };

    useEffect(() => {
        if (data) {
            setPostList(data.posts.map(post => {
                return {
                    _id: post._id,
                    isActive: true,
                    text: post.text,
                    readAccess: post.readAccess,
                    fullFile: post.fullFile
                }
            }));
        }
    }, [data]);

    return (
        <div className="wall">
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
                            <div className="control">
                                <Dropzone onDrop={acceptedFiles => {
                                    UploadFile(acceptedFiles, 'posts')
                                        .then(imageId => {
                                            setEditPost({ ...editPost, imageId: imageId });
                                        })
                                        .catch(() => simpleError('Ocurrió un error al publicar la imagen'));
                                }}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Adjunta una imagen</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
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
                            </div>
                        </div>
                        <button
                            className="button"
                            type="submit"
                        >
                            Publicar
                        </button>
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
                                        <p className={ post.isActive ? "is-text post-text active" : 'is-text post-text'}>
                                            { post.text }
                                        </p>
                                        {
                                            post.fullFile &&
                                            <figure className="image is-3by1">
                                                <img src={post.fullFile} alt="image" />
                                            </figure>
                                        }
                                        <textarea
                                            className={ post.isActive ? 'input-text' : 'input-text active' }
                                            name="editedText"
                                            defaultValue={post.text}
                                            onChange={handleInputChange}
                                        />
                                        <a
                                            className="is-link"
                                            onClick={event => {
                                                confirmation()
                                                    .then((result) => {
                                                        if (result.isConfirmed) {
                                                            deletePost({ variables: { id: post._id } })
                                                                .then(() => simple('Publicación borrada exitosamente'))
                                                                .catch(() => simpleError('Ocurrió un error al borrar la publicación'))
                                                        }
                                                    })
                                            }}
                                        >Borrar</a>
                                        <button
                                            className={post.isActive ? 'button btn-edit active' : 'button btn-edit'}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const currentState = post.isActive;
                                                const updatedPostList = postList.map(item => item._id === post._id ? { ...item, isActive: !currentState } : item );
                                                setPostList(updatedPostList);
                                            }}
                                        >Editar
                                        </button>
                                        <button
                                            className={post.isActive ? 'button btn-save' : 'button btn-save active'}
                                            type="button"
                                            onClick={(e) => {
                                                updatePost({
                                                    variables: {
                                                        id: post._id,
                                                        readAccess: post.readAccess,
                                                        text: editPost.editedText
                                                    }
                                                })
                                                    .then(() => simple('Publicación actualizada exitosamente'))
                                                    .catch(() => simpleError('Ocurrió un error al actualizar la publicación'));
                                            }}
                                        >Guardar
                                        </button>
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