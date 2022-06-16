import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateRegistration1653659459849 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "registration",
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true
          },
          {
            name: "registration_number",
            type: "varchar",
            length: "255"
          },
          {
            name: "registration_date",
            type: "date"
          },
          {
            name: "student_id",
            type: "int"
          },
          {
            name: "school_id",
            type: "int"
          },
          {
            name: "school_class_id",
            type: "int"
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      "registration",
      new TableForeignKey({
        columnNames: ["student_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "student"
      })
    );

    await queryRunner.createForeignKey(
      "registration",
      new TableForeignKey({
        columnNames: ["school_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "school"
      })
    );

    await queryRunner.createForeignKey(
      "registration",
      new TableForeignKey({
        columnNames: ["school_class_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "school_class"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("registration");
  }

}
