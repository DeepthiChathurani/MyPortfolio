// $(document).ready(function () {
//     generateNextOrderId();
// });
// fillCurrentDate();
//
//
// function loadAllCusId() {
//     $("#orderCustomerID").empty();
//     for (let cus of customerDB){
//         let id=`<option>${cus.id}</option>`;
//         $("#OderCusId").append(id);
//     }
// }
//
// $("#orderCustomerID").on('change',function (){
//     const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
//     let customer=searchCustomer($('#orderCustomerID').val());
//     if (CUS_NAME_REGEX.test(customer.name)) {
//         $("#orderCustomerName").val(customer.name);
//         $("#orderCustomerName").css("border","2px solid green");
//     }else {
//         $("#orderCustomerName").css("border","2px solid red");
//
//     }
// });
// function loadAllCusSalary() {
//     $("#orderCustomerSalary").empty();
//     for (let cus of customerDB){
//         let salary=`<option>${cus.salary}</option>`;
//         $("#oderCusSalary").append(salary);
//     }
// }
// function loadAllCusAddress() {
//     $("#orderCustomerAddress").empty();
//     for (let cus of customerDB){
//         let id=`<option>${cus.id}</option>`;
//         $("#oderCusAddress").append(id);
//     }
// }
// function loadAllItemCode() {
//     $("#txtItemCode").empty();
//     for (let item of itemDB){
//         let id=`<option>${item.code}</option>`;
//         $("#OderItemId").append(id);
//     }
// }
//
// function fillCurrentDate() {
//     let currentDate = new Date().toISOString().split('T')[0];
//     $('#txtDate').val(currentDate);
//
// }
//
//
// $("#btnAddToTable").click(function () {
//     itemsAddToTable();
// });
//
// function itemsAddToTable() {
//     let oderId = $("#txtOrderID").val();
//     let date = $("#txtDate").val();
//     let cusId = $("#orderCustomerID").val();
//     let cusName = $("#orderCustomerName").val();
//     let cusSalary = $("#orderCustomerSalary").val();
//     let cusAddress = $("#orderCustomerAddress").val();
//     let itemCode = $('#txtItemCode').val();
//     let description = $('#txtItemDescription').val();
//     let unitPrice = parseFloat($('#txtItemPrice').val());
//     let qtyOnHand = $("#txtQTYOnHand").val();
//     let quantity = parseInt($('#txtQty1').val());
//     let total = parseInt($('#total-text').val());
//
//
//     // Check if the quantity is available
//     let item = itemDB.find(i => i.code === itemCode);
//     if (item) {
//         let availableQty = item.qty;
//         let total = unitPrice * quantity;
//
//         // Check if the item already exists in the table
//         let existingItem = orderDB.find(i => i.OdItemId === itemCode);
//         if (existingItem) {
//             let newQuantity = existingItem.oderQty + quantity;
//
//             if (newQuantity <= availableQty) {
//                 existingItem.oderQty = newQuantity;
//                 existingItem.total += total;
//             } else {
//                 alert('Insufficient quantity!');
//                 return;
//             }
//
//         } else {
//             if (quantity <= availableQty) {
//                 orderDB.push({
//                     OderId: oderId,
//                     OderDate: date,
//                     oderCusId: cusId,
//                     oderCusName: cusName,
//                     oderCusSalary:cusSalary,
//                     oderCusAddress:cusAddress,
//                     OderItemId: itemCode,
//                     OderItemName: description,
//                     OderItemPrice: unitPrice,
//                     OderItemQty: qtyOnHand,
//                     oderQty: quantity,
//                     total: total,
//                 });
//             } else {
//                 alert('Insufficient quantity!');
//                 return;
//             }
//         }
//
//         // Update the table
//         updateTable();
//         calculateTotal();
//     } else {
//         alert('Item not found!');
//     }
// }
//
// function updateTable() {
//     $("#cartTBody").empty();
//     for (let oder of orderDB) {
//         let row = `<tr>
// <td>${oder.OderItemId}</td>
// <td>${oder.OdItemName}</td>
// <td>${oder.OdItemPrice.toFixed(2)}</td>
// <td>${oder.oderQty}</td>
// <td>${oder.total.toFixed(4)}</td>
// </tr>`;
//         $("#orderTable").append(row);
//
//     }
// }
// function calculateTotal() {
//     let total = 0;
//     for (let item of orderDB) {
//         total += item.total;
//     }
//     $('#total-text').val(total.toFixed(2));
//     $('#total-text1').val(total.toFixed(2));
//
// }
// let disTOGave = 0;
//
// $('#discount').on('keyup', function() {
//     let dis = parseFloat($('#txtDiscount').val());
//     let tot = parseFloat($('#total-text').val());
//
//     console.log(dis + "==" + tot);
//
//     let totMin = tot * (dis / 100);
//     console.log("Discount Amount: " + totMin);
//
//     let subTot = tot - totMin;
//     disTOGave = totMin;
//
//     $('#total-text1').val(subTot);
//     updateBalance();
// });
//
// // $("#txtCash").on("keyup", function() {
// //     var cashValue = parseFloat($(this).val());
// //     var subtotalValue = parseFloat($("#total-text1").val());
// //
// //     if (isNaN(cashValue) || cashValue > subtotalValue) {
// //         $("#cash").css("border", "2px solid red");
// //         $("#lblCash").text("Insufficient credit");
// //     } else {
// //         $("#cash").css("border", "");
// //         $("#lblCash").text("");
// //     }
// //
// //     updateBalance();
// // });
//
// function updateBalance() {
//     var cashValue = parseFloat($("#txtCash").val());
//     var subtotalValue = parseFloat($("#total-text1").val());
//
//     var balance = cashValue - (subtotalValue);
//     console.log(disTOGave);
//     $('#txtBalance').val(balance.toFixed(2));
// }
// function clearAll() {
//     $("#txtDate").val("");
//     $("#txtCustomerID").val("");
//     $("#txtCustomerName").val("");
//     $("#txtCustomerSalary").val("");
//     $("#txtCustomerAddress").val("");
//     $("#txtItemCode").val("");
//     $("#txtItemName").val("");
//     $("#txtPrice").val("");
//     $("#txtQty").val("");
//     $("#txtQty1").val("");
//     $("#txtBalance").val("");
//     $("#total-text1").val("");
//     $("#total-text").val("");
//     $("#txtDiscount").val("");
//     $("#txtCash").val("");
//     // $("#cash").css("border" ,"");
//     // $("#lblCash").text("");
//     // $("#OderDec").css("border", "");
//     // $("#unitPrice").css("border", "");
//     // $("#QtyOnHand").css("border", "");
//     // $("#OderCusName").css("border", "");
// }
//
// $("#btnSubmitOrder").click(function () {
//     //let OIDRegex = /^(OID-)[0-9]{1,3}$/
//     let con = confirm("Do yo want to add this Oder ?")
//     if (con){
//         if (($('#txtOrderID') != null )){
//             let oderId = $("#txtOrderID").val();
//             let date = $("#txtDate").val();
//             let cusName = $("#orderCustomerID").val();
//             let discount = $("#txtDiscount").val();
//             let cost = $("#txtCash").val();
//
//             placeOderDB.push({
//                 OdId: oderId,
//                 oderCusName: cusName,
//                 OdDate: date,
//                 discount: discount,
//                 oderCost: cost
//             });
//
//             clearAll();
//             clearTable();
//             generateNextOrderId();
//             loadAllItemCode();
//             loadviewTable();
//             fillCurrentDate();
//         }else {
//             alert("Enter Oder Id")
//
//         }
//     }else {
//         alert("can not placeOder")
//     }
//
// });
//
// function clearTable() {
//     $("#orderTable").empty();
// }
// function generateNextOrderId() {
//     let existingOrderIds = orderDB.map(function(order) {
//         return order.OderId;
//     });
//
//     let maxId = existingOrderIds.reduce(function(max, orderId) {
//         let orderIdNumber = parseInt(orderId.split('-')[1]);
//         return orderIdNumber > max ? orderIdNumber : max;
//     }, 0);
//
//     let nextIdNumber = maxId + 1;
//     let nextId = 'ODI-' + nextIdNumber.toString().padStart(3, '0');
//
//     $("#txtOrderID").val(nextId);
//     $('#txtOrderID').css("border","2px solid green");
//
//     placeOder.OderId = nextId; // Update the OdId in placeOderObj
// }
//
//
//
// function loadviewTable() {
//     $("#ordersTBody").empty();
//
//     //get all customers
//     for (let i = 0; i < placeOderDB.length; i++) {
//         let id = placeOderDB[i].OdId;
//         let name = placeOderDB[i].oderCusName;
//         let date = new Date(placeOderDB[i].OdDate);
//         let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
//         let discount = placeOderDB[i].discount;
//         let balance = placeOderDB[i].odCost;
//
//
//         let row = `<tr>
//                      <td>${id}</td>
//                      <td>${name}</td>
//                      <td>${formattedDate}</td>
//                      <td>${discount}</td>
//                      <td>${balance}</td>
//                     </tr>`;
//
//         // //and then append the row to tableBody
//         $("#orderTable").append(row);
//     }
//
//
// }