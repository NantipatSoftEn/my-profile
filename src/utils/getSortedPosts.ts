import type { CollectionEntry } from "astro:content";
import {postFilter,noteFilter} from "./postFilter";

const getSortedItems = <T extends CollectionEntry<"blog"|"note">>(
  items: T[],
  filterFn: (item: T) => boolean
): T[] => {
  return items
    .filter(filterFn)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return getSortedItems(posts, postFilter);
};

const getSortedNotes = (notes: CollectionEntry<"note">[]) => {
  return getSortedItems(notes, noteFilter);
};

export { getSortedPosts, getSortedNotes };