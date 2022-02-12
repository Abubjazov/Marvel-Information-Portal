import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import useMarvelService from '../../services/MarvelService'
import { ErrorMsg } from '../errorMsg/errorMsg'

import './CharSearchForm.scss'


const setContent = (status, Component, data) => {
    switch (status) {
        case 'waiting':
            return <Component data={data} />

        case 'loading':
            return <Component data={data} />

        case 'confirmed':
            return <Component data={data} />

        case 'error':
            return <ErrorMsg />

        default:
            throw new Error('Unexpected process state!')
    }
}

export const CharSearchForm = () => {
    const [character, setCharacter] = useState(null)
    const { status, setStatus, getCharacterByName, clearError } = useMarvelService()

    const onCharacterLoaded = (character) => {
        setCharacter(character)
    }

    const updateCharacter = (name) => {
        clearError()

        getCharacterByName(name)
            .then(onCharacterLoaded)
            .then(() => setStatus('confirmed'))
    }

    return (
        <div className="char__search-form">
            {setContent(status, View, { character, status, updateCharacter })}
        </div>
    )
}

const View = ({ data }) => {
    const { character, status, updateCharacter } = data

    const results = !character ? null : character.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {character[0].name} page?</div>
            <Link to={`/characters/${character[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>

    return (
        <>
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({ charName }) => {
                    updateCharacter(charName)
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name="charName"
                            type="text"
                            placeholder="Enter name" />
                        <button
                            type="submit"
                            className="button button__main"
                            disabled={status === 'loading'}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <ErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
        </>
    )
}
