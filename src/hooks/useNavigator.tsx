import { useNavigate } from "react-router-dom";

const useNavigator = () => {
  /*
    react-router-dom의 useNavigate를
    활용하여 다른 url로 이동 및 콜백 함수를 실행하는 hook 입니다.
  */
  const navigation = useNavigate();
  const navigateHandler = (url: string, callback?: () => void) => {
    navigation(url);
    callback && callback();
  };

  return navigateHandler;
};

export default useNavigator;
