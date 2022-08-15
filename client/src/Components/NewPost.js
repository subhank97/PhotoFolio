import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NewPost() {

  return (
    <div className="post-form">
        <form onSubmit={() => console.log('submit')}>
            <div className="image-form">
                <input type="text" className="form-control" placeholder="Image " 
               />
            </div>
            <Form.Group className="article-description" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} placeholder="Description" 
             />
            </Form.Group>
            <div className="article-form-button">
            <Button type="submit" variant="secondary">Create</Button>
            </div>      
        </form>
    </div>
  )
}

export default NewPost;