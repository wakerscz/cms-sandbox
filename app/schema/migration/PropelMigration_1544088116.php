<?php

use Propel\Generator\Manager\MigrationManager;

/**
 * Data object containing the SQL and PHP code to migrate the database
 * up to version 1544088116.
 * Generated on 2018-12-06 09:21:56 by root
 */
class PropelMigration_1544088116
{
    public $comment = '';

    public function preUp(MigrationManager $manager)
    {
        // add the pre-migration code here
    }

    public function postUp(MigrationManager $manager)
    {
        // add the post-migration code here
    }

    public function preDown(MigrationManager $manager)
    {
        // add the pre-migration code here
    }

    public function postDown(MigrationManager $manager)
    {
        // add the post-migration code here
    }

    /**
     * Get the SQL statements for the Up migration
     *
     * @return array list of the SQL strings to execute for the Up migration
     *               the keys being the datasources
     */
    public function getUpSQL()
    {
        return array (
  'wakers_cms' => '
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `wakers_user`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` TINYINT DEFAULT 0 NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
    `last_login` DATETIME,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_user_u_ce4c89` (`email`)
) ENGINE=InnoDB;

CREATE TABLE `wakers_user_role`
(
    `user_id` INTEGER NOT NULL,
    `role_key` INTEGER NOT NULL,
    PRIMARY KEY (`user_id`,`role_key`),
    CONSTRAINT `wakers_user_role_fk_92d8d4`
        FOREIGN KEY (`user_id`)
        REFERENCES `wakers_user` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_user_personal_data`
(
    `user_id` INTEGER NOT NULL,
    `phone` VARCHAR(32),
    `first_name` VARCHAR(128),
    `last_name` VARCHAR(128),
    PRIMARY KEY (`user_id`),
    CONSTRAINT `wakers_user_personal_data_fk_92d8d4`
        FOREIGN KEY (`user_id`)
        REFERENCES `wakers_user` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_lang`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(8) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_lang_u_d94269` (`name`)
) ENGINE=InnoDB;

CREATE TABLE `wakers_lang_system`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `params` VARCHAR(255),
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_lang_system_u_019dad` (`slug`)
) ENGINE=InnoDB;

CREATE TABLE `wakers_page`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `view` VARCHAR(32) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `is_published` TINYINT(1) DEFAULT 0 NOT NULL,
    `tree_left` INTEGER,
    `tree_right` INTEGER,
    `tree_level` INTEGER,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_page_u_d94269` (`name`)
) ENGINE=InnoDB;

CREATE TABLE `wakers_page_url`
(
    `page_id` INTEGER NOT NULL,
    `lang_id` INTEGER NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`page_id`),
    UNIQUE INDEX `wakers_page_url_u_df1472` (`url`),
    INDEX `wakers_page_url_fi_6965b3` (`lang_id`),
    CONSTRAINT `wakers_page_url_fk_f78eed`
        FOREIGN KEY (`page_id`)
        REFERENCES `wakers_page` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `wakers_page_url_fk_6965b3`
        FOREIGN KEY (`lang_id`)
        REFERENCES `wakers_lang` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_on_page_primary`
(
    `page_id` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(200),
    `indexing_type` TINYINT NOT NULL,
    `is_canonical` TINYINT(1) NOT NULL,
    PRIMARY KEY (`page_id`),
    UNIQUE INDEX `wakers_on_page_primary_u_639136` (`title`),
    CONSTRAINT `wakers_on_page_primary_fk_f78eed`
        FOREIGN KEY (`page_id`)
        REFERENCES `wakers_page` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_on_page_social`
(
    `page_id` INTEGER NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(100),
    `image` VARCHAR(100),
    PRIMARY KEY (`page_id`),
    UNIQUE INDEX `wakers_on_page_social_u_639136` (`title`),
    CONSTRAINT `wakers_on_page_social_fk_f78eed`
        FOREIGN KEY (`page_id`)
        REFERENCES `wakers_page` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_on_page_redirect`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `page_id` INTEGER NOT NULL,
    `old_url` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_on_page_redirect_u_6e09ed` (`old_url`),
    INDEX `wakers_on_page_redirect_fi_f78eed` (`page_id`),
    CONSTRAINT `wakers_on_page_redirect_fk_f78eed`
        FOREIGN KEY (`page_id`)
        REFERENCES `wakers_page` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_category`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lang_id` INTEGER,
    `name` VARCHAR(64) NOT NULL,
    `slug` VARCHAR(64) NOT NULL,
    `tree_left` INTEGER,
    `tree_right` INTEGER,
    `tree_level` INTEGER,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_category_u_019dad` (`slug`),
    INDEX `wakers_category_fi_6965b3` (`lang_id`),
    CONSTRAINT `wakers_category_fk_6965b3`
        FOREIGN KEY (`lang_id`)
        REFERENCES `wakers_lang` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_recipe`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `is_dynamic` TINYINT(1) DEFAULT 1 NOT NULL,
    `max_categories` INTEGER DEFAULT 0 NOT NULL,
    `max_instances` INTEGER DEFAULT 0 NOT NULL,
    `max_depth` INTEGER DEFAULT 0 NOT NULL,
    `allowed_parent_id` INTEGER,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `wakers_recipe_slug`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_id` INTEGER NOT NULL,
    `slug` VARCHAR(32) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_recipe_slug_u_019dad` (`slug`),
    INDEX `wakers_recipe_slug_fi_b6d3ba` (`recipe_id`),
    CONSTRAINT `wakers_recipe_slug_fk_b6d3ba`
        FOREIGN KEY (`recipe_id`)
        REFERENCES `wakers_recipe` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_recipe_category_allowed`
(
    `recipe_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    PRIMARY KEY (`recipe_id`,`category_id`),
    INDEX `wakers_recipe_category_allowed_fi_2e24cc` (`category_id`),
    CONSTRAINT `wakers_recipe_category_allowed_fk_b6d3ba`
        FOREIGN KEY (`recipe_id`)
        REFERENCES `wakers_recipe` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `wakers_recipe_category_allowed_fk_2e24cc`
        FOREIGN KEY (`category_id`)
        REFERENCES `wakers_category` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_recipe_variable`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_id` INTEGER NOT NULL,
    `slug` VARCHAR(32) NOT NULL,
    `type` VARCHAR(32) NOT NULL,
    `label` VARCHAR(64) NOT NULL,
    `tooltip` VARCHAR(256),
    `is_required` TINYINT(1) DEFAULT 1 NOT NULL,
    `regex_pattern` VARCHAR(256),
    `regex_message` VARCHAR(256),
    `allowed_types` TEXT,
    `max_files` INTEGER DEFAULT 0 NOT NULL,
    `max_file_size` FLOAT DEFAULT 0 NOT NULL,
    `items` TEXT,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_recipe_variable_u_218a41` (`recipe_id`, `slug`),
    CONSTRAINT `wakers_recipe_variable_fk_b6d3ba`
        FOREIGN KEY (`recipe_id`)
        REFERENCES `wakers_recipe` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_structure`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipe_slug_id` INTEGER,
    `updated_by` INTEGER,
    `created_at` DATETIME,
    `updated_at` DATETIME,
    `tree_left` INTEGER,
    `tree_right` INTEGER,
    `tree_level` INTEGER,
    PRIMARY KEY (`id`),
    INDEX `wakers_structure_fi_0a9bd5` (`recipe_slug_id`),
    INDEX `wakers_structure_fi_13aff0` (`updated_by`),
    CONSTRAINT `wakers_structure_fk_0a9bd5`
        FOREIGN KEY (`recipe_slug_id`)
        REFERENCES `wakers_recipe_slug` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `wakers_structure_fk_13aff0`
        FOREIGN KEY (`updated_by`)
        REFERENCES `wakers_user` (`id`)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE `wakers_structure_value`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `structure_id` INTEGER NOT NULL,
    `recipe_variable_id` INTEGER NOT NULL,
    `content` TEXT,
    `internal_link_to_url` INTEGER,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `wakers_structure_value_u_d8c710` (`structure_id`, `recipe_variable_id`),
    INDEX `wakers_structure_value_fi_b761e5` (`recipe_variable_id`),
    INDEX `wakers_structure_value_fi_8325f0` (`internal_link_to_url`),
    CONSTRAINT `wakers_structure_value_fk_cdaf1e`
        FOREIGN KEY (`structure_id`)
        REFERENCES `wakers_structure` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `wakers_structure_value_fk_b761e5`
        FOREIGN KEY (`recipe_variable_id`)
        REFERENCES `wakers_recipe_variable` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `wakers_structure_value_fk_8325f0`
        FOREIGN KEY (`internal_link_to_url`)
        REFERENCES `wakers_page_url` (`page_id`)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE `wakers_structure_value_file`
(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255),
    `size_mb` FLOAT NOT NULL,
    `uploaded_at` DATETIME,
    PRIMARY KEY (`id`),
    INDEX `wakers_structure_value_file_fi_4faaf8` (`value_id`),
    CONSTRAINT `wakers_structure_value_file_fk_4faaf8`
        FOREIGN KEY (`value_id`)
        REFERENCES `wakers_structure_value` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_structure_in_page`
(
    `structure_id` INTEGER NOT NULL,
    `page_id` INTEGER NOT NULL,
    PRIMARY KEY (`structure_id`,`page_id`),
    INDEX `wakers_structure_in_page_fi_f78eed` (`page_id`),
    CONSTRAINT `wakers_structure_in_page_fk_cdaf1e`
        FOREIGN KEY (`structure_id`)
        REFERENCES `wakers_structure` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `wakers_structure_in_page_fk_f78eed`
        FOREIGN KEY (`page_id`)
        REFERENCES `wakers_page` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_structure_in_category`
(
    `structure_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    PRIMARY KEY (`structure_id`,`category_id`),
    INDEX `wakers_structure_in_category_fi_2e24cc` (`category_id`),
    CONSTRAINT `wakers_structure_in_category_fk_cdaf1e`
        FOREIGN KEY (`structure_id`)
        REFERENCES `wakers_structure` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `wakers_structure_in_category_fk_2e24cc`
        FOREIGN KEY (`category_id`)
        REFERENCES `wakers_category` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `wakers_lang_system_i18n`
(
    `id` INTEGER NOT NULL,
    `locale` VARCHAR(5) DEFAULT \'en\' NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`,`locale`),
    CONSTRAINT `wakers_lang_system_i18n_fk_2688c2`
        FOREIGN KEY (`id`)
        REFERENCES `wakers_lang_system` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB;

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;
',
);
    }

    /**
     * Get the SQL statements for the Down migration
     *
     * @return array list of the SQL strings to execute for the Down migration
     *               the keys being the datasources
     */
    public function getDownSQL()
    {
        return array (
  'wakers_cms' => '
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `wakers_user`;

DROP TABLE IF EXISTS `wakers_user_role`;

DROP TABLE IF EXISTS `wakers_user_personal_data`;

DROP TABLE IF EXISTS `wakers_lang`;

DROP TABLE IF EXISTS `wakers_lang_system`;

DROP TABLE IF EXISTS `wakers_page`;

DROP TABLE IF EXISTS `wakers_page_url`;

DROP TABLE IF EXISTS `wakers_on_page_primary`;

DROP TABLE IF EXISTS `wakers_on_page_social`;

DROP TABLE IF EXISTS `wakers_on_page_redirect`;

DROP TABLE IF EXISTS `wakers_category`;

DROP TABLE IF EXISTS `wakers_recipe`;

DROP TABLE IF EXISTS `wakers_recipe_slug`;

DROP TABLE IF EXISTS `wakers_recipe_category_allowed`;

DROP TABLE IF EXISTS `wakers_recipe_variable`;

DROP TABLE IF EXISTS `wakers_structure`;

DROP TABLE IF EXISTS `wakers_structure_value`;

DROP TABLE IF EXISTS `wakers_structure_value_file`;

DROP TABLE IF EXISTS `wakers_structure_in_page`;

DROP TABLE IF EXISTS `wakers_structure_in_category`;

DROP TABLE IF EXISTS `wakers_lang_system_i18n`;

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;
',
);
    }

}