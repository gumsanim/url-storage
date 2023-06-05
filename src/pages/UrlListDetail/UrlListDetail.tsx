import { useParams } from "react-router-dom";
import { useMemo } from "react";
import urlApi from "../../api/urlApi";
import { LOCAL_STORAGE_KEY } from "../../constants/dummy";
import { UrlItem } from "../../@types/data.types";
import localStorage from "../../utils/localStorage";
import { QUERY_KEY } from "../../constants/query";
import { useQuery } from "react-query";
import Card from "../../components/Card/Card";
import List from "../../components/List/List";
import windowOpener from "../../utils/windowOpener";
import { MESSAGES } from "../../constants/messages";

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

  const { data: detailUrl } = useQuery(
    QUERY_KEY.GET_URL_DETAIL,
    () => urlApi.getUrlDetail(urlInfo.url),
    {
      /* local storage에서 url 정보를 얻을 때 까지 query 실행 x */
      enabled: !!urlInfo,
    }
  );

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-center mb-20 font-bold text-2xl md:text-lg md:px-2">
        {detailUrl.url}의 상세 결과입니다.
      </p>
      <Card className="url_detail">
        <List>
          <List.Item
            className="url_detail"
            clickHandler={() => {
              if (detailUrl.archived_snapshots?.closest?.url) {
                windowOpener(detailUrl.archived_snapshots?.closest?.url);
              }
            }}
          >
            {detailUrl.archived_snapshots?.closest?.url ??
              MESSAGES.NON_EXTANT_URL}
          </List.Item>
        </List>
      </Card>
    </div>
  );
}
