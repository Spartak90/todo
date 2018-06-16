
export class Task {
  private _id: string;
  name: string;
  completed: boolean;

  get id(): string {
    return this._id;
  }

  constructor(initData?: {id: string, name: string, completed: boolean}) {
    if (!initData) {
      return;
    }

    this._id = initData.id;
    this.name = initData.name;
    this.completed = initData.completed;
  }
}
