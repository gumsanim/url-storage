import {
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
  ButtonGroup,
  Select,
  Option,
} from "@material-tailwind/react";
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
    stopDeleteUrlHandler,
    urlError,
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
      {/* {urlError.hasError && (
        <Modal>
          <div>hi</div>
        </Modal>
      )} */}

      <p className="text-center mb-20 text-2xl font-bold">
        MAKE YOUR OWN URL LIST
      </p>
      <div className="flex flex-row">
        <div className="mr-2">
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
        <div className="mr-2 flex w-96">
          <Input
            label={
              urlSearchInput.length <= DEFAULT_URL_VALUE.length
                ? "Url을 입력하세요."
                : urlError.hasError
                ? urlError.errorMessage
                : "올바른 형식의 URL입니다."
            }
            error={
              urlSearchInput.length > DEFAULT_URL_VALUE.length &&
              urlError.hasError
            }
            value={urlSearchInput}
            onChange={urlSearchInputHandler}
            onKeyDown={stopDeleteUrlHandler}
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
      <Card className="h-[18rem]">
        {urlList.length ? (
          /* ocal storage에 저장된 URL이 있는 경우 fallback UI */
          <List>
            {urlList.map((list: UrlItem) => (
              <ListItem
                key={list.id}
                ripple={false}
                className="py-1 pr-1 pl-4"
                onClick={() => navigateHandler(`${pathname}/detail/${list.id}`)}
              >
                {list.url}
                <ListItemSuffix>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      removeUrlHandler(list.id);
                      /* event bubbling 방지 */
                      event.stopPropagation();
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        ) : (
          /* local storage에 저장된 URL이 없는 경우 fallback UI */
          <div className="h-full w-full flex justify-center items-center">
            Why don't you make your own URL list?
          </div>
        )}
      </Card>
    </div>
  );
}
