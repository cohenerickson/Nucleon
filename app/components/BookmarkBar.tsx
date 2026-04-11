import "./bookmarkBar.css";
import { Reorder } from "motion/react";
import { useState } from "react";
import { IoEarthOutline } from "react-icons/io5";

export function BookmarkBar() {
  const [bookmarks, setBookmarks] = useState<string[]>([
    "Bookmark 1",
    "Bookmark 2",
    ""
  ]);

  return (
    <>
      <div className="bookmark-bar">
        <Reorder.Group
          as="div"
          className="bookmark-section"
          axis="x"
          values={bookmarks}
          onReorder={setBookmarks}
        >
          {bookmarks.map((bookmarkId) => (
            <Reorder.Item
              as="div"
              value={bookmarkId}
              key={bookmarkId}
              className="bookmark-item"
            >
              <IoEarthOutline className="bookmark-icon" />
              {bookmarkId && (
                <label className="bookmark-title">{bookmarkId}</label>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </>
  );
}
