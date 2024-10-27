import type { CollectionEntry } from "astro:content";
import { SITE } from "@config"; // Assuming SITE is imported from a config file

const genericFilter = <T extends CollectionEntry<"blog" | "note">>({ data }: T) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

const postFilter = (entry: CollectionEntry<"blog">) => genericFilter(entry);
const noteFilter = (entry: CollectionEntry<"note">) => genericFilter(entry);

export { postFilter, noteFilter };