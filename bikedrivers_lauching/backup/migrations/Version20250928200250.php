<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250928200250 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE applications (id INT AUTO_INCREMENT NOT NULL, offer_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', state VARCHAR(255) DEFAULT \'EVALUATING\' NOT NULL, INDEX IDX_F7C966F053C674EE (offer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE applications_documents (applications_id INT NOT NULL, documents_id INT NOT NULL, INDEX IDX_1429FF6929A0022 (applications_id), INDEX IDX_1429FF695F0F2752 (documents_id), PRIMARY KEY(applications_id, documents_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE documents (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, path LONGTEXT NOT NULL, added_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_A2B07288A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE match_documents (id INT AUTO_INCREMENT NOT NULL, document_id INT NOT NULL, required_document_id INT NOT NULL, state VARCHAR(255) DEFAULT \'UNEVALUATED\' NOT NULL, INDEX IDX_BB013E23C33F7837 (document_id), INDEX IDX_BB013E23837C14A7 (required_document_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offers (id INT AUTO_INCREMENT NOT NULL, vehicle_id INT NOT NULL, id_taker BIGINT DEFAULT NULL, description LONGTEXT NOT NULL, status VARCHAR(255) DEFAULT \'AVAILABLE\', created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', starts_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ends_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', title VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, service VARCHAR(255) DEFAULT \'LOCATION\' NOT NULL, INDEX IDX_DA460427545317D1 (vehicle_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pictures (id INT AUTO_INCREMENT NOT NULL, vehicle_id INT NOT NULL, path LONGTEXT NOT NULL, added_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_8F7C2FC0545317D1 (vehicle_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE required_documents (id INT AUTO_INCREMENT NOT NULL, offer_id INT NOT NULL, informations LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', name VARCHAR(255) NOT NULL, INDEX IDX_CC40314C53C674EE (offer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `users` (id INT AUTO_INCREMENT NOT NULL, mail VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_IDENTIFIER_MAIL (mail), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicles (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, type VARCHAR(50) NOT NULL, model VARCHAR(50) NOT NULL, brand VARCHAR(50) NOT NULL, added_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', purchased_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_1FCE69FAA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE applications ADD CONSTRAINT FK_F7C966F053C674EE FOREIGN KEY (offer_id) REFERENCES offers (id)');
        $this->addSql('ALTER TABLE applications_documents ADD CONSTRAINT FK_1429FF6929A0022 FOREIGN KEY (applications_id) REFERENCES applications (id)');
        $this->addSql('ALTER TABLE applications_documents ADD CONSTRAINT FK_1429FF695F0F2752 FOREIGN KEY (documents_id) REFERENCES documents (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE documents ADD CONSTRAINT FK_A2B07288A76ED395 FOREIGN KEY (user_id) REFERENCES `users` (id)');
        $this->addSql('ALTER TABLE match_documents ADD CONSTRAINT FK_BB013E23C33F7837 FOREIGN KEY (document_id) REFERENCES documents (id)');
        $this->addSql('ALTER TABLE match_documents ADD CONSTRAINT FK_BB013E23837C14A7 FOREIGN KEY (required_document_id) REFERENCES required_documents (id)');
        $this->addSql('ALTER TABLE offers ADD CONSTRAINT FK_DA460427545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)');
        $this->addSql('ALTER TABLE pictures ADD CONSTRAINT FK_8F7C2FC0545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicles (id)');
        $this->addSql('ALTER TABLE required_documents ADD CONSTRAINT FK_CC40314C53C674EE FOREIGN KEY (offer_id) REFERENCES offers (id)');
        $this->addSql('ALTER TABLE vehicles ADD CONSTRAINT FK_1FCE69FAA76ED395 FOREIGN KEY (user_id) REFERENCES `users` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE applications DROP FOREIGN KEY FK_F7C966F053C674EE');
        $this->addSql('ALTER TABLE applications_documents DROP FOREIGN KEY FK_1429FF6929A0022');
        $this->addSql('ALTER TABLE applications_documents DROP FOREIGN KEY FK_1429FF695F0F2752');
        $this->addSql('ALTER TABLE documents DROP FOREIGN KEY FK_A2B07288A76ED395');
        $this->addSql('ALTER TABLE match_documents DROP FOREIGN KEY FK_BB013E23C33F7837');
        $this->addSql('ALTER TABLE match_documents DROP FOREIGN KEY FK_BB013E23837C14A7');
        $this->addSql('ALTER TABLE offers DROP FOREIGN KEY FK_DA460427545317D1');
        $this->addSql('ALTER TABLE pictures DROP FOREIGN KEY FK_8F7C2FC0545317D1');
        $this->addSql('ALTER TABLE required_documents DROP FOREIGN KEY FK_CC40314C53C674EE');
        $this->addSql('ALTER TABLE vehicles DROP FOREIGN KEY FK_1FCE69FAA76ED395');
        $this->addSql('DROP TABLE applications');
        $this->addSql('DROP TABLE applications_documents');
        $this->addSql('DROP TABLE documents');
        $this->addSql('DROP TABLE match_documents');
        $this->addSql('DROP TABLE offers');
        $this->addSql('DROP TABLE pictures');
        $this->addSql('DROP TABLE required_documents');
        $this->addSql('DROP TABLE `users`');
        $this->addSql('DROP TABLE vehicles');
    }
}
