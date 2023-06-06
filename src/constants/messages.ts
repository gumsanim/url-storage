import { URL_MAX_LENGTH, URL_MAX_LIMIT } from './dummy';

export const MESSAGES = {
  INVALID_URL: 'URL 형식이 올바르지 않습니다.',
  URL_LENGTH_EXCEEDED: `URL 주소의 길이는 ${URL_MAX_LENGTH}자 이하여야 합니다.`,
  URL_MAX_LIMIT_EXCEEDED: `저장 가능한 URL 갯수는 ${URL_MAX_LIMIT}개 입니다.`,
  DUPLICATE_URL: `중복된 URL입니다.`,
  NOT_FOUND: `404 페이지를 찾을 수 없습니다.`,
  ENTER_URL: '등록하고 싶은 URL을 입력하세요.',
  CORRECT_URL: '올바른 형식의 URL입니다.',
  NON_EXTANT_URL: 'URL이 존재하지 않습니다.',
};
