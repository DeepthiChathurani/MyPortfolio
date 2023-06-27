function loadAllOderId() {
    $("#loadOderId").empty();
    for (let oder of placeOderDB2){
        let id=`<option>${oder.OdId}</option>`;
        $("#loadOderId").append(id);
    }
}
function searchOderDetail(id) {
    // Find the order object that matches the selected ID
    let oder = placeOderDB2.find(ode => ode.OdId == id);

    if (oder) {
        $("#id").val(oder.OdId);
        $("#cname").val(oder.oderCusName);
        $("#OdDate").val(oder.odDate);
        $("#dis").val(oder.discount);
        $("#cost").val(oder.odCost);
        // Clear and populate the table with the order data

    }
}


$("#OdIdSearch").click(function () {
    let id= $("#loadOderId").val();
searchOderDetail(id);
})

function deleteOders(id) {
    for (let i = 0; i < placeOderDB2.length; i++) {
        if (placeOderDB2[i].OdId == id) {
            placeOderDB2.splice(i, 1);
            loadviewTable();
            return true;
        }
    }
    return false;
}

$("#btndeleteOD").on('click',function () {
    let id = $("#id").val();
    let consent=confirm("Do You Want to delete?");
    if(consent){
        let response=deleteOders(id);
        if (response){
            alert("Order Delete");
            loadviewTable();
            loadAllOderId();
            clear();
            generateNextOrderId();
        }else {
            alert("Order Not remove");
        }

    }

});
function clear() {
    $("#id").val("");
    $("#cname").val("");
    $("#OdDate").val("");
    $("#dis").val("");
    $("#cost").val("");
}
$("#btnclear").click(function () {
    clear();
})