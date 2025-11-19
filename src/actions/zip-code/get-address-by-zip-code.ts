"use server"

interface Address {
    uf: string;
    city: string;
    street?: string;
}

export default async function getAddressByZipCode(cep: string): Promise<Address | undefined> {
    cep = cep.replace(/\D/g, '');

    try {
        const brasilApiResponse = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (brasilApiResponse.ok) {
            const brasilApiData = await brasilApiResponse.json();
            if (brasilApiData.state) {
                return {
                    uf: brasilApiData.state,
                    city: brasilApiData.city,
                    street: brasilApiData.street || undefined,
                };
            }
        }
    } catch (error) {
        console.log(error)
        console.error('Erro ao consultar Brasil API:', error);
    }

    try {
        const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (viaCepResponse.ok) {
            const viaCepData = await viaCepResponse.json();
            if (viaCepData.uf) {
                return {
                    uf: viaCepData.uf,
                    city: viaCepData.localidade,
                    street: viaCepData.logradouro || undefined,
                };
            }
        }
    } catch (error) {
        console.log(error)
        console.error('Erro ao consultar ViaCEP:', error);
    }

    // Retorna undefined se nenhum endereço for encontrado
    return undefined;
}

