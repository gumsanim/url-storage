import React, { useEffect, useState } from 'react';
import localStorage from '../utils/localStorage';
import uuid from 'react-uuid';
import { DEFAULT_URL_VALUE, LOCAL_STORAGE_KEY, URL_MAX_LIMIT } from '../constants/dummy';
import { UrlItem } from '../@types/data.types';
import { regexValidator } from '../utils/regexValidator';
import { REGEX } from '../constants/regex';
import { MESSAGES } from '../constants/messages';
import { URL_MAX_LENGTH } from '../constants/dummy';
import { URL_PREFIX } from '../constants/dummy';
import { UrlPrefix } from '../@types/data.types';

const useUrl = () => {
  const [urlList, setUrlList] = useState<Array<UrlItem>>([]);
  const [selectedUrlPrefix, setSelectedUrlPrefix] = useState(URL_PREFIX[0]);
  const [urlSearchInput, setUrlSearchInput] = useState(DEFAULT_URL_VALUE);
  const [urlError, setUrlError] = useState({
    hasError: true,
    errorMessage: '',
  });
  const [alert, setAlert] = useState({
    hasAlert: false,
    alertMessage: '',
  });
  /* URL 저장 시 고유 string ID 생성 */
  const uniqueId = uuid();
  /*  http:// 혹은 https:// + 유저가 입력한 url 값 */
  const completeUrl = `${selectedUrlPrefix.prefix}://${urlSearchInput}`;

  const urlSearchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlSearchInput(event.target.value);
  };

  /* local storage의 값, 매 렌더링 시 할당, 전역변수용 */
  const urlFromLocalStorage = localStorage.getData(LOCAL_STORAGE_KEY.URL_LIST) as string;

  const addUrlHandler = () => {
    /*
      local storage에 url_list라는 이름으로 url 데이터가 존재한다면
      기존 데이터에 새로운 url 정보를 삽입 후 url list state 업데이트
    */
    if (urlFromLocalStorage) {
      /* local storage의 데이터에 같은 URL 이름이 등록 되어 있다면 중복 방지 처리*/
      const parsedUrlFromLocalStorage = JSON.parse(urlFromLocalStorage);
      if (
        parsedUrlFromLocalStorage.findIndex((urlItem: UrlItem) => urlItem.url === completeUrl) >= 0
      ) {
        return setAlert({
          ...alert,
          hasAlert: true,
          alertMessage: MESSAGES.DUPLICATE_URL,
        });
      }

      /* URL 데이터가 최대 저장 가능 갯수(5) 초과 방지 */
      if (parsedUrlFromLocalStorage.length >= URL_MAX_LIMIT) {
        return setAlert({
          ...alert,
          hasAlert: true,
          alertMessage: MESSAGES.URL_MAX_LIMIT_EXCEEDED,
        });
      }

      /* 위의 모든 제약 조건들을 통과 했다면 */
      const addedUrlList = parsedUrlFromLocalStorage.concat({
        id: uniqueId,
        url: completeUrl,
      });

      localStorage.setData(LOCAL_STORAGE_KEY.URL_LIST, JSON.stringify(addedUrlList));
      /* url 입력값 초기화 */
      setUrlSearchInput(DEFAULT_URL_VALUE);
      return setUrlList(addedUrlList);
    }
    /*
      local storage에 url_list라는 이름으로 url 데이터가 존재 하지 않는다면
      url_list라는 이름으로 local storage에 첫 데이터 삽입 후 url list state 업데이트
    */
    localStorage.setData(
      LOCAL_STORAGE_KEY.URL_LIST,
      JSON.stringify([
        {
          id: uniqueId,
          url: completeUrl,
        },
      ]),
    );

    setUrlList((prevUrlList: Array<UrlItem>) => [
      ...prevUrlList,
      {
        id: uniqueId,
        url: completeUrl,
      },
    ]);

    /* url 입력값 초기화 */
    return setUrlSearchInput(DEFAULT_URL_VALUE);
  };

  const removeUrlHandler = (url_id: string) => {
    setUrlList(urlList.filter((urlItem: UrlItem) => urlItem.id !== url_id));

    /* 만약 local storage에 저장된 url이 하나 라면, 전부 삭제 */
    if (JSON.parse(urlFromLocalStorage).length === 1) {
      return localStorage.removeData(LOCAL_STORAGE_KEY.URL_LIST);
    }

    localStorage.setData(
      LOCAL_STORAGE_KEY.URL_LIST,
      JSON.stringify(
        JSON.parse(urlFromLocalStorage).filter((urlItem: UrlItem) => urlItem.id !== url_id),
      ),
    );
  };

  const inputKeyDownHandler = (event: React.KeyboardEvent) => {
    if (
      /* www. 만 남은 상황에서 backspace 혹은 delete를 눌렀을 때 동작 방지 */
      urlSearchInput.length <= DEFAULT_URL_VALUE.length &&
      (event.key === 'Backspace' || event.key === 'Delete')
    ) {
      event.preventDefault();
    }
  };

  const selectUrlPefixHandler = (event: any) => {
    setSelectedUrlPrefix({
      ...selectedUrlPrefix,
      ...URL_PREFIX.find((urlPrefix: UrlPrefix) => String(urlPrefix.id) === event),
    });
  };

  const urlInputValidationHandler = () => {
    /* URL이 URL 정규식에 부합하지 않는 경우 */
    if (!regexValidator(REGEX.URL, urlSearchInput)) {
      setUrlError({
        ...urlError,
        hasError: true,
        errorMessage: MESSAGES.INVALID_URL,
      });
    }
    if (regexValidator(REGEX.URL, urlSearchInput)) {
      setUrlError({
        ...urlError,
        hasError: false,
        errorMessage: '',
      });
    }
    /* URL이 URL 최대 길이보다 초과하는 경우 */
    if (urlSearchInput.length > URL_MAX_LENGTH) {
      setUrlError({
        ...urlError,
        hasError: true,
        errorMessage: MESSAGES.URL_LENGTH_EXCEEDED,
      });
    }
  };

  useEffect(() => {
    /* 컴포넌트 mount 시 local storage에서 가져온 URL 리스트들을 state에 저장  */
    setUrlList(JSON.parse(localStorage.getData(LOCAL_STORAGE_KEY.URL_LIST) as string) ?? []);
  }, []);

  useEffect(() => {
    urlInputValidationHandler();
    /* www.가 지워지지 않도록 하는 로직 */
    if (urlSearchInput.length < DEFAULT_URL_VALUE.length) {
      setUrlSearchInput(DEFAULT_URL_VALUE);
    }
  }, [urlSearchInput]);

  return {
    urlList,
    urlSearchInput,
    urlSearchInputHandler,
    selectedUrlPrefix,
    selectUrlPefixHandler,
    addUrlHandler,
    removeUrlHandler,
    inputKeyDownHandler,
    urlError,
    alert,
    setAlert,
  };
};

export default useUrl;
