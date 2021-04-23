import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Typography, 
    Container, 
    FormControl, 
    InputLabel, 
    FilledInput, 
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import blogServices from '../../services/blogs'
import BlogsContext from '../../context/BlogsContext'
import NotificationContext from '../../context/NotificationContext'

const useStyles = makeStyles({
    root: {
        width: 'auto',
        margin: 40,
        border: '1px solid #e6e6e6',
        boxShadow: '0px 0px 30px -20px rgba(0,0,0,0.75);',
        borderRadius: 20     
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        margin: 20,
    },
    input: {
        margin: 20
    },
    title: {
        margin: 20
    },
})

const Create = () => {
    const classes = useStyles()
    const { setNotification } = useContext(NotificationContext)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')

    const { createBlogContext } = useContext(BlogsContext)
    const history = useHistory()

    const handleCreate = async (e) => {
        e.preventDefault()

        try {
            const newBlog = {
                title: title,
                content: content,
                image: image,
                category: category
            }
            
            const createdBlog = await blogServices.createBlog(newBlog)
            createBlogContext(createdBlog)
            setNotification(`Blog has been created`, 'success')
            setTitle('')
            setContent('')
            setImage('')
            history.push('/')
        } catch (error) {
            setNotification(error.message, 'error')
        }
    }

    return (
        <Container  className={classes.root}>
            <Typography
                variant="h4" 
                component="h2"
                className={classes.title}
            >Create Blog</Typography>
            <form onSubmit={handleCreate} className={classes.form}>
                <FormControl variant="filled" className={classes.input}>
                    <InputLabel htmlFor="component-filled">Title</InputLabel>      
                    <FilledInput
                        type='text'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}  
                    />
                
                </FormControl>
                <FormControl variant="filled" className={classes.input}>        
                    <InputLabel htmlFor="component-filled">Content</InputLabel>
                    <FilledInput
                        type='text'
                        value={content} 
                        onChange={({ target }) => setContent(target.value)}
                    />
                </FormControl>
                <FormControl variant="filled" className={classes.input}>    
                    <InputLabel htmlFor="component-filled"> Image </InputLabel>
                    <FilledInput
                        type='text'
                        value={image} 
                        onChange={({ target }) => setImage(target.value)}
                    />
                </FormControl>
                <FormControl variant="filled" className={classes.input}>    
                    <InputLabel htmlFor="component-filled"> Category </InputLabel>
                    <FilledInput
                        type='text'
                        value={category} 
                        onChange={({ target }) => setCategory(target.value)}
                    />
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    type='submit'
                    className={classes.button}
                >
                    Create
                </Button>  
            </form>
        </Container>
    )
}

export default Create