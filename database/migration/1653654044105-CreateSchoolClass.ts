import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSchoolClass1653654044105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "school_class",
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
            type: "text",
            isNullable: true,
            default: null,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("school_class");
  }
}
