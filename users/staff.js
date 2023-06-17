$(document).ready(function () {
    var currentPage = 1;
    var itemsPerPage = 5;
    var totalItems = 0;

    // Fetch all staff
    fetchStaff();

    // Search staff
    $("#searchBtn").click(function () {
        var searchValue = $("#searchInput").val();
        searchStaff(searchValue);
    });

    // Edit staff
    $(document).on("click", ".editBtn", function () {
        var row = $(this).closest("tr");
        var id = row.find(".id").text();
        var name = row.find(".name").text();
        var designation = row.find(".designation").text();
        var department = row.find(".department").text();
        var contact_number = row.find(".contact_number").text();
        var username = row.find(".username").text();
        var password = row.find(".password").text();

        var editForm = '<input type="text" class="editName" value="' + name + '">';
        editForm += '<input type="text" class="editDesignation" value="' + designation + '">';
        editForm += '<input type="text" class="editDepartment" value="' + department + '">';
        editForm += '<input type="text" class="editContactNumber" value="' + contact_number + '">';
        editForm += '<input type="text" class="editUsername" value="' + username + '">';
        editForm += '<input type="text" class="editPassword" value="' + password + '">';
        editForm += '<button class="updateBtn">Update</button>';
        row.html(editForm);
        row.find(".updateBtn").data("id", id);
    });

    // Update staff
    $(document).on("click", ".updateBtn", function () {
        var row = $(this).closest("tr");
        var id = $(this).data("id");
        var name = row.find(".editName").val();
        var designation = row.find(".editDesignation").val();
        var department = row.find(".editDepartment").val();
        var contact_number = row.find(".editContactNumber").val();
        var username = row.find(".editUsername").val();
        var password = row.find(".editPassword").val();

        updateStaff(id, name, designation, department, contact_number, username, password);
    });

    // Function to fetch all staff
    function fetchStaff() {
        $.ajax({
            url: "fetchStaff.php",
            type: "GET",
            success: function (response) {
                var staffData = JSON.parse(response);
                totalItems = staffData.length;

                // Calculate total pages
                var totalPages = Math.ceil(totalItems / itemsPerPage);

                // Enable/disable pagination buttons based on current page
                updatePaginationButtons(currentPage, totalPages);

                // Display staff for the current page
                displayStaff(staffData, currentPage, itemsPerPage);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    // Function to display staff for the current page
    function displayStaff(staffData, currentPage, itemsPerPage) {
        var startIndex = (currentPage - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var staffHtml = "";

        for (var i = startIndex; i < endIndex; i++) {
            if (i >= staffData.length) {
                break;
            }

            var staff = staffData[i];
            staffHtml += '<tr>';
            staffHtml += '<td class="id">' + staff.id + '</td>';
            staffHtml += '<td class="name">' + staff.name + '</td>';
            staffHtml += '<td class="designation">' + staff.designation + '</td>';
            staffHtml += '<td class="department">' + staff.department + '</td>';
            staffHtml += '<td class="contact_number">' + staff.contact_number + '</td>';
            staffHtml += '<td class="username">' + staff.username + '</td>';
            staffHtml += '<td class="password">' + staff.password + '</td>';
            staffHtml += '<td><button class="editBtn">Edit</button></td>';
            staffHtml += '<td><button class="deleteBtn">Delete</button></td>';
            staffHtml += '</tr>';
        }

        $("#staffTable tbody").html(staffHtml);
    }

    // Function to search staff
    function searchStaff(searchValue) {
        $.ajax({
            url: "searchStaff.php",
            type: "POST",
            data: { searchValue: searchValue },
            success: function (response) {
                var staffData = JSON.parse(response);
                totalItems = staffData.length;

                // Calculate total pages
                var totalPages = Math.ceil(totalItems / itemsPerPage);

                // Enable/disable pagination buttons based on current page
                updatePaginationButtons(currentPage, totalPages);

                // Display staff for the current page
                displayStaff(staffData, currentPage, itemsPerPage);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    // Function to update staff
    function updateStaff(id, name, designation, department, contact_number, username, password) {
        $.ajax({
            url: "updateStaff.php",
            type: "POST",
            data: {
                id: id,
                name: name,
                designation: designation,
                department: department,
                contact_number: contact_number,
                username: username,
                password: password
            },
            success: function (response) {
                fetchStaff();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    // Function to update pagination buttons
    function updatePaginationButtons(currentPage, totalPages) {
        if (currentPage === 1) {
            $("#prevPageBtn").prop("disabled", true);
        } else {
            $("#prevPageBtn").prop("disabled", false);
        }

        if (currentPage === totalPages) {
            $("#nextPageBtn").prop("disabled", true);
        } else {
            $("#nextPageBtn").prop("disabled", false);
        }
    }

    // Pagination buttons
    $("#prevPageBtn").click(function () {
        if (currentPage > 1) {
            currentPage--;
            fetchStaff();
        }
    });

    $("#nextPageBtn").click(function () {
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            fetchStaff();
        }
    });
});

