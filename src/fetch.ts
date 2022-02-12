const fetch = (url: string, options?: {}) => import('node-fetch').then(({ default: fetch }) => fetch(url, options));

export default fetch;
