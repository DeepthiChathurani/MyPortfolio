
//load all existing customers
function updateCus(id) {
    if (searchCustomer(id) == undefined) {
        alert("No Serch id")
    } else {
        let consent = confirm("Do You Want to Update?")
        if (consent) {
            let customer = searchCustomer(id);
            let cusId = $("#cid").val();
            let cusName = $("#Name").val();
            let cusAdd = $("#CAdd").val();
            let cusSalary = $("#slry").val();
            customer.id = cusId;
            customer.name = cusName;
            customer.add = cusAdd;
            customer.salary = cusSalary;
            getAllCustomers();
            clearCusData();
        }


    }
}
$("#btnUpdateCustomer").click(function () {
    let cusId = $("#cid").val();
    updateCus(cusId);
});
$("#btndeleteCustomer").on('click',function () {
    let cusId = $("#cid").val();
    let consent=confirm("Do You Want to delete?");
    if(consent){
        let response=deleteCustomer(cusId);
        if (response){
            alert("Customer Delete");
            getAllCustomers();
            clearCusData();
        }else {
            alert("Customer Not remove");
        }

    }

});

function deleteCustomer(id) {
    for (let i=0;i<customerDb.length;i++){
        if(customerDb[i].id==id){
            customerDb.splice(i,1);
            getAllCustomers();
            return true
        }
        return false;
    }
};
//add customer event
$("#addCustomer").click(function () {
        saveCustomer();



});
getAllCustomers();

//get all customer event
$("#loadAll").click(function () {
    getAllCustomers();
});

//bind tr events for getting back data of the rows to text fields
function bindTrEvents() {
    $('#cusTableBody>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#cid").val(id);
        $("#Name").val(name);
        $("#CAdd").val(address);
        $("#slry").val(salary);
    })
}

//delete btn event

//clear btn event




// CRUD operation Functions
function saveCustomer() {
    let customerID = $("#cid").val();
    //check customer is exists or not?
    if (searchCustomer(customerID.trim()) == undefined) {
        //if the customer is not available then add him to the array
        let customerName = $("#Name").val();
        let customerAddress = $("#CAdd").val();
        let customerSalary = $("#slry").val();
        //by using this one we can create a new object using
        //the customer model with same properties
        let newCustomer = Object.assign({}, customerObj);
        newCustomer.id = customerID;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;
        //add customer record to the customer array (DB)
        customerDb.push(newCustomer);
        clearCusData();
        getAllCustomers();
loadAllCusId();
    } else {
        alert("Customer already exits.!");
        clearCusData();
    }
}

function getAllCustomers() {
    //clear all tbody data before add
    $("#cusTableBody").empty();

    //get all customers
    for (let i = 0; i < customerDb.length; i++) {
        let id = customerDb[i].id;
        let name = customerDb[i].name;
        let address = customerDb[i].address;
        let salary = customerDb[i].salary;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${address}</td>
                     <td>${salary}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $("#cusTableBody").append(row);

        //invoke this method every time
        // we add a row // otherwise click
        //event will not work
        bindTrEvents();
    }
}



function searchCustomer(id) {
    return customerDb.find(function (customer) {
        //if the search id match with customer record
        //then return that object
        return customer.id == id;
    });
}

function clearCusData() {
    let id = $("#cid").val("");
    let name = $("#Name").val("");
    let add = $("#CAdd").val("");
    let slry = $("#slry").val("");
    $("#cid").css("border", "none");
    $("#Name").css("border", "none");
    $("#CAdd").css("border", "none");
    $("#slry").css("border", "none");
$("#cid").focus();
}