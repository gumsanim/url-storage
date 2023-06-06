import { UrlPrefix, LocalStorageKey } from '../@types/data.types';

const COUNT = 3;
const URL_MAX_LIMIT = 4;
const DEFAULT_URL_VALUE = 'www.';
const URL_MAX_LENGTH = 50;
const NUMBER_OF_YEARS = 11;

const LOCAL_STORAGE_KEY: LocalStorageKey = {
  URL_LIST: 'url_list',
};

const URL_PREFIX: UrlPrefix[] = [
  {
    id: 1,
    prefix: 'http',
  },
  {
    id: 2,
    prefix: 'https',
  },
];

export {
  COUNT,
  LOCAL_STORAGE_KEY,
  URL_MAX_LENGTH,
  URL_PREFIX,
  DEFAULT_URL_VALUE,
  URL_MAX_LIMIT,
  NUMBER_OF_YEARS,
};
