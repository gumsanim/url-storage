export interface UrlItem {
  id: string;
  url: string;
}

export interface UrlPrefix {
  id: number;
  prefix: string;
}

export interface LocalStorageKey {
  [key: string]: string;
}

export interface YearInfo {
  id: number;
  desc: string;
  year: string;
}
