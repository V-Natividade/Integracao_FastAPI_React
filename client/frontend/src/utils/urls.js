/**
 * Formata as URLs da API
 *
 * @param {String} base - string da url que representa o endpoint sem parâmetros
 * @param {Object} params - parâmetros de consulta para formatar e add ao final da url
 */
export const formatURLWithQueryParams = (base, params) => {
  if (!params || Object.keys(params)?.length === 0) return base;

  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${base}?${query}`;
};

/**
 * Formata o path
 *
 * @param {String} path
 */
export const formatAPIPath = (path) => {
  let adjustedPath = path;

  // add as barrar no caminho
  if (adjustedPath.charAt(0) !== "/") {
    adjustedPath = "/" + adjustedPath;
  }
  if (adjustedPath.charAt(adjustedPath.length - 1) !== "/") {
    adjustedPath = adjustedPath + "/";
  }

  return adjustedPath;
};

/**
 * Formata as URLs da API
 *
 * @param {String} url - representa o caminho do endpoint
 * @param {Object} params - parâmetros de consulta que serão formatados ao final da url
 */
export const formatURL = (url, params) => {
  const endpointPath = formatAPIPath(url);

  const baseUrl = "http://localhost:8000/api";

  const fullURL = `${baseUrl}${endpointPath}`;

  return formatURLWithQueryParams(fullURL, params);
};
