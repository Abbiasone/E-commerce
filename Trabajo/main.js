const buscar = document.getElementById("buscar");
const write = document.getElementById("write");
const cargar = document.getElementById("cargar");
const listaDeProductos = document.getElementById("listaDeProductos");

const renderHTML = (product) => {
  return `
  <div class= ".listaDeProd">
  <img class= "product-img"
  src="${product.image}" 
  alt="${product.title}"
   width="100" >
  <br>
    <strong class= "product">${product.title}
    </strong> 
    <br><br>
    <button type="button" class="btn-precio" > ${product.price}
   <button/>
  </div>
`
}

cargar.addEventListener('click', async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET'
    });

    if (response.ok) {
      const products = await response.json();

      listaDeProductos.innerHTML = '';

      products.forEach(product => {
        const productHTML = renderHTML(product);
        listaDeProductos.innerHTML += productHTML;
      });
    } 
  } catch  {
    
  }
});

buscar.addEventListener('click', async () => {
  const searchId = write.value;

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${searchId}`, {
      method: 'GET'
    });

    if (response.ok) {
      const product = await response.json();

      if (product.id) {
        const productHTML = renderHTML(product);
        listaDeProductos.innerHTML = productHTML;
      } else {
        alert('Producto no encontrado.');
      }
    } else {
      throw new Error('No se pudo buscar el producto.');
    }
  } catch (error) {
    console.error(error);
  }
});

