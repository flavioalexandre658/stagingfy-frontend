import type { Metadata } from "next";

import Signup from './_components/sign-up'
export const metadata: Metadata = {
    title: `Cadastro`,
};
const Register = () => {

    return (

        <Signup />


    );
};

export default Register;