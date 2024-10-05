import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import request from '../../../APIs/userApi';
import { toast } from 'sonner';

function BorrowedBookCard({ id, book,onReturnBook }) {

    
    const handleReturn= (id) => {
      
      request("PUT",`/api/user/returnBook?id=${id}`)
      .then((response)=>{
        console.log("borrow :" +response.data.message)
        if(response.data.status == 200) {
          toast.success(response.data.message);
          onReturnBook(id);
        } else {
          toast.error(response.data.message);
        }
      }).catch((error)=>{
        toast(error.data);
      })
    }

    const borrowedAt = new Date(book.borrowed_at); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

// Format the date
const formattedDate = borrowedAt.toLocaleDateString('en-US', options);

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: 345 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {book.book.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    Author: {book.book.author}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {book.book.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {formattedDate}
                </Typography>
            </CardContent>
            <CardActions>
            <Button 
                size="small" 
                // disabled={quantity < 1}
                onClick={() => handleReturn(book.id)}
                sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: '#b00020' } }} 
            >
                Return
            </Button>
            </CardActions>

        </Card>
    );
}

export default BorrowedBookCard;
