import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserGroupHasPermission1654786402340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_group_has_permission",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "user_group_id",
            type: "int",
          },
          {
            name: "permission_id",
            type: "int",
          },
          {
            name: "status",
            type: "bool"
          }
        ],
      })
    );

    await queryRunner.createForeignKey(
      "user_group_has_permission",
      new TableForeignKey({
        columnNames: ["user_group_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user_group",
      })
    );

    await queryRunner.createForeignKey(
      "user_group_has_permission",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "permission",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_group_has_permission");
  }
}
