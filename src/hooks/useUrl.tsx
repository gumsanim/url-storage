import React, { useEffect, useState, useCallback } from "react";
import Layout from "../layouts/Layout";
import localStorage from "../utils/localStorage";
import uuid from "react-uuid";
import { localStorageKeys } from "../constants/dummy";
import { IUrlItem } from "../@types/data.types";

const useUrl = () => {
  const [urlList, setUrlList] = useState<Array<IUrlItem>>([]);
  const [urlSearchInput, setUrlSearchInput] = useState("");
  const uniqueId = uuid();

  const urlSearchInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUrlSearchInput(event.target.value);
  };

  const urlFromLocalStorage = localStorage.getData(
    localStorageKeys.url_list
  ) as string;

  const addUrlHandler = () => {
    /*
      local storage에 url_list라는 이름으로 url 데이터가 존재한다면
      기존 데이터에 새로운 url 정보를 삽입 후 url list state 업데이트
    */
    if (urlFromLocalStorage) {
      const addedUrlList = JSON.parse(urlFromLocalStorage).concat({
        id: uniqueId,
        url: urlSearchInput,
      });
      localStorage.setData(
        localStorageKeys.url_list,
        JSON.stringify(addedUrlList)
      );
      setUrlSearchInput("");
      return setUrlList(addedUrlList);
    }
    /*
      local storage에 url_list라는 이름으로 url 데이터가 존재 하지 않는다면
      url_list라는 이름으로 local storage에 첫 데이터 삽입 후 url list state 업데이트
    */
    localStorage.setData(
      localStorageKeys.url_list,
      JSON.stringify([
        {
          id: uniqueId,
          url: urlSearchInput,
        },
      ])
    );
    setUrlSearchInput("");
    return setUrlList((prevUrlList: Array<IUrlItem>) => [
      ...prevUrlList,
      {
        id: uniqueId,
        url: urlSearchInput,
      },
    ]);
  };

  const removeUrlHandler = (url_id: string) => {
    setUrlList(urlList.filter((urlItem: IUrlItem) => urlItem.id !== url_id));

    /* 만약 local storage에 저장된 url이 하나 라면, 전부 삭제 */
    if (JSON.parse(urlFromLocalStorage).length === 1) {
      return localStorage.removeData(localStorageKeys.url_list);
    }

    localStorage.setData(
      localStorageKeys.url_list,
      JSON.stringify(
        JSON.parse(urlFromLocalStorage).filter(
          (urlItem: IUrlItem) => urlItem.id !== url_id
        )
      )
    );
  };

  useEffect(() => {
    setUrlList(
      JSON.parse(localStorage.getData(localStorageKeys.url_list) as string) ??
        []
    );
  }, []);

  return {
    urlList,
    urlSearchInput,
    urlSearchInputHandler,
    addUrlHandler,
    removeUrlHandler,
  };
};

export default useUrl;
