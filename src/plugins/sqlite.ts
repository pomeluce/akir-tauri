import Database from '@tauri-apps/plugin-sql';

export class Sqlite {
  #name: string;
  #dbInstance: Promise<void>;
  #db!: Database;

  constructor(tableName: string, statement: string) {
    this.#name = tableName;
    this.#dbInstance = this.init(statement);
  }

  private async init(statement: string) {
    this.#db = await Database.load(`sqlite:Databases/${this.#name}.db`);

    this.#db.execute(statement).catch(err => {
      console.error('error initializing database: ', err);
      throw err;
    });
  }

  public async db(): Promise<Database> {
    await this.#dbInstance;
    return this.#db;
  }

  public get tableName() {
    return this.#name;
  }
}
