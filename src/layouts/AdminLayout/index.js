import React from 'react'
import Head from 'next/head'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
//import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { mainListItems, secondaryListItems } from './listItems'
//import Chart from './Chart'
//import Deposits from './Deposits'
//import Orders from './Orders'
import styles from './styles'
import { datasetSelector } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import InboxIcon from '@material-ui/icons/Inbox'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Popper from '@material-ui/core/Popper'
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state'
import Fade from '@material-ui/core/Fade'
import { authLogoutSagaAction } from '../../sagas/actions'

// views
/* 
import Dashboard from './views/admin/Dashboard.js'
import Maps from './views/admin/Maps.js'
import Settings from './views/admin/Settings.js'
import Tables from './views/admin/Tables.js'
 */
function ListItemLink(props) {
    return <ListItem button component='a' {...props} />
}

const AdminLayout = ({ children }) => {
    const dispatch = useDispatch()
    const user_has_auth = useSelector(state => datasetSelector(state, 'user_has_auth'))

    React.useEffect(() => {
        if (!user_has_auth) Router.replace('/login')
    }, [user_has_auth])

    const classes = styles()
    const [open, setOpen] = React.useState(true)
    const handleDrawerOpen = React.useCallback(() => setOpen(true))

    const handleDrawerClose = React.useCallback(() => setOpen(false))
    const logout = React.useCallback(() => {
        dispatch(authLogoutSagaAction())
    })

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        <PopupState variant='popper' popupId='demo-popup-popper'>
                            {popupState => (
                                <>
                                    <IconButton color='inherit' {...bindToggle(popupState)}>
                                        <AccountCircleIcon />
                                    </IconButton>
                                    <Popper {...bindPopper(popupState)} transition keepMounted className={classes.zIndex1202} placement='bottom-start'>
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper>
                                                    <List component='nav' aria-label='main mailbox folders'>
                                                        <ListItem button>
                                                            <ListItemIcon>
                                                                <AccountBoxIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={'Account'} />
                                                        </ListItem>
                                                        <ListItem button onClick={logout}>
                                                            <ListItemIcon>
                                                                <ExitToAppIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={'Logout'} />
                                                        </ListItem>
                                                    </List>
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </>
                            )}
                        </PopupState>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant='permanent'
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth='lg' className={classes.container}>
                        <Grid container spacing={3}></Grid>
                    </Container>
                </main>
                n
            </div>
        </>
    )
}

export default AdminLayout
