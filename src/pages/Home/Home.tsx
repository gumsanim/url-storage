import { useState, useEffect } from "react";
import useNavigator from "../../hooks/useNavigator";
import Layout from "../../layouts/Layout";

export default function Home() {
  const [count, setCount] = useState(3);
  const navigateHandler = useNavigator();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prevCount: number) => prevCount - 1);
    }, 1000);

    if (count === 0) navigateHandler(`/url_list`);

    /* setTImeout 클린업*/
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <div className="text-center">
      <p>프론트엔드 개발 지원자 최재호입니다.</p>
      <p>부족 하지만 잘 부탁드립니다.</p>
      <p>
        <span>{count}</span>초 후에 이동합니다.
      </p>
    </div>
  );
}
