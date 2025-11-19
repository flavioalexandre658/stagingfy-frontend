import type { Metadata } from "next";

import Reset from './_components/reset'
export const metadata: Metadata = {
    title: `Alterar senha`,
};
const AlterarSenha = async (props: {
    params: Promise<{ userUuid: string }>
}) => {
    const params = await props.params
    const { userUuid } = params

    return (
        <Reset userUuid={userUuid} />
    );
};

export default AlterarSenha;