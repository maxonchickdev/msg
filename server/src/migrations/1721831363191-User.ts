import { MigrationInterface, QueryRunner } from "typeorm";

export class User1721831363191 implements MigrationInterface {
    name = 'User1721831363191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`validation_codes\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`isVerified\` tinyint NOT NULL, \`validationCodeId\` bigint NULL, UNIQUE INDEX \`REL_a7e39d5c18caa36b7e67c56c4b\` (\`validationCodeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a7e39d5c18caa36b7e67c56c4b0\` FOREIGN KEY (\`validationCodeId\`) REFERENCES \`validation_codes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a7e39d5c18caa36b7e67c56c4b0\``);
        await queryRunner.query(`DROP INDEX \`REL_a7e39d5c18caa36b7e67c56c4b\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`validation_codes\``);
    }

}
