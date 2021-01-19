var fetch;
if (typeof window === 'undefined') fetch = require('node-fetch');
else fetch = window.fetch;

const BASE_URL = 'https://api.github.com';

export const toAPIUrl = (repoUrl) => {
  const re = /.*\/(?<username>[^/]+)\/(?<repo>[^/]+)$/;
  const { username, repo } = re.exec(repoUrl)['groups'];

  return `${BASE_URL}/repos/${username}/${repo}/languages`;
};

export const fetchLanguages = async (repo) => {
  let resp = await fetch(toAPIUrl(repo));
  let json = await resp.json();
  return json;
};

// module.exports = {
//   toAPIUrl,
//   fetchLanguages,
// };
