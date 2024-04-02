import { useState, useEffect } from 'react';

function getWindowDimensions() {
  if(typeof window === "undefined")
  {
    return {
      width: 8880,
      height: 8880
    };
  }
  else
  {
    console.log("typeof window",typeof window)
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
