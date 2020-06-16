export function formatCurrency(amount) {

    const value = Number(amount);

    const language = 'pt-br';

    console.log(language);

    if (language == 'pt-br') {
        const option = { style: "currency", currency: "BRL" }

        return value.toLocaleString("pt-BR", option)

    }
}