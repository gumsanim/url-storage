import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import urlApi from "../../api/urlApi";
import { LOCAL_STORAGE_KEY } from "../../constants/dummy";
import { UrlItem } from "../../@types/data.types";
import localStorage from "../../utils/localStorage";
import { useState } from "react";
import { QUERY_KEY } from "../../constants/query";
import { useQuery } from "react-query";
import axios from "axios";
export default function UrlListDetail() {
  const { id } = useParams();
  /* local storage의 값, 매 렌더링 시 할당, 전역변수용 */
  const urlFromLocalStorage = localStorage.getData(
    LOCAL_STORAGE_KEY.URL_LIST
  ) as string;

  /* url id param을 이용하여 local storage에서 url 데이터 추출하기 */
  const urlInfo = useMemo(
    () => JSON.parse(urlFromLocalStorage).find((url: UrlItem) => url.id === id),
    [id, urlFromLocalStorage]
  );

  const {
    isLoading: IsDetailLoading,
    error: detailError,
    data: detailUrl,
  } = useQuery(
    QUERY_KEY.GET_URL_DETAIL,
    () => urlApi.getUrlDetail(urlInfo.url),
    {
      enabled: !!urlInfo,
    }
  );

  console.log(detailUrl);

  return (
    <div>
      <h1>하이</h1>
    </div>
  );
}
