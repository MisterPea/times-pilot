export type Multimedia = {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
};

export type Article = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: Multimedia[];
  short_url: string;
  addClass: string | undefined;
};

export type Bookmark = {
  id: string,
  date?: Article["published_date"],
  title?: Article["title"],
  summary?: Article["abstract"],
  url?: Article["url"],
};

type HexColor = `#${'0123456789abcdef' | 'ABCDEF'}{6}`;
type HexColorAlpha = `#${'0123456789abcdef' | 'ABCDEF'}{6}${'0123456789'}{2}`;
type RGBColor = `rgb(${number},${number},${number})`;
type RGBAColor = `rgba(${number},${number},${number},${number})`;
type HSLColor = `hsl(${number}, ${string}, ${string})`;

export type ColorType = string | HexColor | HexColorAlpha | RGBColor | RGBAColor | HSLColor;

export type PathLimits = {
  min: number,
  max: number,
};

export interface MaterialSpinnerProps {
  /** Radius of spinner @default 18 */
  radius?: number;
  /** Width of the stroke for track and path @default 4 */
  strokeWidth?: number;
  /** Duration of 1 rotation - in milliseconds @default 800 */
  rotationDuration?: number;
  /** Duration of the animation for the path - in milliseconds @default 4000 */
  pathAnimationDuration?: number;
  /** Path limits - how big and how small the path should animate in percent 0-1 @default {min: 0.02, max:0.98} */
  pathLimits?: PathLimits;
  /** Setting whether the path is static or not @default false */
  staticPath?: boolean;
  /** When employing a static path - what is the length in percent 0-1 @default 0.5 (50%) */
  staticPathLength?: number;
  /** Determine whether to show the track or not @default true */
  showTrack?: boolean;
  /** Determine the track color @default lightgrey */
  trackColor?: ColorType;
  /** Determine the path color @default black */
  pathColor?: ColorType;
}

export type NewsCategoryMap = {
  [key: string]: string; 
};