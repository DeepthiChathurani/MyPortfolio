//load all existing customers
$(document).ready(function() {
    $("#storeList1 .itemTbody tr").css("color", "white");
});

function updateItem(id) {
    if (searchItem(id) == undefined) {
        alert("No such Item..please check the Code");
    } else {
        let consent = confirm("Do You Want to Update?")
        if (consent) {
            let item = searchItem(id);
            let itemId = $("#txtItemId").val();
            let itemName = $("#txtItemName").val();
            let itemPrice = $("#txtItemPrice").val();
            let itemQty = $("#txtItemQty").val();
            item.itemId = itemId;
            item.itemName = itemName;
            item.itemPrice = itemPrice;
            item.itemQty = itemQty;
            getAllItem();
            clearItemData();
        }


    }
}

$("#btnDeleteItem").on('click',function () {
    let itemId = $("#txtItemId").val();
    let consent=confirm("Do You Want to delete?");
    if(consent){
        let response=deleteItem(itemId);
        if (response){
            alert("Customer Delete");
            getAllCustomers();
            clearItemData();
        }else {
            alert("Customer Not remove");
        }

    }

});

function deleteItem(id) {
    for (let i=0;i<itemDb.length;i++){
        if(itemDb[i].itemId==id){
            itemDb.splice(i,1);
            getAllItem();
            return true
        }
        return false;
    }
};
//add customer event
$("#btnAddItem").click(function () {
    saveItem();



});
$("#btnUpdateItem").click(function () {
    let itemId = $("#txtItemId").val();
    updateItem(itemId);
});
getAllItem();

//get all customer event
$("#loadItem").click(function () {
    getAllItem();
});

//bind tr events for getting back data of the rows to text fields
function bindTrEventsItem() {
    $('.itemTbody>tr').click(function () {
        //get the selected rows data
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemId").val(id);
        $("#txtItemName").val(name);
        $("#txtItemPrice").val(price);
        $("#txtItemQty").val(qty);
    })
}

//delete btn event

//clear btn event




// CRUD operation Functions
function saveItem() {
    let ItemId = $("#txtItemId").val();
    //check customer is exists or not?
    if (searchItem(ItemId.trim()) == undefined) {
        //if the customer is not available then add him to the array
        let ItemName = $("#txtItemName").val();
        let ItemPrice = $("#txtItemPrice").val();
        let ItemQty = $("#txtItemQty").val();

        //by using this one we can create a new object using
        //the customer model with same properties
        let newItem = Object.assign({}, itemObj);
        newItem.itemId = ItemId;
        newItem.itemName = ItemName;
        newItem.itemPrice = ItemPrice;
        newItem.itemQty = ItemQty;

        //add customer record to the customer array (DB)
        itemDb.push(newItem);
        clearItemData();
        getAllItem();
        loadAllItemId();
    } else {
        alert("Item already exits.!");
        clearItemData();
    }
}


function getAllItem() {
    //clear all tbody data before add
    $(".itemTbody").empty();

    //get all customers
    for (let i = 0; i < itemDb.length; i++) {
        let id = itemDb[i].itemId;
        let name = itemDb[i].itemName;
        let price = itemDb[i].itemPrice;
        let qty = itemDb[i].itemQty;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $(".itemTbody").append(row);

        //invoke this method every time
        // we add a row // otherwise click
        //event will not work
        bindTrEventsItem();
    }
}



function searchItem(id) {
    return itemDb.find(function (item) {
        //if the search id match with customer record
        //then return that object
        return item.itemId == id;
    });
}

function clearItemData() {
    let id = $("#txtItemId").val("");
    let name = $("#txtItemName").val("");
    let add = $("#txtItemPrice").val("");
    let slry = $("#txtItemQty").val("");
    $("#txtItemId").css("border", "none");
    $("#txtItemName").css("border", "none");
    $("#txtItemPrice").css("border", "none");
    $("#txtItemQty").css("border", "none");
    $("#txtItemId").focus();
}
