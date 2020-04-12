import { FAMILIA_ALL } from '../actions/actionTypes';

const initialState = {
    listaFamilia: [
        {
            "integrantes": [
                {
                    "nomeCompleto": "Guilherme Dias Maria",
                    "dataNascimento": "2020-04-05T00:00:00.000Z",
                    "cpf": "741.856.856-89"
                }
            ],
            "rendaPercapita": 3563.85,
            "endereco": {
                "rua": "Rua sete",
                "bairro": "centro",
                "numero": 375,
                "cep": "29500-000",
                "cidade": "Alegre",
                "estado": "ES",
                "pais": "BR"
            },
            "dataCestas": [
                {
                    "nomeInstituicao": "Ajuda Todos Nos",
                    "data": "2020-04-05T00:00:00.000Z"
                }
            ],
        },
        {
            "integrantes": [
                {
                    "nomeCompleto": "Guilherme Dias Maria",
                    "dataNascimento": "2020-04-05T00:00:00.000Z",
                    "cpf": "741.856.856-89"
                }
            ],
            "rendaPercapita": 3563.85,
            "endereco": {
                "rua": "Rua sete",
                "bairro": "centro",
                "numero": 375,
                "cep": "29500-000",
                "cidade": "Alegre",
                "estado": "ES",
                "pais": "BR"
            },
            "dataCestas": [
                {
                    "nomeInstituicao": "Ajuda Todos Nos",
                    "data": "2020-04-05T00:00:00.000Z"
                }
            ],
        },
        {
            "integrantes": [
                {
                    "nomeCompleto": "Guilherme Dias Maria",
                    "dataNascimento": "2020-04-05T00:00:00.000Z",
                    "cpf": "741.856.856-89"
                }
            ],
            "rendaPercapita": 3563.85,
            "endereco": {
                "rua": "Rua sete",
                "bairro": "centro",
                "numero": 375,
                "cep": "29500-000",
                "cidade": "Alegre",
                "estado": "ES",
                "pais": "BR"
            },
            "dataCestas": [
                {
                    "nomeInstituicao": "Ajuda Todos Nos",
                    "data": "2020-04-05T00:00:00.000Z"
                }
            ],
        }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //add item in ListLocation    
        case FAMILIA_ALL:
            //console.log('Elemento ', action.payload)
            return {
                ...state,
                listaFamilia: action.payload
            }

        default:
            return state
    }
}

export default reducer