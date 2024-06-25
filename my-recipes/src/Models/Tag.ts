export interface TagItem {
  displayName: string;
  name: string;
  id: number;
}

export class Tag implements TagItem {
  constructor(
    public displayName: string,
    public name: string,
    public id: number
  ) {}
}
