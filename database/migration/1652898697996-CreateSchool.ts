import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSchool1652898697996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "school",
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
                        length: "255"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("school");
    }

}
