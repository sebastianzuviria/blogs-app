import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Button, Box } from '@material-ui/core'
import blogServices from '../../services/blogs'
import BlogsContext from '../../context/BlogsContext'
import EditForm from './components/EditForm'

const useStyles = makeStyles({
    root: {
        marginTop: 50,
        border: '1px solid #e6e6e6',
        boxShadow: '0px 0px 30px -20px rgba(0,0,0,0.75);',
        borderRadius: 20,
        padding: 20
    },
    title: {
        marginBottom: 50
    },
    content: {
        padding: 20,
    },
    user: {
        marginBottom: 20 
    }
})

const Details = () => {
    const classes = useStyles()
    const [blog, setBlog] = useState(null)
    const [edit, setEdit] = useState(false)

    const id = useParams().id
    const { blogs } = useContext(BlogsContext)
    
    useEffect(() => {
        (async () => {
            const blog = await blogServices.getBlogById(id)
            setBlog(blog)
        })()
    }, [id, blogs])
    
    return (
        <Container className={classes.root}>
            <Typography 
                variant="h4" 
                component="h2"
                className={classes.title}
            >
                Details            
            </Typography>
            {blog && 
                <Container fixed>
                    <Typography variant="h5" component="h2">
                        {blog.title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        component="p"
                        className={classes.content}
                    >
                        {blog.content}
                    </Typography>
                    <Typography
                        className={classes.user}
                    >
                        Category: {blog.category.name}
                    </Typography>
                    <Typography
                        className={classes.user}
                    >
                        Image: {blog.image}
                    </Typography>
                    <Typography
                        className={classes.user}
                    >
                        Creation Date: {blog.createdAt}
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="default"
                        onClick={() => setEdit(!edit)}
                    >
                        Edit
                    </Button>
                    <Box style={{ display: edit ? '' : 'none' }}>
                        <EditForm 
                            id={blog.ID}
                            title={blog.title}
                            content={blog.content}
                            image={blog.image}
                            category={blog.category.name}
                            setEdit={setEdit}
                        />
                    </Box>
                </Container>
            }
        </Container>
    )
}

export default Details