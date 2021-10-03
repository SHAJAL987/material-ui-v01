import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography, IconButton, Avatar, Divider } from '@material-ui/core'
import { AddCircleOutlineOutlined, SubjectOutlined,PeopleOutlineTwoTone } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { useHistory, useLocation } from 'react-router'

const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(2)
        },
        drawer: {
            width: DRAWER_WIDTH
        },
        drawerPaper: {
            width: DRAWER_WIDTH
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f3f3f3'
        },
        title: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: '#ff1744',
            fontWeight: 'bold'
        },
        menuIconColor: {
            color: '#ff1744'
        },
        appbar: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            backgroundColor:'#fefefe'
        },
        toolbar: theme.mixins.toolbar,
        menubarIcon: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2),
            border: '3px solid red'
        },
        hrStyle:{
            height:'2px',
            background:'#f4f4f4'
        }

    }
})

export default function Layout({ children }) {

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: 'Notes',
            icon: <SubjectOutlined className={classes.menuIconColor} />,
            path: '/create'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlineOutlined className={classes.menuIconColor} />,
            path: '/'
        },
        {
            text: 'User Entry',
            icon: <PeopleOutlineTwoTone className={classes.menuIconColor} />,
            path: '/employee'
        }
        // PeopleOutlineTwoTone
    ]
    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar
                className={classes.appbar}
                elevation={1}
            >
                <Toolbar>
                    <Typography className={classes.menubarIcon}>
                        {/* onClick={()=> handleDelete(note.id)} */}
                        <IconButton >
                            <MenuIcon />
                        </IconButton>
                    </Typography>
                    <Typography color="primary">
                        Shajal
                    </Typography>
                    <Avatar
                        src="/mario-av.png"
                        className={classes.avatar}
                    />
                </Toolbar>
            </AppBar>
            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        City Bugs
                    </Typography>
                    <Divider />

                </div>

                {/* List/Links */}
                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}
