import React, { useState, useEffect } from "react";
import TableAndFilters from "../table-and-filters/TableAndFilters.js";
import { TableData } from "../../types.js";
import classnames from "classnames";
import "./expandable-div.scss";

export default function ExpandableDiv({
  setFilteredBreed,
  filteredBreed,
  getTableData,
}: {
  filteredBreed:
    | {
        breed: string;
        subBreed: string | null;
      }
    | undefined;
  setFilteredBreed: React.Dispatch<
    React.SetStateAction<
      | {
          breed: string;
          subBreed: string | null;
        }
      | undefined
    >
  >;
  getTableData: () => Promise<TableData[] | undefined>;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [divHeight, setDivHeight] = useState<number>(300);
  const [initialMousePos, setInitialMousePos] = useState(0);

  useEffect(() => {
    if (isMouseDown) {
      document.onmousemove = handleResize;
    } else {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }, [isMouseDown]);

  function handleResize(e: MouseEvent) {
    const diff = initialMousePos - e.clientY;
    setDivHeight(divHeight + diff);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    setIsMouseDown(true);
    setInitialMousePos(e.clientY);
    document.onmouseup = mouseUpHelper;
  }

  function mouseUpHelper() {
    setIsMouseDown(false);
  }

  return (
    <div
      className={classnames("expandable-div", {
        expanded: isExpanded,
      })}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={classnames("widget", { expanded: isExpanded })}
        style={{
          bottom: isExpanded ? `${divHeight}px` : 0,
        }}
      >
        <div className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      <div
        className={classnames("content", {
          expanded: isExpanded,
        })}
        style={{
          height: isExpanded ? `${divHeight}px` : 0,
        }}
      >
        <div className="resize-drag" onMouseDown={handleMouseDown} />
        <div className="table-wrapper">
          <TableAndFilters
            filteredBreed={filteredBreed}
            setFilteredBreed={setFilteredBreed}
            getTableData={getTableData}
          />
        </div>
      </div>
    </div>
  );
}
