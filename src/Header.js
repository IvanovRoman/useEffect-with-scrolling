import React, { useState, useEffect } from "react";

import useDocumentScrollThrottled from "./useDocumentScrollThrottled";

const Header = () => {
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [shouldShowShadow, setShouldShowShadow] = useState(false);

  const [inc, setInc] = useState(0);
  const MINIMUM_SCROLL = 20;

  useEffect(() => {
    console.log("Re-rendering");
  }, [inc]);

  useDocumentScrollThrottled(callbackData => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setShouldShowShadow(currentScrollTop > 2);

    setShouldHideHeader(isScrolledDown && isMinimumScrolled);
  });

  const shadowStyle = shouldShowShadow ? "shadow" : "";
  const hiddenStyle = shouldHideHeader ? "hidden" : "";

  return (
    <header className={`header ${hiddenStyle} ${shadowStyle}`}>
      <div className="logo">Logo</div>
      <button onClick={() => setInc(inc + 1)}>Inc</button>
      <span>{inc}</span>
      <ul className="links">
        <li className="link-item">home</li>
        <li className="link-item">about</li>
        <li className="link-item">join</li>
      </ul>
    </header>
  );
};

export default Header;
