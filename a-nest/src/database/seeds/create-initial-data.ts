import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Channels } from '../../entities/Channels';
import { Workspaces } from '../../entities/Workspaces';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Workspaces)
      .values([{ id: 1, name: 'Sleact', url: 'sleact' }])
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Channels)
      .values([{ id: 1, name: 'Sleact', private: false }])
      .execute();
  }
}
