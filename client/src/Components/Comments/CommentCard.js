import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function CommentCard({ comment, id, user, getComments,setComments,comments}){

  function handleDeleteComment(id){
    fetch(`/comments/${id}`, { 
      method: 'DELETE' 
    })
    .then((resp) => resp.json())
    .then(data=>{
      console.log(data)
      setComments(comments.filter(e=> e.id !== data.id))
    })
  }

  return (
    <div>
    <List sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline', padding:2 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment} - 
              </Typography>
              {user}
            </React.Fragment>
          }
        />
        <button className="delete-comment" onClick={() => handleDeleteComment(id)}>X</button>
      </ListItem>
      <Divider variant="inset" component="li" />
      </List>
    </div>
  )
}

export default CommentCard;

{/* <div className="comment-card">
{comment ? 
<div>
    <p className='display-comment'>
  "{comment}" - {user}
  </p>
  <button className="delete-comment" onClick={() => handleDeleteComment(id)}>X</button>
  </div> : "" }
</div> */}