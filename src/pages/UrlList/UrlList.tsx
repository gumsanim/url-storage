import Layout from "../../layouts/Layout";
import {
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
  ButtonGroup,
  Alert,
} from "@material-tailwind/react";
import { TrashIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { IUrlItem } from "../../@types/data.types";
import useUrl from "../../hooks/useUrl";

export default function UrlList() {
  const {
    urlList,
    urlSearchInput,
    urlSearchInputHandler,
    addUrlHandler,
    removeUrlHandler,
  } = useUrl();

  return (
    <Layout>
      <div className="w-96">
        <div className="flex mb-2">
          <Input
            label="Enter URL"
            value={urlSearchInput}
            onChange={urlSearchInputHandler}
          />
          <ButtonGroup className="ml-2">
            <Button onClick={addUrlHandler} ripple={false} variant="outlined">
              <span>Add</span>
            </Button>
          </ButtonGroup>
        </div>
        <Card className="h-[18rem]">
          {urlList.length ? (
            <List>
              {urlList.map((list: IUrlItem) => (
                <ListItem
                  key={list.id}
                  ripple={false}
                  className="py-1 pr-1 pl-4"
                >
                  {list.url}
                  <ListItemSuffix>
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => {
                        removeUrlHandler(list.id);
                      }}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              Why don't you add your URLs?
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
