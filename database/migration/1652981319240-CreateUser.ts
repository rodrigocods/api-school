import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUser1652981319240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "80",
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "100",
          },
          {
            name: "user_group_id",
            type: "int"
          }
        ],
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["user_group_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user_group",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
