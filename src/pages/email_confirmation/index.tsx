import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { authLoginSagaAction, emailConfirmationSagaAction } from '../../sagas/actions'
import useStyles from './styles'
import { useRouter } from 'next/router'
import { datasetSelector } from '../../redux/selectors'
import { select } from 'redux-saga/effects'
import CircularProgress from '@material-ui/core/CircularProgress'

const EmailConfirmationPage = (props: any) => {
    const router = useRouter()
    const is_loading_email_verification = select(state => datasetSelector(state, 'is_loading_email_verification'))
    const verification_code: string | string[] = router.query?.vc
    //console.log('EmailConfirmationPage ===> ', { verification_code, router, query: router.query })
    const dispatch = useDispatch()
    const classes = useStyles()
    React.useEffect(() => {
        if (!!verification_code)
            dispatch(
                emailConfirmationSagaAction({
                    verification_code,
                }),
            )
    }, [verification_code])

    return (
        <AuthLayout title='Email Verification'>
            <Grid container>
                <Grid container item md={12} justify='center' alignItems='center'>
                    {is_loading_email_verification && <CircularProgress color='primary' size={25} />}
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export async function getStaticProps() {
    //let { data, erro  r, message } = await request({ url: url_list_all_by_letter, params: { s: '' } })
    //console.log('HOMEPAGE-response ===> ', { data, error, message })
    return { props: {} }
}
export default EmailConfirmationPage
