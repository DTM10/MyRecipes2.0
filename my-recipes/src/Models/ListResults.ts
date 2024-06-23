export interface ListResults {
  results: {
    id: number;
    thumbnail_url: string;
    name: string;
    description: string;
    sections: { components: { raw_text: string }[] }[];
    instructions: { display_text: string }[];
    credits: { name: string }[];
    video_url: string;
  }[];
}
