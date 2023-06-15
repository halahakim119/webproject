$(document).ready(function () {
    fetchData();
});

function fetchData() {
    $.ajax({
        url: 'fetchPatientsData.php',
        type: 'GET',
        success: function (response) {
            var myData = JSON.parse(response);
            var tmp = '';
            if (myData["status"] == "failed") {
                alert(myData["error"]);
            } else {
                $.each(myData, function () {
                    tmp += `
            <tr>
              <td>${this["patient_id"]}</td>
              <td>${this["name"]}</td>
              <td>${this["age"]}</td>
              <td>${this["gender"]}</td>
              <td>${this["address"]}</td>
              <td>${this["contact_number"]}</td>
              <td>
              <a href="update_patient_form.html?patient_id=${this["patient_id"]}" class="btn btn-warning">Update</a>
                <button onclick="removePatientData(${this["patient_id"]});" class="btn btn-danger">Remove</button>
              </td>
            </tr>`;
                });
                $('#tbody').html(tmp);
            }
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
    console.log(formData);
    $.ajax({
        url: 'addPatientData.php',
        type: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            var myData = JSON.parse(response);
            console.log(response);
            if (myData["status"] == "added") {

                fetchData();
                // Redirect to the patients.html page after successfully adding the data
                window.location.href = 'patients.html';
            }
            else {
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
            }
            else {
                alert("failed  to remove patient data.");
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
            console.log(response);
            var myData = JSON.parse(response);
            $('#update-patientName').val(myData[0]["name"]);
            $('#update-patientAge').val(myData[0]["age"]);
            $('#update-patientGender').val(myData[0]["gender"]);
            $('#update-patientAddress').val(myData[0]["address"]);
            $('#update-patientContact').val(myData[0]["contact_number"]);
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
                // Redirect to the patients.html page after successfully adding the data
                window.location.href = 'patients.html';
            }
            else {
                alert(data);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function searchPatients() {
    var searchTerm = $('#searchTerm').val();

    $.ajax({
        url: 'search.php',
        type: 'GET',
        data: { "searchTerm": searchTerm },
        success: function (response) {
            var myData = JSON.parse(response);
            var tmp = '';
            if (myData.length === 0) {
                tmp = '<tr><td colspan="7">No results found.</td></tr>';
            } else {
                $.each(myData, function () {
                    tmp += `
                    <tr>
                        <td>${this["patient_id"]}</td>
                        <td>${this["name"]}</td>
                        <td>${this["age"]}</td>
                        <td>${this["gender"]}</td>
                        <td>${this["address"]}</td>
                        <td>${this["contact_number"]}</td>
                        <td>
                            <a href="update_patient_form.html?patient_id=${this["patient_id"]}" class="btn btn-warning">Update</a>
                            <button onclick="removePatientData(${this["patient_id"]});" class="btn btn-danger">Remove</button>
                        </td>
                    </tr>`;
                });
            }
            $('#tbody').html(tmp);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

