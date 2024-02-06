//capturo los div de cart(de HTML) en una constante
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const metodoPago = document.getElementById("smart-button-container");
const metodoPagoOverlay = document.getElementById("smart-button-container-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");


const displayCart = () =>{
    //cada vez que se ejecute la funcion va a limpiar apra que no se dupliquen los elementos
    modalContainer.innerHTML = "";

    //Al iniciar la pagina el carrito no se ve, pero quiero que se vea cuando rpeciono el boton carrito
    //para ello debo cambiar la propiedad de display(en css) de none a block
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";
    
    //modal Header
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    modalClose.innerText = "❌";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    })

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    //modal Body
    if (cart.length > 0){
    cart.forEach((product) => {
        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = `
        <div class = "product">
             <img class = "product-img" src="${product.img}" />
             <div class = "product-info">
            <h4>${product.productName}</h4>
             </div>
         <div class = "quantity">
            <span class ="quantity-btn-decrese">-</span>
            <span class ="quantity-input">${product.quanty}</span>
            <span class="quantity-btn-increse">+</span>
         </div>
         <div class="price">${product.price * product.quanty}  $</div>
         <div class = "delete-product">❌</div>
        </div>
        `;
        modalContainer.append(modalBody);

        //Damos funcionalidad a los botnes de aumentar o disminuir cantidad
        //querySelector me permite caputurar clases de css(agregar un punto)
        //colocamos un condicion if para que reste cuando la cantidad sea diferente a 1, de esta forma, la cantidad nunca pasa a 0 y numeros negativos
        const decrese = modalBody.querySelector(".quantity-btn-decrese");
        decrese.addEventListener("click", ()=> {
            if(product.quanty !==1){
                product.quanty--; //accion para restar una unidad
                displayCart(); //accion para actualizar luego de restar
                displayCartCounter();
            }
        });

        const increse = modalBody.querySelector(".quantity-btn-increse");
        increse.addEventListener("click", () => {
            product.quanty++; //accion para sumar una unidad
            displayCart(); //accion para actualizar luego de sumar
            displayCartCounter();
        });

        //Funcion del boton de eliminar producto
        //Capturo el boton:
        const deleteProduct = modalBody.querySelector(".delete-product");

        deleteProduct.addEventListener("click", () => {
            deleteCartProduct(product.id);
        });
    });

    //modal footer

    const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
    <div class = "total-price">Total:  ${total} </div>
    <button class = "btn-primary" id = "checkout-btn">METODO DE PAGO</button>
    <div id = "button-checkout"></div>
    `;
    
    modalContainer.append(modalFooter);

    //Damos Funcionalidad al boton metodo de pago
    const metodoPagoBtn = modalFooter.querySelector(".btn-primary");

    metodoPagoBtn.addEventListener("click", () => {
        metodoPago.style.display = "block";
        metodoPagoOverlay.style.display = "block";
    });

//FUNCION INTEGRADA PARA COBRAR CON PAYPAL TOMANDO VARIABLES
    function initPayPalButton() {
        paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'pay',
            
          },
  
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                "description": "Compra Tienda Online",
                "amount":{"currency_code":"EUR","value": total}
              }]
            });
          },
  
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
              
              // Full available details
              console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
   
  actions.redirect('LA URL DE TU PAGINA DE GRACIAS');
              
            });
          },
  
          onError: function(err) {
            console.log(err);
          }
        }).render('#paypal-button-container');
      }
      initPayPalButton();



//-----------------------------------------------------------------------------------


} else {
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "Su carrito esta vacio";
    modalContainer.append(modalText);
}



};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCounter();
};

const displayCartCounter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cartLength > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    }else{
        cartCounter.style.display = "none";
    }

};

checkout-btn.addEventListener("click", pagoPaypal)




