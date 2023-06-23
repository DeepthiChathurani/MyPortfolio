//load all existing items
getAllItems();

//add item event
$("#btnItem").click(function () {
    if (checkAllItems()){
        saveItem();
    }

});

//get all items event
$("#btnItemGetAll").click(function () {
    getAllItems();
});

//bind tr events for getting back data of the rows to text fields
function bindItemTrEvents() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let unitPrice = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtCode").val(code);
        $("#txtItemName").val(name);
        $("#txtPrice").val(qty);
        $("#txtQty").val(unitPrice);

    })
}

//delete btn event
$("#btnItemDelete").click(function () {
    let code = $("#txtCode").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        } else {
            alert("Item Not Removed..!");
        }
    }


});

//update  btn event
$("#btnItemUpdate").click(function () {
    let code = $("#txtCode").val();
    updateItem(code);
    clearItemInputFields();
});

//clear btn event
$("#btnItem-clear1").click(function () {
    clearItemInputFields();
});



// CRUD operation Functions
function saveItem() {
    let itemCode = $("#txtCode").val();
    //check item is exists or not?
    if (searchItem(itemCode.trim()) == undefined) {

        //if the customer is not available then add him to the array
        let itemName = $("#txtItemName").val();
        let itemQty = $("#txtPrice").val();
        let itemPrice = $("#txtQty").val();

        //by using this one we can create a new object using
        //the item model with same properties
        let newItem = Object.assign({}, item);
        newItem.code = itemCode;
        newItem.description = itemName;
        newItem.unitPrice = itemPrice;
        newItem.qtyOnHand = itemQty;

        //add item record to the item array (DB)
        itemDB.push(newItem);
        clearItemInputFields();
        getAllItems();

    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

function getAllItems() {
    //clear all tbody data before add
    $("#tblItem").empty();

    //get all items
    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].code;
        let description = itemDB[i].description;
        let unitPrice = itemDB[i].unitPrice;
        let qty = itemDB[i].qtyOnHand;


        let row = `<tr>
                     <td>${code}</td>
                     <td>${description}</td>
                     <td>${unitPrice}</td>
                     <td>${qty}</td>
                     
                    </tr>`;

        // //and then append the row to tableBody
        $("#tblItem").append(row);

        //invoke this method every time
        // we add a row // otherwise click
        //event will not work
        bindItemTrEvents();
    }
}

function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function searchItem(code) {
    return itemDB.find(function (item) {
        //if the search code match with item record
        //then return that object
        return item.code == code;
    });
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No such Item..please check the Code");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(code);
            //if the item available can we update.?

            let itemName = $("#itemName").val();
            let itemQty = $("#itemQty").val();
            let itemPrice = $("#itemPrice").val();

            item.description = itemName;
            item.unitPrice = itemPrice;
            item.qtyOnHand = itemQty;


            getAllItems();
        }
    }

}

function clearItemInputFields() {
    $("#txtCode,#txtItemName,#txtPrice,#txtQty").val("");
    $("#txtCode,#txtItemName,#txtPrice,#txtQty").css("border", "1px solid #ced4da");
    $("#txtCode").focus();
    setItemBtn();
}


