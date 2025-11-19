import type { Metadata } from "next";

import Signin from './_components/sign-in'

export const metadata: Metadata = {
    title: `Entrar`,
};
const Login = () => {

    return (

        <Signin />


    );
};

export default Login;