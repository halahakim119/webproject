// Include the html2pdf and jQuery libraries
var script2 = document.createElement('script');
script2.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script2.onload = function () {
    // Code that depends on jQuery can be executed here
    $(document).ready(function () {
        fetchData();

        // Register event handler for the "Add Result" button
        $('#add-result-button').click(function () {
            var patient_id = $('#patient-id').val();
            var test_name = $('#test-name').val();
            var result_value = $('#result-value').val();

            var formData = {
                test_name: test_name,
                patient_id: patient_id,
                result_value: result_value,
            };
            addResultData(formData);
        });
    });
};
document.head.appendChild(script2);

var script1 = document.createElement('script');
script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js';

document.head.appendChild(script1);

var script3 = document.createElement('script');
script3.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js';

document.head.appendChild(script3);


// Constants
var itemsPerPage = 10;
var currentPage = 1;
var totalPages = 0;
var patientsData = []; // Store all patients data




function fetchData() {
    $.ajax({
        url: 'fetchPatientsData.php',
        type: 'GET',
        success: function (response) {
            var myData = JSON.parse(response);
            patientsData = myData;

            // Calculate total pages
            totalPages = Math.ceil(patientsData.length / itemsPerPage);

            // Enable/disable pagination buttons based on current page
            updatePaginationButtons();

            // Display patients for the current page
            displayPatients();
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function displayPatients() {
    // Calculate start and end index for the current page
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    // Get the patients for the current page
    var patients = patientsData.slice(startIndex, endIndex);

    var tmp = '';
    $.each(patients, function () {
        var patientName = this["name"].replace(/'/g, "\\'"); // Escape single quotes with backslashes
        tmp += `
        <tr>
          <td>${this["patient_id"]}</td>
          <td>${patientName}</td>
          <td>${this["age"]}</td>
          <td>${this["gender"]}</td>
          <td>${this["address"]}</td>
          <td>${this["test_date"]}</td>
          <td>${this["contact_number"]}</td>
          <td>${this["test_name"]}</td>
          <td>

          <button onclick="showAddResultModal(${this["patient_id"]},'${this['test_name']}', '${patientName}')" data-toggle="modal" class="btn btn-primary" data-target="#add-result-modal" id="open-modal-button">Add Result</button>
          <button onclick="viewResults(${this['patient_id']}, '${patientName}', ${this['age']}, '${this['gender']}', '${this['address']}', '${this['test_name']}', '${this['contact_number']}');" class="btn btn-info">View Results</button>
            <a href="update_patient_form.html?patient_id=${this['patient_id']}" class="btn btn-warning">Update</a>
            <button onclick="removePatientData(${this['patient_id']});" class="btn btn-danger">Remove</button>
          </td>
        </tr>`;
    });

    $('#tbody').html(tmp);


}



// Show the Add Result modal with patient name
function showAddResultModal(id,test_name, patientName) {
    // Update the content of the <select> elements
    $('#patient-name').html(`<option value="${patientName}">${patientName}</option>`);
    $('#test-name').html(`<option value="${test_name}">${test_name}</option>`);
    $('#patient-id').val(id);

}

function viewResults(patientId, name, age, gender, address, test_name, contact_number) {
    $.ajax({
        url: 'fetchResults.php',
        type: 'GET',
        data: {
            "patientId": patientId,
            "name": name,
            "age": age,
            "gender": gender,
            "address": address,
            "test_name": test_name,
            "contact_number": contact_number,
        },
        success: function (response) {
            var results = JSON.parse(response);

            // Open the PDF generation page with the results data
            var pdfData = {
                name: name,
                age: age,
                gender: gender,
                address: address,
                test_name: test_name,
                contact_number: contact_number,
                patientId: patientId,
                results: results
            };
            localStorage.setItem('pdfData', JSON.stringify(pdfData));
            $(document).ready(function () {
                // Retrieve the PDF data from localStorage
                var pdfData = JSON.parse(localStorage.getItem('pdfData'));
                if (pdfData) {
                    generatePDF(pdfData.patientId, pdfData.results, pdfData.name, pdfData.age, pdfData.gender, pdfData.address, pdfData.test_name, pdfData.contact_number);
                    // Clear the PDF data from localStorage
                    localStorage.removeItem('pdfData');
                } else {
                    alert('No PDF data found.');
                }
            });

            function generatePDF(patientId, results, name, age, gender, address, test_name, contact_number) {
                var content = `
                    <div class="header">
                        <img src="path_to_your_logo" alt="Logo" class="logo">
                        <h1>LABORATORY NAME</h1>
                        <p>Address | Phone: xxx-xxx-xxxx | Email: info@laboratory.com</p>
                    </div>
                    <div class="patient-info">
                        <h1>Patient ID: ${patientId}</h1>
                        <h1>name : ${name}</h1>
                        <h1>age : ${age}</h1>
                        <h1>gender : ${gender}</h1>
                        <h1>address : ${address}</h1>
                        <h1>test_name : ${test_name}</h1>
                        <h1>contact_number : ${contact_number}</h1>
                       
                       
                    </div>
                    <div class="results">
                        <h2>Results</h2>
                        <ul>`;
                results.forEach(function (result) {
                    content += `<li>${result.test_name}: ${result.result_value}</li>`;
                    content += `<li>Date of result: ${result.date_completed}</li>`;
                    content += `<li>result_id: ${result.result_id}</li>`;
                    content += `<li>staff_name: ${result.staff_name}</li>`;
                });
                content += `
                        </ul>
                    </div>`;

                var element = document.createElement('div');
                element.innerHTML = content;

                html2pdf().from(element).save(`patient_${patientId}_results_${name}.pdf`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


// Function to add the result to the database

function addResultData(formData) {
    $.ajax({
        url: 'addResultData.php',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
            if (response.status === 'added') {
                 // Display a success message
                 alert('Result added successfully.');
                // Reset the form and close the modal
                $('#add-result-form')[0].reset();
                $('#add-result-modal').modal('hide');

                

                // Refresh the data to display the new result
                fetchData();
                location.reload();
            } else {
                alert('Failed to add result. Error: ' + response.error);
            }
        },
        error: function (error) {
            console.log(error);
            alert('An error occurred while adding the result.');
        }
    });
}

function updatePaginationButtons() {
    var prevPageBtn = $('#prev-page');
    var nextPageBtn = $('#next-page');

    // Enable/disable previous page button
    if (currentPage > 1) {
        prevPageBtn.removeClass('disabled');
    } else {
        prevPageBtn.addClass('disabled');
    }

    // Enable/disable next page button
    if (currentPage < totalPages) {
        nextPageBtn.removeClass('disabled');
    } else {
        nextPageBtn.addClass('disabled');
    }

    // Update page info
    $('#page-info').text('Page ' + currentPage + ' of ' + totalPages);
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePaginationButtons();
        displayPatients();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePaginationButtons();
        displayPatients();
    }
}

function searchPatients() {
    var searchTerm = $('#searchTerm').val();

    $.ajax({
        url: 'search.php',
        type: 'GET',
        data: { "searchTerm": searchTerm },
        success: function (response) {
            var myData = JSON.parse(response);
            patientsData = myData;
            currentPage = 1; // Reset current page to 1
            totalPages = Math.ceil(patientsData.length / itemsPerPage);
            updatePaginationButtons();
            displayPatients();
        },
        error: function (error) {
            console.log(error);
        }
    });
}



// add data
$('#addDataForm').on('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: 'addPatientData.php',
        type: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            var myData = JSON.parse(response);
            if (myData["status"] == "added") {
                fetchData();
                // Redirect to the patients.html page after successfully adding the data
                window.location.href = 'patients.html';
            } else {
                alert(myData["status"]);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});

// remove data
function removePatientData(id) {
    $.ajax({
        url: 'removePatientData.php',
        type: 'GET',
        data: { "id": id },
        success: function (response) {
            var myData = JSON.parse(response);
            if (myData["status"] == "removed") {
                fetchData();
            } else {
                alert("Failed to remove patient data.");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// pass data
function passData(id) {
    $.ajax({
        url: 'passPatientData.php',
        type: 'GET',
        data: { "patient_id": id }, // Update parameter name to "patient_id"
        success: function (response) {
            var myData = JSON.parse(response);
            $('#update-patientName').val(myData[0]["name"]);
            $('#update-patientAge').val(myData[0]["age"]);
            $('#update-patientGender').val(myData[0]["gender"]);
            $('#update-patientAddress').val(myData[0]["address"]);
            $('#update-patientContact').val(myData[0]["contact_number"]);
            $('#update-testName').val(myData[0]["test_name"]);
            $('#updateDataForm').attr('action', 'updatePatientData.php');
            $('#updateDataForm').attr('method', 'POST');
            $('#updateDataForm').on('submit', function (event) {
                event.preventDefault();
                var formData = new FormData(this);
                formData.append('patient_id', myData[0]["patient_id"]);
                updateData(formData);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// update data
function updateData(formData) {
    $.ajax({
        url: 'updatePatientData.php',
        type: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            var myData = JSON.parse(response);
            if (myData["status"] == "updated") {
                fetchData();
                // Redirect to the patients.html page after successfully updating the data
                window.location.href = 'patients.html';
            } else {
                alert(data);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
