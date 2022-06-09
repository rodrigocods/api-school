import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePermission1652123741282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permission",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
          },
          {
            name: "route",
            type: "varchar",
            length: "255",
          },
          {
            name: "method_http",
            type: "varchar",
            length: "20",
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("permission");
  }
}
