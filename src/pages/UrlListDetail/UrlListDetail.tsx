import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import urlApi from '../../api/urlApi';
import { LOCAL_STORAGE_KEY, NUMBER_OF_YEARS } from '../../constants/dummy';
import { UrlItem, YearInfo } from '../../@types/data.types';
import localStorage from '../../utils/localStorage';
import { QUERY_KEY } from '../../constants/query';
import { useQueries, useQuery } from 'react-query';
import Card from '../../components/Card/Card';
import List from '../../components/List/List';
import windowOpener from '../../utils/windowOpener';
import { MESSAGES } from '../../constants/messages';
import Title from '../../components/Title/Title';
import { Chip } from '@material-tailwind/react';

export default function UrlListDetail() {
  const { id } = useParams();

  /* local storage의 값, 매 렌더링 시 할당, 전역변수용 */
  const urlFromLocalStorage = localStorage.getData(LOCAL_STORAGE_KEY.URL_LIST) as string;

  /* url id param을 이용하여 local storage에서 url 데이터 추출하기 */
  const urlInfo = useMemo(
    () => JSON.parse(urlFromLocalStorage).find((url: UrlItem) => url.id === id),
    [id, urlFromLocalStorage],
  );

  const yearsInfo: YearInfo[] = useMemo(
    /*
      2023년 현재 기준 2023-01-01년부터 10년전까지 날짜를 저장하는 배열 생성
      ex) 20230101, 20220101, 20210101 ..
    */
    () =>
      Array.from({ length: NUMBER_OF_YEARS }, (year: number, index: number) => {
        const currentYear = new Date().getFullYear(); //현재년도
        return {
          id: index,
          desc: !index ? 'this year' : `${index} years ago`,
          year: `${currentYear - index}0101`,
        };
      }),
    [],
  );

  const { data: detailUrl } = useQuery(
    QUERY_KEY.GET_URL_DETAIL,
    () => urlApi.getUrlDetail(urlInfo.url),
    {
      /* local storage에서 url 정보를 얻은 후 query 실행 x */
      enabled: !!urlInfo,
    },
  );

  /* N년간의 URL 주소를 불러오는 query */
  const urlHistory = useQueries(
    yearsInfo.map((year_info: YearInfo) => ({
      queryKey: year_info.desc,
      queryFn: () => urlApi.getUrlHistory(urlInfo.url, year_info.year),
      options: {
        /* 모든 query는 url 정보 query가 끝난 후에 실행되어야 함 */
        enabled: !!detailUrl,
      },
    })),
  );

  console.log(urlHistory);

  return (
    <div className="flex justify-center items-center flex-col">
      <Title>
        {detailUrl.url}의 {NUMBER_OF_YEARS - 1}년간 변화를 확인해보세요.
      </Title>
      <Card className="url_detail">
        <List>
          {urlHistory.map((url_history: any) => (
            <>
              <List.Item
                key={url_history.data?.archived_snapshots?.closest?.timestamp}
                className="url_detail"
                clickHandler={() => {
                  if (url_history.data?.archived_snapshots?.closest?.url) {
                    windowOpener(url_history.data?.archived_snapshots?.closest?.url);
                  }
                }}
                icon={
                  <Chip className="ml-2" value={url_history.data?.timestamp} variant="outlined" />
                }
              >
                {url_history.data?.archived_snapshots?.closest?.url ?? MESSAGES.NON_EXTANT_URL}
              </List.Item>
            </>
          ))}
        </List>
      </Card>
    </div>
  );
}
