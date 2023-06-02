import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../layouts/Layout";
import {
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { IUrlItem } from "../../@types/data.types";
import localStorage from "../../utils/localStorage";
import uuid from "react-uuid";
import { localStorageKeys } from "../../constants/dummy";

export default function UrlList() {
  const [urlList, setUrlList] = useState<Array<IUrlItem>>([]);
  const [urlSearchInput, setUrlSearchInput] = useState("");
  const uniqueId = uuid();

  const urlSearchInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUrlSearchInput(event.target.value);
  };

  const addUrlHandler = () => {
    /* 중복체크, url 검증 */
    const urlFromLocalStorage = localStorage.getData(
      localStorageKeys.url_list
    ) as string;
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

  useEffect(() => {
    setUrlList(
      JSON.parse(localStorage.getData(localStorageKeys.url_list) as string) ??
        []
    );
  }, []);

  return (
    <Layout>
      <div className="w-96">
        <div className="flex">
          <Input
            label="Enter URL"
            value={urlSearchInput}
            onChange={urlSearchInputHandler}
          />
          <Button className="ml-2" onClick={addUrlHandler}>
            Button
          </Button>
        </div>
        {!!urlList.length && (
          <Card>
            <List>
              {urlList.map((list: IUrlItem) => (
                <ListItem ripple={false} className="py-1 pr-1 pl-4">
                  {list.url}
                  <ListItemSuffix>
                    <IconButton variant="text" color="blue-gray">
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </Card>
        )}
      </div>
    </Layout>
  );
}
