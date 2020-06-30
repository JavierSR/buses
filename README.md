# Aplicacion para recomendar rutas de buses urbanos en Villavicencio
Esta aplicación creada en React Native usa la ubicación del usuario y un destino elegido para recomendar la ruta de bus a tomar.

## Herramientas utilizadas
### Frontend
 - ReactNative
   - Maps
   - Stack Navigator
   - Drawer Navigator
   - Formik
 - Material icons 
 - Google Maps API
### Backend
 - Node + Express
 - MySQL

## Requisitos para ejecución
  - Version reciente de NodeJs (12 en adelante)
  - Tener instalado ambiente de desarrollo React Native: https://reactnative.dev/docs/environment-setup
  - Emulador de Android o adb disponible
  - MySQL
  
## Instalación
1. Clonar proyecto
2. Copiar la base de datos en localhost (database.sql en la raíz del proyecto)
3. Entrar a la carpeta buses-backend y ejecutar los siguientes comandos para enecender el servidor: 
    > npm i
  
    > node app
4. Entrar a la carpeta buses-app y ejecutar los siguientes comandos para correr la aplicación
    > npm i
    
    > npx react-native-run-android
