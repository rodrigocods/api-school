import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateStudent1653652637298 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "student",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
            length: "80"
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isUnique: true
          },
          {
            name: "password",
            type: "varchar",
            length: "100"
          },
          {
            name: "school_id",
            type: "int"
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      "student",
      new TableForeignKey({
        columnNames: ["school_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "school"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("student");
  }

}
