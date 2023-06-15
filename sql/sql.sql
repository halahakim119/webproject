
-- Patients table
CREATE TABLE `patient` (
  `patient_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `age` INT,
  `gender` VARCHAR(10),
  `address` VARCHAR(255),
  `contact_number` VARCHAR(20)
);


INSERT INTO `patient` (`patient_id`, `name`, `age`, `gender`, `address`, `contact_number`)
VALUES
(1, 'John Doe', 30, 'Male', '123 Main St', '1234567890'),
(2, 'Jane Smith', 25, 'Female', '456 Elm St', '9876543210');

ALTER TABLE `patient` MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- Staff table
CREATE TABLE `staff` (
  `staff_id` INT PRIMARY KEY,
  `name` VARCHAR(255),
  `designation` VARCHAR(100),
  `department` VARCHAR(100),
  `contact_number` VARCHAR(20),
  `username` VARCHAR(255),
  `password` VARCHAR(255)
);

INSERT INTO `staff` (`staff_id`, `name`, `designation`, `department`, `contact_number`, `username`, `password`)
VALUES
(1, 'Dr. John Smith', 'Doctor', 'Internal Medicine', '1112223333', 'joh', '123'),
(2, 'Nurse Jane Johnson', 'Nurse', 'Emergency Department', '4445556666', 'jane', '123');



-- Test types table
CREATE TABLE `test_types` (
  `test_id` INT PRIMARY KEY,
  `test_name` VARCHAR(255),
  `category` VARCHAR(100)
);

INSERT INTO `test_types` (`test_id`, `test_name`, `category`)
VALUES
(1, 'Complete Blood Count (CBC)', 'Blood Tests'),
(2, 'Blood Glucose Test', 'Blood Tests'),
(3, 'Lipid Profile Test', 'Blood Tests'),
(4, 'Liver Function Test (LFT)', 'Blood Tests'),
(5, 'Kidney Function Test (KFT)', 'Blood Tests'),
(6, 'Thyroid Function Test (TFT)', 'Blood Tests'),
(7, 'Iron Panel Test', 'Blood Tests'),
(8, 'Coagulation Profile Test', 'Blood Tests'),
(9, 'Blood Type and Rh Factor Test', 'Blood Tests'),
(10, 'HIV Test', 'Blood Tests'),
(11, 'COVID-19 PCR Test', 'PCR Tests'),
(12, 'Influenza PCR Test', 'PCR Tests'),
(13, 'Tuberculosis (TB) PCR Test', 'PCR Tests'),
(14, 'Hepatitis C PCR Test', 'PCR Tests'),
(15, 'Human Papillomavirus (HPV) PCR Test', 'PCR Tests'),
(16, 'Chlamydia PCR Test', 'PCR Tests'),
(17, 'Gonorrhea PCR Test', 'PCR Tests'),
(18, 'Lyme Disease PCR Test', 'PCR Tests'),
(19, 'Malaria PCR Test', 'PCR Tests'),
(20, 'Herpes Simplex Virus (HSV) PCR Test', 'PCR Tests');







-- result table
CREATE TABLE `result` (
  `result_id` INT PRIMARY KEY,
  `test_name` VARCHAR(255),
  `patient_name` VARCHAR(255),
  `staff_name` VARCHAR(255),
  `result_value` VARCHAR(255),
  `date_completed` DATE
);

INSERT INTO `result` (`result_id`, `test_name`, `patient_name`, `staff_name`, `result_value`, `date_completed`)
VALUES
(1, 'Complete Blood Count (CBC)', 'John Doe', 'Dr. John Smith', 'Normal', '2023-06-14'),
(2, 'Blood Glucose Test', 'Jane Smith', 'Dr. John Smith', '120 mg/dL', '2023-06-15');
