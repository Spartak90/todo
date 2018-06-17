
export class Task {
  readonly id: string;
  name: string;
  completed: boolean;

  constructor(initData?: {id?: string, name?: string, completed?: boolean}) {
    if (!initData) {
      return;
    }

    this.id = initData.id;
    this.name = initData.name;
    this.completed = initData.completed;
  }
}
