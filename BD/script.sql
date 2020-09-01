CREATE TABLE Tb_RAM (
  idTb_RAM INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  PRIMARY KEY(idTb_RAM)
);

CREATE TABLE Tb_Sectors (
  idTb_Sectors INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  costCenter INTEGER UNSIGNED NULL,
  PRIMARY KEY(idTb_Sectors)
);

CREATE TABLE Tb_Providers (
  idTb_Providers INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  PRIMARY KEY(idTb_Providers)
);

CREATE TABLE Tb_Models (
  idModel INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nameModel VARCHAR(255) NULL,
  PRIMARY KEY(idModel)
);

CREATE TABLE Tb_Processador (
  idTb_Processador INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  PRIMARY KEY(idTb_Processador)
);

CREATE TABLE Tb_ServicesProvider (
  idTb_ServicesProvider INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  PRIMARY KEY(idTb_ServicesProvider)
);

CREATE TABLE Tb_Categories (
  idCategory INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  NameCategory VARCHAR(255) NULL,
  PRIMARY KEY(idCategory)
);

CREATE TABLE Tb_Brands (
  idBrand INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nameBrand VARCHAR(255) NULL,
  PRIMARY KEY(idBrand)
);

CREATE TABLE Tb_Users (
  idTb_Users INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  e-mail VARCHAR(255) NULL,
  pass VARCHAR(255) NULL,
  typeUser CHAR(1) NULL,
  approved CHAR(1) NULL,
  PRIMARY KEY(idTb_Users)
);

CREATE TABLE Tb_HD (
  idTb_HD INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  nam VARCHAR(255) NULL,
  PRIMARY KEY(idTb_HD)
);

CREATE TABLE Tb_Status (
  idTb_Status INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR NULL,
  PRIMARY KEY(idTb_Status)
);

CREATE TABLE Tb_Invoices (
  idTb_Invoices INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Sectors_idTb_Sectors INTEGER UNSIGNED NOT NULL,
  GPI INTEGER UNSIGNED NULL,
  date DATETIME NULL,
  PRIMARY KEY(idTb_Invoices),
  INDEX Tb_Invoices_FKIndex1(Tb_Sectors_idTb_Sectors),
  FOREIGN KEY(Tb_Sectors_idTb_Sectors)
    REFERENCES Tb_Sectors(idTb_Sectors)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Maintenances (
  idMaintenances INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Providers_idTb_Providers INTEGER UNSIGNED NOT NULL,
  internalRequest CHAR(10) NULL,
  externalRequest VARCHAR NULL,
  date DATETIME NULL,
  statusMaintenance CHAR(1) NULL,
  description VARCHAR(255) NULL,
  equipment VARCHAR(255) NULL,
  heritage CHAR(6) NULL,
  serialNumber VARCHAR(255) NULL,
  email CHAR(1) NULL,
  PRIMARY KEY(idMaintenances),
  INDEX Tb_Maintenances_FKIndex1(Tb_Providers_idTb_Providers),
  FOREIGN KEY(Tb_Providers_idTb_Providers)
    REFERENCES Tb_Providers(idTb_Providers)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Providers_has_Tb_ServicesProvider (
  Tb_Providers_idTb_Providers INTEGER UNSIGNED NOT NULL,
  Tb_ServicesProvider_idTb_ServicesProvider INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Tb_Providers_idTb_Providers, Tb_ServicesProvider_idTb_ServicesProvider),
  INDEX Tb_Providers_has_Tb_ServicesProvider_FKIndex1(Tb_Providers_idTb_Providers),
  INDEX Tb_Providers_has_Tb_ServicesProvider_FKIndex2(Tb_ServicesProvider_idTb_ServicesProvider),
  FOREIGN KEY(Tb_Providers_idTb_Providers)
    REFERENCES Tb_Providers(idTb_Providers)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_ServicesProvider_idTb_ServicesProvider)
    REFERENCES Tb_ServicesProvider(idTb_ServicesProvider)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Requests (
  idTb_Requests INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Status_idTb_Status INTEGER UNSIGNED NOT NULL,
  Tb_Sectors_idTb_Sectors INTEGER UNSIGNED NOT NULL,
  Tb_Users_idTb_Users INTEGER UNSIGNED NOT NULL,
  number INTEGER UNSIGNED NULL,
  openingDate DATETIME NULL,
  deliveryType CHAR NULL,
  requestSN CHAR(10) NULL,
  link VARCHAR(255) NULL,
  PRIMARY KEY(idTb_Requests),
  INDEX Tb_Requests_FKIndex1(Tb_Users_idTb_Users),
  INDEX Tb_Requests_FKIndex2(Tb_Sectors_idTb_Sectors),
  INDEX Tb_Requests_FKIndex3(Tb_Status_idTb_Status),
  FOREIGN KEY(Tb_Users_idTb_Users)
    REFERENCES Tb_Users(idTb_Users)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Sectors_idTb_Sectors)
    REFERENCES Tb_Sectors(idTb_Sectors)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Status_idTb_Status)
    REFERENCES Tb_Status(idTb_Status)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Equipments (
  idEquipment INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Categories_idCategory INTEGER UNSIGNED NOT NULL,
  Tb_Brands_idBrand INTEGER UNSIGNED NOT NULL,
  Tb_Models_idModel INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(idEquipment),
  INDEX Tb_Equipments_FK_Tb_Categories(Tb_Categories_idCategory),
  INDEX Tb_Equipamentos_FKIndex2(Tb_Brands_idBrand),
  INDEX Tb_Equipamentos_FKIndex3(Tb_Models_idModel),
  FOREIGN KEY(Tb_Categories_idCategory)
    REFERENCES Tb_Categories(idCategory)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Brands_idBrand)
    REFERENCES Tb_Brands(idBrand)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Models_idModel)
    REFERENCES Tb_Models(idModel)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_WorkStations (
  idWorkStation INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Equipments_idEquipment INTEGER UNSIGNED NOT NULL,
  Tb_HD_idTb_HD INTEGER UNSIGNED NOT NULL,
  Tb_Processador_idTb_Processador INTEGER UNSIGNED NOT NULL,
  Tb_RAM_idTb_RAM INTEGER UNSIGNED NOT NULL,
  patrimony INTEGER UNSIGNED NULL,
  serialnumber VARCHAR(255) NULL,
  PRIMARY KEY(idWorkStation),
  INDEX Tb_EstacaoTrabalho_FKIndex1(Tb_Equipments_idEquipment),
  INDEX Tb_EstacaoTrabalho_FKIndex2(Tb_RAM_idTb_RAM),
  INDEX Tb_EstacaoTrabalho_FKIndex3(Tb_Processador_idTb_Processador),
  INDEX Tb_EstacaoTrabalho_FKIndex4(Tb_HD_idTb_HD),
  FOREIGN KEY(Tb_Equipments_idEquipment)
    REFERENCES Tb_Equipments(idEquipment)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_RAM_idTb_RAM)
    REFERENCES Tb_RAM(idTb_RAM)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Processador_idTb_Processador)
    REFERENCES Tb_Processador(idTb_Processador)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_HD_idTb_HD)
    REFERENCES Tb_HD(idTb_HD)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Periphicals (
  idTb_Periphical INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Equipments_idEquipment INTEGER UNSIGNED NOT NULL,
  characteristics VARCHAR(255) NULL,
  quantity INTEGER UNSIGNED NULL,
  PRIMARY KEY(idTb_Periphical),
  INDEX Tb_Perifericos_FKIndex1(Tb_Equipments_idEquipment),
  FOREIGN KEY(Tb_Equipments_idEquipment)
    REFERENCES Tb_Equipments(idEquipment)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Heritage (
  idTheritage INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Equipments_idEquipment INTEGER UNSIGNED NOT NULL,
  characteristics VARCHAR(255) NULL,
  patrimony INTEGER UNSIGNED NULL,
  PRIMARY KEY(idTheritage),
  INDEX Tb_Patrimoniados_FKIndex1(Tb_Equipments_idEquipment),
  FOREIGN KEY(Tb_Equipments_idEquipment)
    REFERENCES Tb_Equipments(idEquipment)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Heritage_has_Tb_Requests (
  Tb_Heritage_idTheritage INTEGER UNSIGNED NOT NULL,
  Tb_Requests_idTb_Requests INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Tb_Heritage_idTheritage, Tb_Requests_idTb_Requests),
  INDEX Tb_Heritage_has_Tb_Requests_FKIndex1(Tb_Heritage_idTheritage),
  INDEX Tb_Heritage_has_Tb_Requests_FKIndex2(Tb_Requests_idTb_Requests),
  FOREIGN KEY(Tb_Heritage_idTheritage)
    REFERENCES Tb_Heritage(idTheritage)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Requests_idTb_Requests)
    REFERENCES Tb_Requests(idTb_Requests)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_WorkStations_has_Tb_Requests (
  Tb_WorkStations_idWorkStation INTEGER UNSIGNED NOT NULL,
  Tb_Requests_idTb_Requests INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Tb_WorkStations_idWorkStation, Tb_Requests_idTb_Requests),
  INDEX Tb_WorkStations_has_Tb_Requests_FKIndex1(Tb_WorkStations_idWorkStation),
  INDEX Tb_WorkStations_has_Tb_Requests_FKIndex2(Tb_Requests_idTb_Requests),
  FOREIGN KEY(Tb_WorkStations_idWorkStation)
    REFERENCES Tb_WorkStations(idWorkStation)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Requests_idTb_Requests)
    REFERENCES Tb_Requests(idTb_Requests)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Comments (
  idTb_Comments INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  Tb_Requests_idTb_Requests INTEGER UNSIGNED NOT NULL,
  Tb_Users_idTb_Users INTEGER UNSIGNED NOT NULL,
  description TEXT NULL,
  PRIMARY KEY(idTb_Comments),
  INDEX Tb_Comments_FKIndex1(Tb_Users_idTb_Users),
  INDEX Tb_Comments_FKIndex2(Tb_Requests_idTb_Requests),
  FOREIGN KEY(Tb_Users_idTb_Users)
    REFERENCES Tb_Users(idTb_Users)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Requests_idTb_Requests)
    REFERENCES Tb_Requests(idTb_Requests)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Requests_has_Tb_Periphicals (
  Tb_Requests_idTb_Requests INTEGER UNSIGNED NOT NULL,
  Tb_Periphicals_idTb_Periphical INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Tb_Requests_idTb_Requests, Tb_Periphicals_idTb_Periphical),
  INDEX Tb_Requests_has_Tb_Periphicals_FKIndex1(Tb_Requests_idTb_Requests),
  INDEX Tb_Requests_has_Tb_Periphicals_FKIndex2(Tb_Periphicals_idTb_Periphical),
  FOREIGN KEY(Tb_Requests_idTb_Requests)
    REFERENCES Tb_Requests(idTb_Requests)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Periphicals_idTb_Periphical)
    REFERENCES Tb_Periphicals(idTb_Periphical)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Invoices_has_Tb_Heritage_has_Tb_Requests (
  Tb_Invoices_idTb_Invoices INTEGER UNSIGNED NOT NULL,
  Tb_Heritage_has_Tb_Requests_Tb_Requests_idTb_Requests INTEGER UNSIGNED NOT NULL,
  Tb_Heritage_has_Tb_Requests_Tb_Heritage_idTheritage INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Tb_Invoices_idTb_Invoices, Tb_Heritage_has_Tb_Requests_Tb_Requests_idTb_Requests, Tb_Heritage_has_Tb_Requests_Tb_Heritage_idTheritage),
  INDEX Tb_Invoices_has_Tb_Heritage_has_Tb_Requests_FKIndex1(Tb_Invoices_idTb_Invoices),
  INDEX Tb_Invoices_has_Tb_Heritage_has_Tb_Requests_FKIndex2(Tb_Heritage_has_Tb_Requests_Tb_Heritage_idTheritage, Tb_Heritage_has_Tb_Requests_Tb_Requests_idTb_Requests),
  FOREIGN KEY(Tb_Invoices_idTb_Invoices)
    REFERENCES Tb_Invoices(idTb_Invoices)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_Heritage_has_Tb_Requests_Tb_Heritage_idTheritage, Tb_Heritage_has_Tb_Requests_Tb_Requests_idTb_Requests)
    REFERENCES Tb_Heritage_has_Tb_Requests(Tb_Heritage_idTheritage, Tb_Requests_idTb_Requests)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE Tb_Invoices_has_Tb_WorkStations (
  Tb_Invoices_idTb_Invoices INTEGER UNSIGNED NOT NULL,
  Tb_WorkStations_idWorkStation INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Tb_Invoices_idTb_Invoices, Tb_WorkStations_idWorkStation),
  INDEX Tb_Invoices_has_Tb_WorkStations_FKIndex1(Tb_Invoices_idTb_Invoices),
  INDEX Tb_Invoices_has_Tb_WorkStations_FKIndex2(Tb_WorkStations_idWorkStation),
  FOREIGN KEY(Tb_Invoices_idTb_Invoices)
    REFERENCES Tb_Invoices(idTb_Invoices)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Tb_WorkStations_idWorkStation)
    REFERENCES Tb_WorkStations(idWorkStation)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

