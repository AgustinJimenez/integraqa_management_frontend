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
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
//import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { mainListItems, secondaryListItems } from './listItems'
import styles from './styles'
import { datasetSelector } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Popover from '@material-ui/core/Popover'
import { authLogoutSagaAction } from '../../sagas/actions'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const ListItemLink = (props: any) => <ListItem button component='a' {...props} />

const AdminLayout = ({ children }: any) => {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => datasetSelector(state, 'user'))
    /* 
    const auth_token = useSelector(state => datasetSelector(state, 'auth_token'))
    React.useEffect(() => {
        if (!auth_token) Router.replace('/login')
    }, [auth_token])
 */
    const classes = styles()
    const [drawerIsOpen, setDrawerOpenStatus] = React.useState(true)
    const [accountMenuIsOpen, setAccountMenuStatus] = React.useState(false)
    const handleDrawerOpen = React.useCallback(() => setDrawerOpenStatus(true), [])
    const handleDrawerClose = React.useCallback(() => setDrawerOpenStatus(false), [])
    const [accountMenuAnchorEl, setAccountMenuAnchoEl] = React.useState(null)
    const changeAccountMenuStatus = React.useCallback((event, isOpen = false) => {
        setAccountMenuAnchoEl(event.currentTarget)
        setAccountMenuStatus(isOpen)
    }, [])
    const logout = React.useCallback(() => {
        dispatch(authLogoutSagaAction())
    }, [])
    const goToAccount = React.useCallback(() => {
        Router.push('/account')
    }, [])
    const open = Boolean(accountMenuAnchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position='absolute' className={clsx(classes.appBar, drawerIsOpen && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, drawerIsOpen && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        <Button
                            size='large'
                            startIcon={<AccountCircleIcon />}
                            endIcon={<ArrowDropDownIcon />}
                            color='inherit'
                            onClick={e => changeAccountMenuStatus(e, !accountMenuIsOpen)}
                        >
                            {user.name}
                        </Button>
                        <Popover
                            //id={id}
                            open={accountMenuIsOpen}
                            anchorEl={accountMenuAnchorEl}
                            onClick={e => changeAccountMenuStatus(e, false)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Paper>
                                <List component='nav' aria-label='main mailbox folders'>
                                    <ListItemLink onClick={goToAccount}>
                                        <ListItemIcon>
                                            <AccountBoxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Account'} />
                                    </ListItemLink>
                                    <ListItem button onClick={logout}>
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Logout'} />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Popover>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant='permanent'
                    classes={{
                        paper: clsx(classes.drawerPaper, !drawerIsOpen && classes.drawerPaperClose),
                    }}
                    open={drawerIsOpen}
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
                        <Grid container spacing={3}>
                            {children}
                        </Grid>
                    </Container>
                </main>
            </div>
        </>
    )
}

export default AdminLayout
