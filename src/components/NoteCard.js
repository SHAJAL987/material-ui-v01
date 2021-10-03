import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core'
import { blue, green, pink, yellow } from '@material-ui/core/colors';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import React from 'react'

const useStyles = makeStyles({
    test:{
        border: (note) => {
            if(note.gender == 'Others'){
                return '1px solid red'
            }
        }
    },
    avatar: {
        backgroundColor:(note) =>{
            if(note.gender == 'Male'){
              return green[500]
            }
            if(note.gender == 'Fmale'){
                return pink[500]
            }
            if(note.gender == 'Others'){
                return yellow[700]
            }
            return blue[500]
        }
    }

})

export default function NoteCard({note, handleDelete}) {

    const classes = useStyles(note)

    return (
        <div>
           <Card elevation={1}>
               <CardHeader 
                avatar={
                    <Avatar className={classes.avatar}>
                        {note.title[0].toUpperCase()}
                        
                    </Avatar>
                }
                action={
                    <IconButton onClick={()=> handleDelete(note.id)}>
                        <DeleteOutlinedIcon />
                    </IconButton>
                }
                title={note.title}
                subheader={note.gender}
               />
               <CardContent>
                   <Typography variant="body2" color="textSecondary">
                       {note.details}
                   </Typography>
               </CardContent>
               
           </Card>
        </div>
    )
}
