CREATE DATABASE Donateme;
USE Donateme;

-- 1.	Doner:
   CREATE TABLE Doner(
      Doner_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Name VARCHAR(30),
      Age INT,
      Gender VARCHAR(10),
      Contact_info VARCHAR(20),
      Blood_group VARCHAR(10),
      Medical_history VARCHAR(50),
      Resi_Date VARCHAR(20),
      Address VARCHAR(100),
      Count INT,
      password VARCHAR(10)
   );

-- 8. medical history
   create table Medical_history(
      Doner_id VARCHAR(10) NOT NULL,
      Date VARCHAR(20),
      FOREIGN KEY(doner_id) REFERENCES doner(donar_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   )

-- 2.	Hospital:
   CREATE TABLE Hospital(
      Hospital_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Name VARCHAR(50),
      Location VARCHAR(100),
      Contact_info VARCHAR(20)
   );

-- 3.	Admin:
   CREATE TABLE Admin(
      Admin_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Name VARCHAR(30),
      Hospital_id VARCHAR(10),
      Contact_info VARCHAR(20),
      username VARCHAR(15),
      password VARCHAR(15),
      FOREIGN KEY (Hospital_id)
      REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- 4.	Blood Donation:
   CREATE TABLE Blood_Donation(
      Donation_id VARCHAR(20) UNIQUE PRIMARY KEY NOT NULL,
      Doner_id VARCHAR(20),
      Hospital_id VARCHAR(20),
      Donation VARCHA R(15),
      Date VARCHAR(20),
      Blood_group VARCHAR(10),
      FOREIGN KEY(Doner_id) REFERENCES Doner(Doner_id)
      ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );

1
-- 5.	Blood Inventory:
   CREATE TABLE Blood_Inventory(
      Blood_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Blood_group VARCHAR(10),
      Available_unit INT,
      Expire_date VARCHAR(15),

      Hospital_id VARCHAR(10),
      Hospital_location VARCHAR(100),
      FOREIGN KEY(Donation_id) REFERENCES Blood_Donation(Donation_id)
      ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- 6.	User Query:
   CREATE TABLE Query(
      Query_id VARCHAR(10) UNIQUE PRIMARY KEY NOT NULL,
      Name VARCHAR(30),
      Mobile_no VARCHAR(10),
      Text VARCHAR(100),
      date VARCHAR(20),
      Query_status VARCHAR(10),
      Hospital_name VARCHAR(30),
      Hospital_id VARCHAR(10),
      FOREIGN KEY(Hospital_id) REFERENCES Hospital(Hospital_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );


-- 7.	Query Status:
   CREATE TABLE Query_Status(
      Query_id VARCHAR(10) NOT NULL UNIQUE,
      Status VARCHAR(10),
      FOREIGN KEY(Query_id) REFERENCES Query(Query_id)
      ON DELETE CASCADE ON UPDATE CASCADE
   );



   --trigger implimentation
--1
   delimiter //   --is markup for each command
   create trigger update_donar_count
   after insert on blood_donation
   for each row
   BEGIN
      UPDATE Doner
      set count = count + 1
      where doner_id = NEW.doner_id
   END;
   //
   delimiter ;

--2
   delimiter //
   create trigger update_add_blood_inventort
   after insert on blood_donation
   for each row
   BEGIN
      UPDATE Blood_Inventory
      set Available_unit = Available_unit + 1
      where Blood_group = NEW.Blood_group
   END;
   //
   delimiter ;

--3
   delimiter //
   create trigger update Query_Status
   after insert on Query
   for each row
   BEGIN
      update Query_Status
      set Query_Status = 'pending'
      where Query_id = new.Query_id
   END;
   //
   delimiter ; 


   
--4
   delimiter //
   create trigger update_reduce_blood_inventory
   after update Query_Status
   for each row 
   BEGIN
      update Blood_Inventory
      set Available_unit = Available_unit - 1
      where Blood_group = new.Blood_group
   END;
   //
   delimiter ;

--5
   delimiter //
   create trigger update_medical_history
   after update blood_donation
   for each row
   BEGIN
      update Medical_history
      set date = new.date
      where doner_id = NEW.doner_id
   END;
   //
   delimiter ;


--*******cursor*********

--1
delimiter //

CREATE PROCEDURE doner_prced()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE doner_id_val INT;
    DECLARE Name_val VARCHAR(255);
    DECLARE Contact_info_val VARCHAR(255);
    DECLARE count_val INT;

    DECLARE doner_curser CURSOR FOR
        SELECT donar_id, Name, Contact_info, count
        FROM doner
        WHERE count > 5;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN doner_curser;

    doner_loop: LOOP
        FETCH doner_curser INTO doner_id_val, Name_val, Contact_info_val, count_val;

        IF done THEN
            LEAVE doner_loop;
        END IF;

        -- PRINT doner_id_val, Name_val, Contact_info_val, count_val;

    END LOOP;
    CLOSE doner_curser;

END 
//
delimiter ;


--2
delimiter //

CREATE PROCEDURE unit_available(IN Hospital_id_in VARCHAR(10), IN Blood_group_in VARCHAR(10))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE Blood_group_val VARCHAR(10);
    DECLARE Available_unit_val VARCHAR(255);

    DECLARE unit_available_cursor CURSOR FOR
        SELECT Blood_group, Available_unit
        FROM Blood_Inventory
        WHERE Blood_group = Blood_group_in
        AND  Hospital_id = Hospital_id_in;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN unit_available_cursor;

    Available_unit_loop: LOOP
        FETCH unit_available_cursor INTO Blood_group_val, Available_unit_val;

        IF done THEN
            LEAVE doner_loop;
        END IF;

        -- PRINT doner_id_val, Name_val, Contact_info_val, count_val;

    END LOOP;
    CLOSE doner_curser;

END 
//
delimiter ;















