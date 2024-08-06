export interface ResultObj {
  id: number;
  type?: string;
  thumbnail_url: string;
  name: string;
  description: string;
  sections: { components: { raw_text: string }[] }[];
  instructions: { display_text: string }[];
  credits: { name: string }[];
  video_url: string;
  recipes?: {
    id: number;
    type?: string;
    thumbnail_url: string;
    name: string;
    description: string;
    sections: { components: { raw_text: string }[] }[];
    instructions: { display_text: string }[];
    credits: { name: string }[];
    video_url: string;
  }[];
}

export interface ListResults {
  results: ResultObj[];
}

export interface QueryResults {
  results: {
    item: ResultObj;
    type: string;
  }[];
}
