import React from 'react'
import { Button as MuiButton, makeStyles } from '@material-ui/core' 
import { Label } from '@material-ui/icons'

const useStyles = makeStyles(theme =>({
    root:{
        margin: theme.spacing(0.5)
    },
    label:{
        textTransform:'none'
    }
}))

export default function Button(props) {

    const {text, size, color, variant, onClick, ...others} = props
    const classes = useStyles()

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...others}
            classes={{root:classes.root,label:classes.label}}
        >

            {text}
        </MuiButton>
    )
}
