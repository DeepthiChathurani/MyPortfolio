const ITEM_CODE_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{3,}$/;
const ITEM_QTY_REGEX = /^[0-9]+$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let ItemValidationArr =[];
ItemValidationArr.push({reg: ITEM_CODE_REGEX, field: $('#txtItemId'), error: 'Item Id Patter is Not Valid :I00-01'});
ItemValidationArr.push({reg: ITEM_NAME_REGEX, field: $('#txtItemName'), error: 'Item Name  is Not Valid :A a-Z z 5>'});
ItemValidationArr.push({reg: ITEM_PRICE_REGEX, field: $('#txtItemPrice'), error: 'Item price  is No Valid '});
ItemValidationArr.push({reg: ITEM_QTY_REGEX, field: $('#txtItemQty'), error: 'Item qty  is Not Valid '});



$("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").keydown(function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
    }
});

$("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").keyup(function () {
    checkValidationsOfAllItem();
});

$("#txtItemId").keydown(function (e) {
    if (e.key == "Enter" && checkItemRegex(ITEM_CODE_REGEX, $("#txtItemId"))) {
        e.preventDefault(); // Prevent the default Enter key behavior
        $("#txtItemName").focus();
        return false; // Stop further event propagation
    }
});


$("#txtItemName").keydown(function (e) {
    if (e.key == "Enter" && checkItemRegex(ITEM_NAME_REGEX, $("#txtItemName"))) {
        e.preventDefault();
        $("#txtItemPrice").focus();
        return false; // Stop further event propagation

    }
});

$("#txtItemPrice").keydown(function (e) {
    if (e.key == "Enter" && checkItemRegex(ITEM_PRICE_REGEX, $("#txtItemPrice"))) {
        e.preventDefault();
        $("#txtItemQty").focus();
        return false; // Stop further event propagation


    }
});

$("#txtItemQty").keydown(function (e) {
    if (e.key == "Enter" && checkItemRegex(ITEM_QTY_REGEX, $("#txtItemQty"))) {
        let con = confirm("Do yo want to add this item ?")
        if (con) {
            saveItem($("#OderId").val(), $("#OderDec").val(), $("#unitPrice").val(), $("#OderQty").val())
        }
    }
});


function checkValidationsOfAllItem() {
    let countOfError = 0;
    for (let validation of ItemValidationArr) {
        if (validation.reg.test(validation.field.val())) {
            textSuccessItemField(validation.field, "");
        } else {
            countOfError = countOfError + 1;
            setTextErrorItem(validation.field, validation.error);
        }
    }
    setItemButton(countOfError);
}

function textSuccessItemField(textField, error) {
    if (textField.val().length <= 0) {
        defaultTxtItem(textField, "");
    } else {
        textField.css("border", "2px solid green");
        textField.parent().children('span').text(error);

    }
}

function defaultTxtItem(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);

}

function setTextErrorItem(textField, error) {
    if (textField.val().length <= 0) {
        defaultTxtItem(textField, "");
    } else {
        textField.css("border", "2px solid red");
        textField.parent().children('span').text(error);
    }
}

function setItemButton(value) {
    if (value > 0) {
        $("#btnAddItem").attr('disabled', true);
    } else {
        $("#btnAddItem").attr('disabled', false);

    }
}

function checkItemRegex(regex, textField) {
    let inputvalue = textField.val();
    return regex.test(inputvalue) ? true : false;
}