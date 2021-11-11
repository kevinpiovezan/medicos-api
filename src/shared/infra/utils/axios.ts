import axios from 'axios';
import { parse } from 'fast-xml-parser';

function dados(cep) {
  const match = cep.match(/[\D+]/g);
  if (match || cep.length !== 8) {
    throw new Error('Cep deve conter apenas números e ter 8 caracteres');
  }
  return axios
    .get(`https://viacep.com.br/ws/${cep}/xml/`)
    .then((response) => {
      const parser = parse(response.data);
      return parser;
    })
    .catch((error) => console.log(error));
}
const endereco = async (cep) => {
  const data = await dados(cep);
  const { uf, localidade, logradouro, bairro } = data.xmlcep;
  if (!(uf || localidade || logradouro || bairro)) {
    throw new Error('Não foi possível recuperar o endereço, verifique o cep');
  }
  return { uf, localidade, logradouro, bairro };
};

export { endereco };
