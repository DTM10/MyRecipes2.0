export class Recipe {
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

  toggleLike() {
    if (!this.liked) {
      this.liked = true;
    }
    this.liked = !this.liked;
  }
}
