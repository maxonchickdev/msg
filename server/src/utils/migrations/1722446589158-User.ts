import { MigrationInterface, QueryRunner } from "typeorm";

export class User1722446589158 implements MigrationInterface {
    name = 'User1722446589158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`confirmation_codes\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`isVerified\` tinyint NOT NULL, \`confirmationCodeId\` bigint NULL, UNIQUE INDEX \`REL_eeb6c1cfe37f4fbf7510830d70\` (\`confirmationCodeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_eeb6c1cfe37f4fbf7510830d706\` FOREIGN KEY (\`confirmationCodeId\`) REFERENCES \`confirmation_codes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_eeb6c1cfe37f4fbf7510830d706\``);
        await queryRunner.query(`DROP INDEX \`REL_eeb6c1cfe37f4fbf7510830d70\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`confirmation_codes\``);
    }

}
