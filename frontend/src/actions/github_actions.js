import * as GithubAPI from '../util/github_api';

export const RECEIVE_LANGUAGES = 'RECEIVE_LANGUAGES';
export const CLEAR_LANGUAGES = 'CLEAR_LANGUAGES';
export const RECEIVE_GITHUB_ERRORS = 'RECEIVE_GITHUB_ERRORS';
export const CLEAR_GITHUB_ERRORS = 'CLEAR_GITHUB_ERRORS';

export const clearGithubErrors = () => ({
  type: CLEAR_GITHUB_ERRORS,
});

export const receiveGithubErrors = (errors) => ({
  type: RECEIVE_GITHUB_ERRORS,
  errors,
});

export const receiveLanguages = (languages) => ({
  type: RECEIVE_LANGUAGES,
  languages,
});

export const clearLanguages = () => ({
  type: CLEAR_LANGUAGES,
});

export const fetchLanguages = (repo) => (dispatch) => {
  return GithubAPI.fetchLanguages(repo)
    .then((languages) => dispatch(receiveLanguages(languages)))
    .catch((errors) => dispatch(receiveGithubErrors(errors)));
};
