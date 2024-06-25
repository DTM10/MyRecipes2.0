export interface RecipeItem {
  id: number;
  title: string;
  imgURL: string;
  description: string;
  instructions: string[];
  credits: string[];
  videoURL: string;
  liked?: boolean;
  ingredients: string[];
}

export class Recipe implements RecipeItem {
  constructor(
    public id: number,
    public title: string,
    public imgURL: string,
    public description: string,
    public ingredients: string[],
    public instructions: string[],
    public credits: string[],
    public videoURL: string,
    public liked?: boolean
  ) {}
}
