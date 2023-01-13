import React, { useState } from "react";
import "./collapsible-span.css";
import classnames from "classnames";

export default function CollapsibleSpan({
  WrappedComponent,
}: {
  WrappedComponent: JSX.Element;
}) {
  const [isCollapsed, setIsCollaped] = useState<boolean>(false);

  function handleClick(e: any) {
    setIsCollaped(!isCollapsed);
    console.log(e.target.className);
  }
  return (
    <div className="collapsible">
      <span
        className={classnames("rotating-arrow", {
          active: !isCollapsed,
        })}
        onClick={(e) => handleClick(e)}
      />
      <span className="content-header" onClick={(e) => handleClick(e)}>
        {" "}
        Filter Breed
      </span>
      <div
        className={classnames("content", {
          disabled: isCollapsed,
        })}
      >
        {WrappedComponent}
      </div>
    </div>
  );
}
