import {
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { UrlItem } from "../../@types/data.types";
import useUrl from "../../hooks/useUrl";
import { lazy } from "react";

export default function UrlList() {
  const {
    urlList,
    urlSearchInput,
    urlSearchInputHandler,
    addUrlHandler,
    removeUrlHandler,
  } = useUrl();

  return (
    <div>
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
          /* ocal storage에 저장된 URL이 있는 경우 fallback UI */
          <List>
            {urlList.map((list: UrlItem) => (
              <ListItem key={list.id} ripple={false} className="py-1 pr-1 pl-4">
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
          /* local storage에 저장된 URL이 없는 경우 fallback UI */
          <div className="h-full w-full flex justify-center items-center">
            Why don't you add your URLs?
          </div>
        )}
      </Card>
    </div>
  );
}
