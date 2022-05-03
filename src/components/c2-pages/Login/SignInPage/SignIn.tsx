import React from 'react';
import s from './SignIn.module.css'
import {LoginForm} from '../LoginForm';

export const SignIn = () => {
    return (
        <div className={s.container}>
            <div className={s.header}>
                <h3>Sign In</h3>
            </div>
            <div className={s.body}>
                <LoginForm/>
                {/*<input type="text"/>*/}
                {/*<input type="text"/>*/}
                {/*<div>Forgot Password</div>*/}
                {/*<button>22</button>*/}
            </div>

        </div>
    );
};

