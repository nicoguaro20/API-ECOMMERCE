---------------------------------------------------------------------------------------------------------------------------------------------
# 🛍️ API E-COMMERCE - Proyecto Integrador Módulo 4
**Cohorte**: Webft60
**Desarrollador:** Juan Nicolas García Guarín
---------------------------------------------------------------------------------------------------------------------------------------------

## 📄 Descripción:

Este proyecto es una **API RESTful** desarrollada como parte del proyecto integrador del Módulo 4 del bootcamp **Soy Henry**.  
Su funcionalidad principal está orientada a un sistema de **e-commerce**, permitiendo:

- Registro y autenticación de usuarios.
- Gestión de órdenes de compra.
- Gestión de productos y sus categorías.

La API está construida utilizando **NestJS**, y sigue buenas prácticas de arquitectura escalable y segura.

## 🛠️ Tecnologías utilizadas:

- NestJS
- TypeScript
- JWT para autenticación
- PostgreSQL
- Swagger para documentación de la API
- Cloudinary para gestión de imágenes

## 🔐 Variables de entorno:

Para el funcionamiento correcto del proyecto, es necesario crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos PotgreSQL
DB_NAME=tu_nombre_de_base_de_datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_nombre_de_cloud
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# JWT
JWT_SECRET=tu_clave_secreta_jwt
```

## 🚀 Instalación ejecución local:

1. Clona el repositorio:

git clone https://github.com/pi-rym/PM4BE-nicoguaro20.git

2. Instala las dependencias:

npm install

3. Crea el archivo .env (en la raiz del proyecto):

Asegúrate de que el archivo .env esté completo y en la raíz del proyecto (ecommerce-nicoguaro20/).

4. Levanta el servidor

npm run start

El servidor estará disponible por defecto en http://localhost:3000/.

## 📚 Documentación de la API:

Una vez levantado el servidor, puedes acceder a la documentación interactiva de los endpoints generada con Swagger ingresando a:

👉 http://localhost:3000/api

Desde ahí podrás:

Visualizar todos los endpoints disponibles.

Ver ejemplos de request/response.

Probar las rutas directamente desde el navegador.

---------------------------------------------------------------------------------------------------------------------------------------------

## 🗄️ Estructura de la base de datos:

La base de datos está desarrollada en PostgreSQL y contiene las siguientes tablas principales:

📌 Tablas y relaciones:

🗂️categories
id (UUID, PK)
name
🔗 Relación: 1:N con products

📦 products
id (UUID, PK)
name, description, price, stock, imgUrl, categoryId (FK)
🔗 Relación: N:1 con categories
🔗 Relación: N:N con orderDetails

📄orderDetails
id (UUID, PK)
price, productId (FK), orderId(FK)
🔗 Relación: N:N con products
🔗 Relación 1:1 con orders

🧾 orders
id (UUID, PK)
date, userId (FK)
🔗 Relación: 1:1 con orderDetails
🔗 Relación: N:1 con users

👤users
id (UUID, PK)
name, email, password, address, phone, country, city, isAdmin, createdAt
🔗 relación: 1:N con orders

---------------------------------------------------------------------------------------------------------------------------------------------


## 👤 Autenticación de usuario:

La API permite gestionar usuarios mediante dos funcionalidades principales:

### 📥 Registro de usuario – `POST http://localhost:3000/auth/signup`

Permite crear una cuenta de usuario, proporcionando:

```json
{
  "name": "Prueba veintiuno",
  "email": "correo_21@gmail.com.co",
  "password": "Prueba_21",
  "confirmPassword": "Prueba_21",
  "country": "Perú",
  "phone": 366666666,
  "address": "Calle Siempre Viva 21",
  "city": "Lima"
}
```

La contraseña es almacenada de forma segura mediante hashing.

### 🔑 Inicio de sesión – `POST http://localhost:3000/auth/signin`

Permite iniciar sesión usando las credenciales de acceso:

```json
{
  "email": "correo_1@example.com",
  "password": "Prueba_1"
}
```

Si las credenciales son válidas, el servidor responde con un token JWT que podrá utilizarse para acceder a rutas protegidas.

Este sistema de autenticación garantiza seguridad en el acceso a recursos sensibles y permite gestionar sesiones de manera eficiente.

---------------------------------------------------------------------------------------------------------------------------------------------

## 🧑‍💼 Funcionalidades de usuario:

La API permite realizar operaciones CRUD sobre los usuarios mediante las siguientes funcionalidades:

### 📋 Listar usuarios -  ` GET http://localhost:3000/users/list`

Permite obtener la lista de usuarios

### 🔍 Obtener usuario por id -  ` GET http://localhost:3000/users/:id`

Permite obtener un usuario a través de su id.

### ✏️ Editar usuario - ` PUT http://localhost:3000/users/:id`

Permite editar usuarios proporcionando los datos requeridos.

```json
{
  "name": "Prueba veintiuno",
  "email": "correo_21@gmail.com.co",
  "password": "Prueba_21",
  "confirmPassword": "Prueba_21",
  "country": "Perú",
  "phone": 366666666,
  "address": "Calle Siempre Viva 21",
  "city": "Lima"
}
```

### ❌ Eliminar usuarios - ` DELETE http://localhost:3000/users/:id`

Permite eliminar usuarios con su id

---------------------------------------------------------------------------------------------------------------------------------------------

## 📦 Funcionalidades de producto:

La API permite gestionar productos mediante las siguientes funcionalidades (CRUD):

### 📦 Crear producto  – `POST http://localhost:3000/products`

Permite crear un nuevo producto proporcionando los datos requeridos.

```json
{
  "name": "Nombre del producto",
  "description": "Descripción del producto",
  "price": 2500,
  "stock": 50,
  "category": "Categoría del producto con llave de categoría de productos",
  "imgUrl": "Se puede cargar archivo de 200kb o dejar la imagen por default"
}
```

### ✏️ Editar producto - ` PUT http://localhost:3000/products/:id`

Permite editar un producto existente proporcionando los datos requeridos

```json
{
  "name": "Nombre del producto",
  "description": "Descripción del producto",
  "price": 2500,
  "stock": 50,
  "category": "Categoría del producto con llave de categoría de productos",
  "imgUrl": "Se puede cargar archivo de 200kb o dejar la imagen por default"
}
```

### 📋 Listar productos - ` GET http://localhost:3000/products`

Permite obtener el listado de productos

### 🔍 Obtener producto por id - ` GET http://localhost:3000/products/:id`

Permite obtener el producto a traves de su id

### ❌ Eliminar producto - ` DELETE http://localhost:3000/products/:id`

Permite eliminar el producto mediante su id

---------------------------------------------------------------------------------------------------------------------------------------------

## 🗂️ Funcionalidades de categoría:

La API permite gestionar categorías mediante las siguientes funcionalidades:

### 📋 Listar categorías - ` GET http://localhost:3000/categories`

Permite obtener las categorías

---------------------------------------------------------------------------------------------------------------------------------------------

## 🧾Funcionalidades de Órdenes:

La API permite gestionar órdenes mediante las siguientes funcionalidades:

### Crear Orden de compra - ` POST http://localhost:3000/orders`

Permite crear ordenes de compra proporcionando los datos requeridos.

userId: UUID
productos: UUID

```json
{
  "userId": "e2cc6d5e-2730-4e16-8aad-717b293aaf9b",
  "products": [
    {"id": "686bd16f-c355-4f98-9fa8-8b05e3ae67f7"},
    {"id": "a29a1202-0f4f-43be-8622-e4c30f720911"},
    {"id": "da7e3883-7923-46bf-8745-db72724e571d"},
    {"id": "65fc5135-7370-4c9a-97b3-e021f532facf"},
    {"id": "d413cb39-acfb-4115-b1d9-f2174359d1e2"},
    {"id": "bae7e7f6-1b03-4262-ae5a-4c4fc482e1b3"}
    ]
}
```

### 🔍 Obtener orden por orderId - ` GET http://localhost:3000/orders/:id`

Permite obtener la orden de compra a través del orderId.

---------------------------------------------------------------------------------------------------------------------------------------------

## 🖼️ Carga de archivos:

La API permite realizar la carga de archivos mediante las siguientes funcionalidades:

### Carga de imagenes - ` POST http://localhost:3000/file-upload/uploadImage/:id`

Permite cargar una imagen de hasta 200Kb mediante el productId.

🔧 **Nota:** La imagen debe ser enviada como `multipart/form-data` utilizando el campo `file`.