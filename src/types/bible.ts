// Type definitions for thaikjv.json Bible data

export interface BibleMetadata {
  name: string;
  shortname: string;
  module: string;
  year: string;
  publisher: string | null;
  owner: string | null;
  description: string;
  lang: string;
  lang_short: string;
  copyright: number;
  copyright_statement: string;
  url: string | null;
  citation_limit: number;
  restrict: number;
  italics: number;
  strongs: number;
  red_letter: number;
  paragraph: number;
  official: number;
  research: number;
  module_version: string;
}

export interface BibleVerse {
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface ThaiKJVData {
  metadata: BibleMetadata;
  verses: BibleVerse[];
}

export interface BibleBook {
  name: string;
  book_id: number;
  chapters: number[];
}

export interface BibleNote {
  id: string;
  bookId: number;
  bookName: string;
  chapter: number;
  verse: number;
  note: string;
  created: Date;
  updated: Date;
}