import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import request from '../../../APIs/userApi';
import { toast } from 'sonner';

function BookCard({ id, book }) {

    const { title, author, description, quantity } = book;

    const handleBorrow= (bookId) => {
      
      request("POST",`/api/user/borrowBook?bookId=${bookId}`)
      .then((response)=>{
        console.log("borrow :" +response.data.message)
        if(response.data.status == 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }).catch((error)=>{
        toast(error.data);
      })
    }


    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 345 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Author: {author}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
                <Typography variant="body2" sx={{ 
                    fontWeight: 'bold', 
                    marginTop: '10px', 
                    color: quantity < 1 ? 'red' : 'green'
                }}>
                    {quantity < 1 ? 'Out of Stock' : 'In Stock'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    disabled={quantity < 1}
                    onClick={()=>handleBorrow(book.id)}
                >
                    Borrow
                </Button>
            </CardActions>
        </Card>
    );
}

export default BookCard;
