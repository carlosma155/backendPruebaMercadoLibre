# backend-PruebaMercadoLibre

Prueba de React JS y Express JS para Mercado Libre 20/02/2021

Nota: Este backend está desplegado en la plataforma vercel, por lo tanto no es necesario ejecutarlo, basta con ejecutar la prueba desde el frontend.


# DOCUMENTACION


# Tecnologias: 
React JS, React-Hooks, Redux, Redux-thunk, Webpack, Node JS, Express JS, Server Side Render con Express JS, REST API, Git.


# Backend:

- Rutas: Se desarrollaron los siguientes endpoints =>  /api/items  ,  /api/items/:id .

- Servicios: Se contruyó la capa de servicios, esta capa es la encargada de manejar la logica de negocio y tambien es la que hace los llamados a terceros, en el caso de esta prueba el llamado lo hace a los endpoints dados para obtener la informacion de los productos. En esta capa es donde se construye el formato de respuesta requerido.

- Despliegue: Se desplegó el proyecto en la plataforma vercel. El frontend queda haciendo el request a esta url. 

Notas:
- En la vista de detalle del producto en el Breadcrumb se requeria colocar la categoria propia del item, no obstante, esa informacion no esta en ninguno de los dos objetos de respuesta requeridos, por lo tanto se procede a modificar el objeto de respuesta para traer ademas de los datos requeridos el category_id y la ciudad (Esta ultima era requerida en la vista de resultado de la busqueda).


# Frontend:

- Vistas: Se construyeron las siguientes vistas => caja de busqueda, resultado de la busqueda y detalle del producto. Cada una es navegable de manera independiente y cuentan con su propia url así respectivamente: '/', '/items', '/items/:id'.

- Funcionalidad: 
  1. En la caja de busqueda se ingresa un producto y al enviar el formulario, se navega a la vista de resultados de busqueda visualizando 4 productos. Al hacer click en la imagen o en el titulo del producto, se navega a la vista de detalle de producto. Nota: Estando en la vista de resultados de busqueda, el click se debe hacer solamente en la imagen o en el titulo pues de esta forma es que funciona actualmente en la pagina de mercadolibre.com. 
  2. Dado un id de producto en la url http://localhost:8000/items/:id se puede ingresar directamente a la vista de detalle de producto.

- Desarrollo: 
  1. Se realizó un npm init para crear el package.json y de esta forma poder realizar la instalacion de cada paquete necesario para el desarrollo de la prueba, se creo la estructura del proyecto y se configuró webpack.
  2. Se hizo el desarrollo de los containers => Home, ItemsList, ItemDetails y NotFound. Asi como tambien el desarrollo de los componentes => Search, Layout, Item y Breadcrumb.
  3. Se creo un servidor con Express Js y se integró con webpack para servir la App desde el server(SSR). 
  4. Se hizo la integracion de React con Express JS.
 
 Notas: 
- Tener en cuenta que del objeto de respuesta del endpoint =>  https://api.mercadolibre.com/sites/MLA/search?q=:query  se extraen las categorias del siguiente array => available_filters. Lo que se menciona anteriormente es para aclarar que existen queries que retornan este array vacio => available_filters. Por tal motivo cuando retorna este array vacio, no se muestra el componente Breadcrumb en la vista de resultado de la busqueda.
- En la vista de resultado de la busqueda la categoria que se muestra en el Breadcrumb es la categoria que tuvo mas resultados.
- En la vista de detalle del producto la categoria que se muestra en el Breadcrumb es la categoria propia del producto.
- En la vista de detalle del producto se cambiaron las valores "new" y "used" que retorna la API, por "Nuevo" y "Usado" respectivamente puesto que toda la interfaz del usuario está en español.  
