import { MigrationInterface, QueryRunner } from "typeorm"

export class RenameMethodHttpIntoPermission1654799774843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn("permission", "method_http", "http_method");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn("permission", "http_method", "method_http");
    }

}
