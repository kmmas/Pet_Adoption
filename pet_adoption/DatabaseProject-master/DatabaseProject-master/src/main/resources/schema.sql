-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema PetAdoption
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema PetAdoption
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `PetAdoption` DEFAULT CHARACTER SET utf8 ;
USE `PetAdoption` ;

-- -----------------------------------------------------
-- Table `PetAdoption`.`credentials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`credentials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`profile` (
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_profile_credentials1_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_credentials1`
    FOREIGN KEY (`id`)
    REFERENCES `PetAdoption`.`credentials` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`shelter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`shelter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `manager_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_shelter_profile1_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `fk_shelter_profile`
    FOREIGN KEY (`manager_id`)
    REFERENCES `PetAdoption`.`profile` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`pet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`pet` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `age` TINYINT NULL,
  `gender` ENUM("MALE", "FEMALE") NULL,
  `breed` VARCHAR(45) NULL,
  `health_status` VARCHAR(45) NULL,
  `image` VARCHAR(45) NULL,
  `is_adopted` TINYINT NULL DEFAULT 0,
  `shelter_id` INT NULL,
  `description` TEXT NULL,
  `behavior` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pet_shelter_idx` (`shelter_id` ASC) VISIBLE,
  CONSTRAINT `fk_pet_shelter`
    FOREIGN KEY (`shelter_id`)
    REFERENCES `PetAdoption`.`shelter` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`document`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`document` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(45) NOT NULL,
  `path` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NULL,
  `pet_id` INT NOT NULL,
  PRIMARY KEY (`id`, `pet_id`),
  INDEX `fk_document_pet1_idx` (`pet_id` ASC) VISIBLE,
  CONSTRAINT `fk_document_pet`
    FOREIGN KEY (`pet_id`)
    REFERENCES `PetAdoption`.`pet` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`application`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`application` (
  `adopter_id` INT NOT NULL,
  `pet_id` INT NOT NULL,
  `status` ENUM("pending", "refused", "approved") NOT NULL,
  PRIMARY KEY (`adopter_id`, `pet_id`),
  INDEX `fk_adoption_record_pet_idx` (`pet_id` ASC) VISIBLE,
  CONSTRAINT `fk_application_pet`
    FOREIGN KEY (`pet_id`)
    REFERENCES `PetAdoption`.`pet` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_application_profile`
    FOREIGN KEY (`adopter_id`)
    REFERENCES `PetAdoption`.`profile` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`adoption_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`adoption_record` (
  `adopter_id` INT NOT NULL,
  `pet_id` INT NOT NULL,
  PRIMARY KEY (`adopter_id`, `pet_id`),
  INDEX `fk_adoption_record_pet_idx` (`pet_id` ASC) VISIBLE,
  CONSTRAINT `fk_adoption_record_pet`
    FOREIGN KEY (`pet_id`)
    REFERENCES `PetAdoption`.`pet` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_adoption_record_profile`
    FOREIGN KEY (`adopter_id`)
    REFERENCES `PetAdoption`.`profile` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`role` (
  `role` ENUM("ADMIN", "USER", "STAFF", "MANAGER") NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `credentials_id` INT NOT NULL,
  PRIMARY KEY (`id`, `credentials_id`),
  INDEX `fk_role_credentials1_idx` (`credentials_id` ASC) VISIBLE,
  CONSTRAINT `fk_role_credentials`
    FOREIGN KEY (`credentials_id`)
    REFERENCES `PetAdoption`.`credentials` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PetAdoption`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PetAdoption`.`staff` (
  `id` INT NOT NULL,
  `shelter_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_staff_shelter1_idx` (`shelter_id` ASC) VISIBLE,
  CONSTRAINT `fk_staff_profile1`
    FOREIGN KEY (`id`)
    REFERENCES `PetAdoption`.`profile` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_staff_shelter1`
    FOREIGN KEY (`shelter_id`)
    REFERENCES `PetAdoption`.`shelter` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
