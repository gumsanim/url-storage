import {
  Input,
  Button,
  ButtonGroup,
  Select,
  Option,
} from "@material-tailwind/react";
import Card from "../../components/Card/Card";
import List from "../../components/List/List";
import { TrashIcon } from "@heroicons/react/24/solid";
import { UrlItem, UrlPrefix } from "../../@types/data.types";
import useUrl from "../../hooks/useUrl";
import { lazy, useState } from "react";
import Modal from "../../components/Modal/Modal";
import {
  DEFAULT_URL_VALUE,
  URL_MAX_LENGTH,
  URL_PREFIX,
} from "../../constants/dummy";
import useNavigator from "../../hooks/useNavigator";
import { useLocation } from "react-router-dom";
import { MESSAGES } from "../../constants/messages";

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
  } = useUrl();

  const navigateHandler = useNavigator();
  const { pathname } = useLocation();

  /* www.만 있을 때 input 에러 x, www. + 입력 글자가 있을 때 url 형식 검사 후 통과 못할 시 에러메시지 */
  const urlInputLabel =
    urlSearchInput.length <= DEFAULT_URL_VALUE.length
      ? MESSAGES.ENTER_URL
      : urlError.hasError || urlSearchInput.length > URL_MAX_LENGTH
      ? urlError.errorMessage
      : MESSAGES.CORRECT_URL;

  /* set default prefix to http */

  return (
    <div>
      {alert.hasAlert && (
        <Modal>
          <Card className="modal">{alert.alertMessage}</Card>
        </Modal>
      )}
      <p className="text-center mb-20 text-2xl font-bold text-2xl md:text-lg">
        MAKE YOUR OWN URL LIST
      </p>
      <div className="flex md:flex-col">
        <div className="mr-2 md:mr-0 md:mb-3">
          <Select
            label="Select URL prefix"
            onChange={selectUrlPefixHandler}
            value={String(selectedUrlPrefix.id)}
          >
            {URL_PREFIX.map((urlPrefix: any) => (
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
              <span>Add</span>
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
              >
                {list.url}
                <List.Item.Icon
                  clickHandler={(event: React.MouseEvent<HTMLElement>) => {
                    removeUrlHandler(list.id);
                    event.stopPropagation();
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </List.Item.Icon>
              </List.Item>
            ))}
          </List>
        ) : (
          /* local storage에 저장된 URL이 없는 경우 fallback UI */
          <div className="h-full w-full flex justify-center items-center md:text-sm">
            Why don't you add some urls to your list?
          </div>
        )}
      </Card>
    </div>
  );
}
