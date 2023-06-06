import { useState, useEffect } from 'react';
import useNavigator from '../../hooks/useNavigator';
import Layout from '../../layouts/Layout';

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
      <p>
        <span>{count}</span>초 후에 이동합니다.
      </p>
    </div>
  );
}
