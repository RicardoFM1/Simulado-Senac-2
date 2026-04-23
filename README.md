# Simulado-Senac-2


- Sistema de gerenciamento de casamento, especializado para o casamento do SENAC (Senac Wedding).

# Estrutura

* Sistema monólito, focado em 4 pastas:
- Connection 
- Controllers
- Routes
- Services


---


# O que foi usado?

## Bibliotecas:
```
{
    "require": {
        "vlucas/phpdotenv": "^5.6",
        "firebase/php-jwt": "^7.0",
        "respect/validation": "2.4"
    }
}
``` 

## Ferramentas:

- Mysql Server
- Mysql workbench
- Insomnia
- Vs code
- Git
- Github
- Gerador de cpf

---

# Como rodar?

* Primeiramente instale/conecte os programas:

- Mysql Server (configure-o)
- Mysql workbench
- Insomnia (Testar rotas)
- Git e github
- Vs code

** Logo após: execute no cmd do vs code: **

```bash
cd Projeto-teste/Backend 
composer i
``` 

E para rodar o projeto em uma porta, inicie o assim:
```bash
cd Projeto-teste/Backend/Routes
php -S localhost:3000
``` 

### Script .sql

* Para criar as tabelas do banco de dados, abra o workbench, entre na sua instância e cole o seguinte script:
```
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_casamento
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_casamento
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_casamento` DEFAULT CHARACTER SET utf8 ;
USE `db_casamento` ;

-- -----------------------------------------------------
-- Table `db_casamento`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`mesa` (
  `id_mesa` INT NOT NULL AUTO_INCREMENT,
  `capacidade` INT NOT NULL,
  `restricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id_mesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`convidado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`convidado` (
  `id_convidado` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `confirmacao` VARCHAR(45) NOT NULL,
  `mesa_idmesa` INT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_convidado`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  INDEX `fk_convidado_mesa_idx` (`mesa_idmesa` ASC) VISIBLE,
  CONSTRAINT `fk_convidado_mesa`
    FOREIGN KEY (`mesa_idmesa`)
    REFERENCES `db_casamento`.`mesa` (`id_mesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`checkin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`checkin` (
  `id_checkin` INT NOT NULL AUTO_INCREMENT,
  `usuario_idusuario` INT NOT NULL,
  `convidado_idconvidado` INT NOT NULL,
  `data_e_hora` TIMESTAMP NULL,
  PRIMARY KEY (`id_checkin`),
  UNIQUE INDEX `convidado_idconvidado_UNIQUE` (`convidado_idconvidado` ASC) VISIBLE,
  INDEX `fk_checkin_usuario_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_checkin_usuario`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `db_casamento`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_checkin_convidado`
    FOREIGN KEY (`convidado_idconvidado`)
    REFERENCES `db_casamento`.`convidado` (`id_convidado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_casamento`.`acompanhante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_casamento`.`acompanhante` (
  `id_acompanhante` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `idade` INT NOT NULL,
  `convidado_idconvidado` INT NOT NULL,
  PRIMARY KEY (`id_acompanhante`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  INDEX `fk_acompanhante_convidado_idx` (`convidado_idconvidado` ASC) VISIBLE,
  CONSTRAINT `fk_acompanhante_convidado`
    FOREIGN KEY (`convidado_idconvidado`)
    REFERENCES `db_casamento`.`convidado` (`id_convidado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO usuario (nome, email, senha, cpf, cargo)
VALUES ('Ricardo', 'ricardo1@gmail.com', '$2a$12$egyauADs20NZNwv1aHE.ROu03u0a8CvQt7/ZuInKh.sGCjIhz1Vnu', '05380295010', 'admin'),
 ('Ricardo2', 'ricardo2@gmail.com', '$2a$12$egyauADs20NZNwv1aHE.ROu03u0a8CvQt7/ZuInKh.sGCjIhz1Vnu', '39446298091', 'ceremonialista');

INSERT INTO mesa (capacidade, restricao)
VALUES (10, 'Intolerância lactose');

INSERT INTO convidado (nome, sobrenome, email, cpf, categoria, confirmacao, telefone, mesa_idmesa)
VALUES ('paulo1', 'Fernandes1', 'paulof1@gmail.com', '48242256047', 'parente', 'confirmado', '883183138318', 1),
('paulo2', 'Fernandes2', 'paulof2@gmail.com', '50976092042', 'parente', 'não confirmado', '88318313868', 1),
('paulo3', 'Fernandes3', 'paulof3@gmail.com', '29306324022', 'parente', 'confirmado', '39138138133', 1),
('paulo4', 'Fernandes4', 'paulof4@gmail.com', '95017672052', 'parente', 'confirmado', '24892839343', 1),
('paulo5', 'Fernandes5', 'paulof5@gmail.com', '51094371068', 'parente', 'confirmado', '883183138318', 1),
('paulo6', 'Fernandes6', 'paulof6@gmail.com', '73939714020', 'parente', 'confirmado', '419104920030', 1),
('paulo7', 'Fernandes7', 'paulof7@gmail.com', '67561567057', 'parente', 'confirmado', '883183138318', 1),
('paulo8', 'Fernandes8', 'paulof8@gmail.com', '31703897005', 'parente', 'confirmado', '883183138318', 1),
('paulo9', 'Fernandes9', 'paulof9@gmail.com', '38557055005', 'parente', 'confirmado', '244242332333', 1),
('paulo10', 'Fernandes10', 'paulof10@gmail.com', '73330984007', 'parente', 'confirmado', '423423434356', 1),
('paulo11', 'Fernandes11', 'paulof11@gmail.com', '19100145084', 'parente', 'cancelado', '42332656433', 1),
('paulo12', 'Fernandes12', 'paulof12@gmail.com', '71789551048', 'parente', 'cancelado', '6456423244', 1),
('paulo13', 'Fernandes13', 'paulof13@gmail.com', '81544135076', 'parente', 'não confirmado', '4345467552', 1),
('paulo14', 'Fernandes14', 'paulof14@gmail.com', '73205550005', 'parente', 'confirmado', '52454533321', 1),
('paulo15', 'Fernandes15', 'paulof15@gmail.com', '12020253070', 'parente', 'confirmado', '2343435354', 1),
('paulo16', 'Fernandes16', 'paulof16@gmail.com', '05582307095', 'parente', 'confirmado', '34523454485', 1),
('paulo17', 'Fernandes17', 'paulof17@gmail.com', '43779801060', 'parente', 'confirmado', '35344534533442', 1),
('paulo18', 'Fernandes18', 'paulof18@gmail.com', '81560854006', 'parente', 'confirmado', '5685485228', 1),
('paulo19', 'Fernandes19', 'paulof19@gmail.com', '63686937034', 'parente', 'confirmado', '48648664244856', 1),
('paulo20', 'Fernandes20', 'paulof20@gmail.com', '71363153013', 'parente', 'confirmado', '84646456845', 1),
('paulo21', 'Fernandes21', 'paulof21@gmail.com', '28355088050', 'parente', 'confirmado', '686486546845684', 1),
('paulo22', 'Fernandes22', 'paulof22@gmail.com', '25222999050', 'parente', 'cancelado', '883183136848318', 1),
('paulo23', 'Fernandes23', 'paulof23@gmail.com', '09046452077', 'parente', 'confirmado', '6846486846453', 1),
('paulo24', 'Fernandes24', 'paulof24@gmail.com', '29930456015', 'parente', 'confirmado', '9348348348384', 1),
('paulo25', 'Fernandes25', 'paulof25@gmail.com', '49681283040', 'parente', 'confirmado', '458855846865', 1),
('paulo26', 'Fernandes26', 'paulof26@gmail.com', '60283307013', 'parente', 'confirmado', '5568554884488', 1),
('paulo27', 'Fernandes27', 'paulof27@gmail.com', '51073266095', 'parente', 'não confirmado', '884455566', 1),
('paulo28', 'Fernandes28', 'paulof28@gmail.com', '76800923036', 'parente', 'confirmado', '55522446633', 1),
('paulo29', 'Fernandes29', 'paulof29@gmail.com', '37711425040', 'parente', 'confirmado', '343454355445', 1),
('paulo30', 'Fernandes30', 'paulof30@gmail.com', '65131959004', 'parente', 'confirmado', '4542324324234', 1);

INSERT INTO checkin (usuario_idusuario, convidado_idconvidado, data_e_hora)
VALUES(1, 1, '1111111111');

INSERT INTO acompanhante (nome, sobrenome, cpf, idade, convidado_idconvidado)
VALUES('paulo', 'paulo1', '88632891073', 18, 1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```


--- 


# Rotas e Autorização:

No projeto, são apresentadas as seguintes rotas:


 Usuario:
 
| Rota     | Método | Autorização   |
| -------- | ------ | ------------- |
| /usuario | GET    | Todos         |
| /usuario | POST   | Todos         |
| /usuario | PUT    | Apenas admins |
| /usuario | DELETE | Apenas admins |


```json
"nome": "Ricardo",
"email": "ricardo@gmail.com",
"senha": "12345678",
"cpf": "05380295010",
"cargo": "admin"
```


- Convidado:
  
| Rota       | Método | Autorização   |
| ---------- | ------ | ------------- |
| /convidado | GET    | Todos         |
| /convidado | POST   | Todos         |
| /convidado | PUT    | Apenas admins |
| /convidado | DELETE | Apenas admins |


```json
"nome": "Ricardo",
"sobrenome": "Fernandes",
"email": "ricardo@gmail.com",
"cpf": "05380295010",
"telefone": "1133324242342",
"categoria": "parente",
"confirmacao": "cancelado",
"mesa_idmesa": 1
```


- Acompanhante:
  
| Rota          | Método | Autorização |
| ------------- | ------ | ----------- |
| /acompanhante | GET    | Todos       |
| /acompanhante | POST   | Todos       |
| /acompanhante | PUT    | Todos       |
| /acompanhante | DELETE | Todos       |

```json
"nome": "Ricardo",
"sobrenome": "Fernandes",
"cpf": "05380295010",
"idade": "1133324242342",
"convidado_idconvidado": 1
```



- Checkin:
  
| Rota     | Método | Autorização |
| -------- | ------ | ----------- |
| /checkin | GET    | Todos       |
| /checkin | POST   | Todos       |
| /checkin | PUT    | Todos       |
| /checkin | DELETE | Todos       |

```json
"usuario_idusuario": 1
"convidado_idconvidado": 1
```


***DETALHE: Apenas donos do checkin ou admins podem editar ou deletar***


- Mesa:
  
| Rota  | Método | Autorização |
| ----- | ------ | ----------- |
| /mesa | GET    | Todos       |
| /mesa | POST   | Todos       |
| /mesa | PUT    | Todos       |
| /mesa | DELETE | Todos       |


```json
"capacidade": 10,
"restricao": "Lactose"
```




