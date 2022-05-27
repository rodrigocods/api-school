import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateClass1653654044105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "class",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        generationStrategy: "increment",
                        isPrimary: true
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "school_id",
                        type: "int"
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "class",
            new TableForeignKey({
                columnNames: ["school_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "school"
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("class")
    }

}
