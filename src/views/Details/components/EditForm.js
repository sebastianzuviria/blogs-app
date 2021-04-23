import React, { useState, useContext } from 'react'
import { 
    Container, 
    FormControl, 
    InputLabel, 
    FilledInput, 
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import blogServices from '../../../services/blogs'
import BlogsContext from '../../../context/BlogsContext'
import NotificationContext from '../../../context/NotificationContext'

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
        margin: 10,
    },
    input: {
        margin: 20
    }
})

const EditForm = ({ id, title, content, image, category, setEdit }) => {
    const classes = useStyles()
    const { setNotification } = useContext(NotificationContext)

    const [editedTitle, setEditedTitle] = useState(title)
    const [editedContent, setEditedContent] = useState(content)
    const [editedImage, setEditedImage] = useState(image)
    const [editedCategory, setEditedCategory] = useState(category)

    const { editBlogContext } = useContext(BlogsContext)

    const handleEditBlog = async (e) => {
        e.preventDefault()

        const newBlog = {
            id: id,
            title: editedTitle,
            content: editedContent,
            image: editedImage,
            category: editedCategory
        }

        try {
            const editedBlog = await blogServices.editBlog(newBlog)
            editBlogContext(editedBlog)
            setNotification(`Blog has been edited`, 'success')
            setEdit(false)
        } catch (error) {
            setNotification(error.message, 'error')
        }    
    }

    return (
        <Container className={classes.root}>
            <form onSubmit={handleEditBlog} className={classes.form}>
                <FormControl variant="filled" className={classes.input}>
                    <InputLabel htmlFor="component-filled">Title</InputLabel>      
                    <FilledInput
                        type='text'
                        value={editedTitle}
                        onChange={({ target }) => setEditedTitle(target.value)}  
                    />
                
                </FormControl>
                <FormControl variant="filled" className={classes.input}>        
                    <InputLabel htmlFor="component-filled">Content</InputLabel>
                    <FilledInput
                        type='text'
                        value={editedContent} 
                        onChange={({ target }) => setEditedContent(target.value)}
                    />
                </FormControl>
                <FormControl variant="filled" className={classes.input}>    
                    <InputLabel htmlFor="component-filled"> Image </InputLabel>
                    <FilledInput
                        type='text'
                        value={editedImage} 
                        onChange={({ target }) => setEditedImage(target.value)}
                    />
                </FormControl>
                <FormControl variant="filled" className={classes.input}>    
                    <InputLabel htmlFor="component-filled"> Category </InputLabel>
                    <FilledInput
                        type='text'
                        value={editedCategory} 
                        onChange={({ target }) => setEditedCategory(target.value)}
                    />
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    type='submit'
                    className={classes.button}
                >
                    Confirm
                </Button>  
            </form>
        </Container>
    )
}

export default EditForm