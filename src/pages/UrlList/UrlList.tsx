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
import { URL_PREFIX } from "../../constants/dummy";
import useNavigator from "../../hooks/useNavigator";
import { useLocation } from "react-router-dom";

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
  } = useUrl();

  const navigateHandler = useNavigator();
  const { pathname } = useLocation();

  /* set default prefix to http */

  return (
    <div>
      {/* <Modal>
        <div>hi</div>
      </Modal> */}
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
            label="Enter URL"
            value={urlSearchInput}
            onChange={urlSearchInputHandler}
            onKeyDown={stopDeleteUrlHandler}
          />
          <ButtonGroup className="ml-2">
            <Button onClick={addUrlHandler} ripple={false} variant="outlined">
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
