import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
    },
}))

export const Loader = ({}) => {
    const classes = useStyles()

    return (
        <Grid container direction='row' justify='center' alignItems='center' alignContent='center' className={clsx(classes.root)}>
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    )
}
