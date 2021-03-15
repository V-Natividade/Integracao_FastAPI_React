import axios from "axios";
import { formatURL } from "../utils/urls";

const getClient = (token = null) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return {
    get: (url, options = {}) =>
      axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      axios.delete(url, { ...defaultOptions, ...options }),
  };
};

/**
 *
 * @param {String} url - relativo ao endpoint da API
 * @param {String} method - "GET", "POST", "PUT", "DELETE"
 * @param {Object} types - Objeto que representa os diferentes tipos de ação: REQUEST, SUCCESS, FAILURE
 * @param {Object} options - Objeto com dados opicionais e parâmetros de consulta
 * @param {Function} onSuccess - callback, se houver algum retorno
 */
const apiClient = ({
  url,
  method,
  types: { REQUEST, SUCCESS, FAILURE },
  options: { data, params },
  onSuccess = (res) => ({ success: true, status: res.status, data: res.data }),
  onFailure = (res) => ({
    success: false,
    status: res.status,
    error: res.error,
  }),
}) => {
  return async (dispatch) => {
    const token = localStorage.getItem("access_token");
    const client = getClient(token);

    dispatch({ type: REQUEST });
    const urlPath = formatURL(url, params);

    try {
      const res = await client[method.toLowerCase()](urlPath, data);

      dispatch({ type: SUCCESS, data: res.data });

      return onSuccess({ type: SUCCESS, ...res });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FAILURE,
        error: error?.response?.data ? error.response.data : error,
      });

      return onFailure({
        type: FAILURE,
        status: error.status,
        error: error.response,
      });
    }
  };
};

export default apiClient;
