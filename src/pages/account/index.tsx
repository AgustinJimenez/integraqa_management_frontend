import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../layouts/AdminLayout'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { datasetSelector } from '../../redux/selectors'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inline: {
        display: 'inline',
    },
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    justifyContentCenter: {
        justifyContent: 'center',
    },
}))

const AccountPage = (props: any) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector((state: any) => datasetSelector(state, 'user')) || {}
    console.log('AccountPage ===> ', user)
    React.useEffect(() => {}, [])

    return (
        <AdminLayout title='Account'>
            <Grid container spacing={3} justify='center' alignItems='center'>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <List component='nav' aria-label='main mailbox folders'>
                            <ListItem button alignItems='center' className={classes.justifyContentCenter}>
                                <Avatar alt={user.name} src={user.image} className={classes.large} />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary='Username' secondary={user.name} />
                            </ListItem>
                            <ListItem button>
                                <ListItemText
                                    primary='Email'
                                    secondary={
                                        <Typography component='span' variant='body2' className={classes.inline} color='textPrimary'>
                                            {user.email}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default AccountPage
