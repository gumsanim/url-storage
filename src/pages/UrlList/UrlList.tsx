import {
  Input,
  Button,
  ButtonGroup,
  Select,
  Option,
} from '@material-tailwind/react'
import Card from '../../components/Card/Card'
import List from '../../components/List/List'
import { TrashIcon } from '@heroicons/react/24/solid'
import { UrlItem, UrlPrefix } from '../../@types/data.types'
import useUrl from '../../hooks/useUrl'
import { lazy } from 'react'
import {
  DEFAULT_URL_VALUE,
  URL_MAX_LENGTH,
  URL_PREFIX,
} from '../../constants/dummy'
import useNavigator from '../../hooks/useNavigator'
import { useLocation } from 'react-router-dom'
import { MESSAGES, TEXT } from '../../constants/messages'
import Title from '../../components/Title/Title'

const Modal = lazy(() => import('../../components/Modal/Modal'))

export default function UrlList() {
  const {
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
  } = useUrl()

  const navigateHandler = useNavigator()
  const { pathname } = useLocation()

  /* www.만 있을 때 input 에러 x, www. + 입력 글자가 있을 때 url 형식 검사 후 통과 못할 시 에러메시지 */
  const urlInputLabel =
    urlSearchInput.length <= DEFAULT_URL_VALUE.length
      ? MESSAGES.ENTER_URL
      : urlError.hasError || urlSearchInput.length > URL_MAX_LENGTH
      ? urlError.errorMessage
      : MESSAGES.CORRECT_URL

  /* set default prefix to http */

  return (
    <div>
      {alert.hasAlert && (
        <Modal>
          <Card className="modal">
            <div className="mb-5">{alert.alertMessage}</div>
            <Button
              color="yellow"
              onClick={() =>
                setAlert({
                  ...alert,
                  hasAlert: false,
                  alertMessage: '',
                })
              }
            >
              {TEXT.OK}
            </Button>
          </Card>
        </Modal>
      )}
      <Title>{MESSAGES.MAKE_URL_LIST}</Title>
      <div className="flex md:flex-col">
        <div className="mr-2 md:mb-3 md:mr-0">
          <Select
            label="http, https 선택"
            onChange={selectUrlPefixHandler}
            value={String(selectedUrlPrefix.id)}
          >
            {URL_PREFIX.map((urlPrefix: UrlPrefix) => (
              <Option key={urlPrefix.id} value={String(urlPrefix.id)}>
                {urlPrefix.prefix}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex md:mr-0">
          <Input
            label={urlInputLabel}
            error={
              urlSearchInput.length > DEFAULT_URL_VALUE.length &&
              urlError.hasError
            }
            value={urlSearchInput}
            onChange={urlSearchInputHandler}
            onKeyDown={inputKeyDownHandler}
          />
          <ButtonGroup className="ml-2">
            <Button
              onClick={addUrlHandler}
              ripple={false}
              variant="outlined"
              disabled={urlError.hasError}
            >
              <span>{TEXT.ADD}</span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Card className="url_list">
        {urlList.length ? (
          /* ocal storage에 저장된 URL이 있는 경우 fallback UI */
          <List>
            {urlList.map((list: UrlItem) => (
              <List.Item
                key={list.id}
                className="url_list"
                clickHandler={() =>
                  navigateHandler(`${pathname}/detail/${list.id}`)
                }
                icon={
                  <List.Item.Icon
                    clickHandler={(event: React.MouseEvent<HTMLElement>) => {
                      removeUrlHandler(list.id)
                      /* event bubbling 으로 인한 page 전환 방지 */
                      event.stopPropagation()
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </List.Item.Icon>
                }
              >
                {list.url}
              </List.Item>
            ))}
          </List>
        ) : (
          /* local storage에 저장된 URL이 없는 경우 fallback UI */
          <div className="flex h-full w-full items-center justify-center md:text-sm">
            {MESSAGES.EMPTY_URL_LIST}
          </div>
        )}
      </Card>
    </div>
  )
}
