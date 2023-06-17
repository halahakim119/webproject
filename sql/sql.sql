
-- Patients table
CREATE TABLE `patient` (
  `patient_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `age` INT,
  `gender` VARCHAR(10),
  `address` VARCHAR(255),
  `contact_number` VARCHAR(20),
  `test_name` VARCHAR(255),
  `test_date` DATE DEFAULT CURRENT_DATE
);

INSERT INTO `patient` (`name`, `age`, `gender`, `address`, `contact_number`,`test_name`)
VALUES
('John Doe', 30, 'Male', '123 Main St', '1234567890','Blood Glucose Test'),
('Jane Smith', 25, 'Female', '456 Elm St', '9876543210','Blood Glucose Test');


ALTER TABLE `patient` MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- Staff table
CREATE TABLE `staff` (
  `staff_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `designation` VARCHAR(100),
  `department` VARCHAR(100),
  `contact_number` VARCHAR(20),
  `username` VARCHAR(255),
  `password` VARCHAR(255)
);

INSERT INTO `staff` (`staff_id`, `name`, `designation`, `department`, `contact_number`, `username`, `password`)
VALUES
(1, 'Dr. John Smith', 'Doctor', 'Internal Medicine', '1112223333', 'john', '123'),
(2, 'Nurse Jane Johnson', 'Nurse', 'Emergency Department', '4445556666', 'jane', '123');
ALTER TABLE `staff` MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;



-- Test types table
CREATE TABLE `test_types` (
  `test_id` INT AUTO_INCREMENT PRIMARY KEY,
  `test_name` VARCHAR(255)
);

INSERT INTO `test_types` (`test_id`, `test_name`)
VALUES
(1, 'Complete Blood Count (CBC)'),
(2, 'Blood Glucose Test'),
(3, 'Lipid Profile Test'),
(4, 'Liver Function Test (LFT)'),
(5, 'Kidney Function Test (KFT)'),
(6, 'Thyroid Function Test (TFT)'),
(7, 'Iron Panel Test'),
(8, 'Coagulation Profile Test'),
(9, 'Blood Type and Rh Factor Test'),
(10, 'HIV Test'),
(11, 'COVID-19 PCR Test'),
(12, 'Influenza PCR Test'),
(13, 'Tuberculosis (TB) PCR Test'),
(14, 'Hepatitis C PCR Test'),
(15, 'Human Papillomavirus (HPV) PCR Test'),
(16, 'Chlamydia PCR Test'),
(17, 'Gonorrhea PCR Test'),
(18, 'Lyme Disease PCR Test'),
(19, 'Malaria PCR Test'),
(20, 'Herpes Simplex Virus (HSV) PCR Test');
ALTER TABLE `test_types` MODIFY `test_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;





-- result table
CREATE TABLE `result` (
  `result_id` INT AUTO_INCREMENT PRIMARY KEY,
  `patient_id` INT,
  `test_name` VARCHAR(255),
  `staff_name` VARCHAR(255),
  `result_value` VARCHAR(255),
  `date_completed`  DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (`patient_id`) REFERENCES `patient`(`patient_id`)
);


ALTER TABLE `result` MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;