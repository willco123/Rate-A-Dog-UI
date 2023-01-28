import React, { useState } from "react";
import "./collapsible-span.css";
import classnames from "classnames";

export default function CollapsibleSpan({
  WrappedComponent,
  displayedText,
}: {
  WrappedComponent: JSX.Element;
  displayedText: string;
}) {
  const [isCollapsed, setIsCollaped] = useState<boolean>(false);

  return (
    <div className="collapsible">
      <span
        className={classnames("rotating-arrow", {
          active: !isCollapsed,
        })}
        onClick={() => setIsCollaped(!isCollapsed)}
      />
      <span
        className="content-header"
        onClick={() => setIsCollaped(!isCollapsed)}
      >
        {" " + displayedText}
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
