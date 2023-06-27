const CUS_ID_REGEX = /^(C00-)[0-9]{2}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z]{4,}$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.]{1}[0-9]{2})?$/;

let cusValidationArr = [];
cusValidationArr.push({reg: CUS_ID_REGEX, field: $('#cid'), error: 'Customer Id Patter is Not Valid :C00-01'});
cusValidationArr.push({reg: CUS_NAME_REGEX, field: $('#Name'), error: 'Customer Name  is Not Valid :A a-Z z 5>'});
cusValidationArr.push({reg: CUS_ADDRESS_REGEX, field: $('#CAdd'), error: 'Customer Address Patter is Not Valid:A a-Z z 4>'});
cusValidationArr.push({reg: CUS_SALARY_REGEX, field: $('#slry'), error: 'Customer Salary Patter is No Valid '});


$("#cid,#Name,#CAdd,#slry").keydown(function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
    }
});

$("#cid,#Name,#CAdd,#slry").keyup(function () {
    checkValidationsOfAll();
});


$("#cid").keydown(function (e) {
    if (e.key == "Enter" && check(CUS_ID_REGEX, $("#cid"))) {
        $("#Name").focus();
    }


});

$("#Name").keydown(function (e) {
    if (e.key == "Enter" && check(CUS_NAME_REGEX, $("#Name"))) {
        $("#CAdd").focus();
    }
});

$("#CAdd").keydown(function (e) {
    if (e.key == "Enter" && check(CUS_ADDRESS_REGEX, $("#CAdd"))) {
        $("#slry").focus();

    }
});

$("#slry").keydown(function (e) {
    if (e.key == "Enter" && check(CUS_SALARY_REGEX, $("#slry"))) {
        let con = confirm("Do yo want to add this customer ?")
        if (con) {
            saveCustomer($("#cid").val(), $("#Name").val(), $("#CAdd").val(), $("#slry").val());

            loadAllCustomer();
            clearform();
        }
    }
});


function checkValidationsOfAll() {
    let countOfError = 0;
    for (let validation of cusValidationArr) {
        if (validation.reg.test(validation.field.val())) {
            textSuccess(validation.field, "");
        } else {
            countOfError = countOfError + 1;
            setTextError(validation.field, validation.error);
        }
    }
    setButton(countOfError);
}

function textSuccess(textField, error) {
    if (textField.val().length <= 0) {
        defaultTxt(textField, "");
    } else {
        textField.css("border", "2px solid green");
        textField.parent().children('span').text(error);

    }
}

function defaultTxt(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);

}

function setTextError(textField, error) {
    if (textField.val().length <= 0) {
        defaultTxt(textField, "");
    } else {
        textField.css("border", "2px solid red");
        textField.parent().children('span').text(error);
    }
}

function setButton(value) {
    if (value > 0) {
        $("#addCustomer").attr('disabled', true);
    } else {
        $("#addCustomer").attr('disabled', false);

    }
}

function check(regex, textField) {
    let inputvalue = textField.val();
    return regex.test(inputvalue) ? true : false;
}
/*generate next id*/
/*
var counter = 1;

function generateNextCustomerID() {
    var customerID = 'C00-' + padNumber(counter, 2);
    counter++;
    return customerID;
}

function padNumber(number, length) {
    var str = String(number);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
var customerId = generateNextCustomerID();
$("#cid").val(customerId);*/
