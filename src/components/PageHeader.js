import { Card, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme =>({
    root:{
        backgroundColor:"fdfdff"
    },
    pageHeader:{
        padding: theme.spacing(1),
        display: 'flex',
        marginBottom: theme.spacing(1)
    },
    pageIcon:{
        display:"inline-block",
        padding: theme.spacing(2),
        color: "#ff1744"
    },
    pageTitle:{
        paddingLeft: theme.spacing(2),
    }

}))

export default function PageHeader(props) {

    const classes = useStyles()
    const {title, subTitle, icon} = props

    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}> 
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography 
                        variant="h6"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="subtitle2"
                        component="div"
                    >
                        {subTitle}
                    </Typography>
                </div>
            </div>
        </Paper>
    )
}
