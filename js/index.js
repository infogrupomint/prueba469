//Capturo el elemento "shopContent" que cree en html
const shopContent = document.getElementById("shopContent");

//Creamos carrito como un array vacio
const cart =[];

//Recorro todo el array "prductos" y cada elemento va a ser "producto"
//Creamos "content" para asiganar elementos al shopContent de html para que se muestre en pantalla
//Con content.innerHTML escribo y asigno codigo html 
//Creamos etiquetas html y llamamos a los datos desde el archivo script productos
productos.forEach((product)=>{
    const content = document.createElement("div");
    content.innerHTML = `
    <img src = "${product.img}">
    <h3>${product.productName}</h3>
    <p>${product.price} $</p>
    `;
    shopContent.append(content);

    //creamos un boton
    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy";

    //Agregamos el boton a contetn
    content.append(buyButton);

    //Escuchamos elevento click cuando presionen el boton Buy
    //Cuando precionen el boton buy se deben caputar los datos y agregarlos al nuevo array cart
    buyButton.addEventListener("click",()=>{
        //Funcion para que cuando agrege un mismo producto no se repita y directamente se incremente la cantidad
        const repeat =cart.some((repeatProduct) => repeatProduct.id === product.id);
        
        if(repeat){
            cart.map(prod => {
                if(prod.id === product.id){
                    prod.quanty++;
                    displayCartCounter();
                }
            });
        } else {
        cart.push({
            id: product.id,
            productName: product.productName,
            price: product.price,
            quanty: product.quanty,
            img: product.img
        });
        displayCartCounter(); 
       }
    });
})