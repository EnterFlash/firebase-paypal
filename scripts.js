const paypalCreateOrder = window.firebase.functions().httpsCallable("paypalCreateOrder");
const paypalHandleOrder = window.firebase.functions().httpsCallable("paypalHandleOrder");

window.paypal.Buttons({
  createOrder: (data, actions) => paypalCreateOrder().then(response => response.data.id),

  onApprove: (data, actions) => {
    paypalHandleOrder({ orderId: data.orderID })
    alert("THANKS FOR ORDERING!")
  }

}).render('#paypal-button')