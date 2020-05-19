// import moment from "moment";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import IBankOnTokens from "IBankOnTokens";
import moment from "moment";

class Client {
  iBankOnTokens: IBankOnTokens;
  constructor() {
    this.iBankOnTokens = {
      tokenConsulta: "",
      tokenTransferencia: "",
    };
  }

  getAxios(token: string): AxiosInstance {
    return axios.create({
      baseURL: "https://api.bankon.com.br/v1",
      headers: {
        Authentication: token,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Obter acesso ao BankOn
   * @param iBankOnTokens Objeto contendo os tokens
   * @returns app
   * @example
   * const app = bancon.initializeApp({
   *  tokenConsulta: "token",
   *  tokenTransferencia: "token"
   * })
   */
  initializeApp(iBankOnTokens: IBankOnTokens): Client {
    this.iBankOnTokens = iBankOnTokens;
    return this;
  }

  /**
   * Consultar Usuários
   * @param usuario O Usuário ao qual deseja realizar consulta
   * @returns Promise
   */
  consultarUsuario(usuario: String): Promise<AxiosResponse> {
    return this.getAxios(this.iBankOnTokens.tokenConsulta).get(
      "consultas/usuario/" + usuario
    );
  }

  /**
   * Consulta uma transação entre contas Bankon
   * @param codigo O número da transação
   * @returns Promise
   */
  consultarTransferencia(codigo: String): Promise<AxiosResponse> {
    return this.getAxios(this.iBankOnTokens.tokenConsulta).get(
      "consultas/transferencias/ " + codigo
    );
  }

  /**
   * Verifica o saldo disponível no sistema
   * @returns Promise
   */
  consultarSaldo(): Promise<AxiosResponse> {
    return this.getAxios(this.iBankOnTokens.tokenConsulta).get(
      "consultas/saldo"
    );
  }

  /**
   * Consulta o extrato do Cliente
   * @param initialDate Data Inicial da Consulta
   * @param finalDate Data Final da Consulta
   * @param type Tipo de transações a serem filtradas
   * C - Crédito D - Débito
   * Caso não informado serão retornados todos os tipos de movimentos
   */
  consultarExtrato(
    initialDate: Date,
    finalDate: Date,
    type: String = ""
  ): Promise<AxiosResponse> {
    return this.getAxios(this.iBankOnTokens.tokenConsulta).get(
      "consultas/extrato",
      {
        params: {
          initialDate: moment(initialDate).format("YYYY-MM-DD"),
          finalDate: moment(finalDate).format("YYYY-MM-DD"),
          type: type || null,
        },
      }
    );
  }

  /**
   * Transferências entre usuários
   * @param beneficiario Usuario que receberá a transferência
   * @param valor Valor da transferência
   * @param idTransferencia Identificação única da transferência
   * Exemplo: X9995
   */
  transferencia(
    beneficiario: String,
    valor: Number,
    idTransferencia: String
  ): Promise<AxiosResponse> {
    return this.getAxios(this.iBankOnTokens.tokenTransferencia).post(
      "financeiro/transferencia",
      {
        beneficiario: beneficiario,
        valor: valor,
        id_transferencia: idTransferencia,
      }
    );
  }
}

export default Client;
