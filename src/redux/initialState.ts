const initialState: any = {
    datasets: {
        auth_token: null,
        user: null,
        users: {},
        is_loading_login_submit: false,
        is_loading_register_submit: false,
        is_loading_email_verification: false,
        is_loading_recovery_email_submit: false,
        is_loading_reset_email_submit: false,
        is_loading_reset_code_submit: false,
        is_loading_reset_code_check: false,
        users_page_is_loading: false,
        language: '',
    },
}

export default initialState
