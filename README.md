![Image](https://github.com/user-attachments/assets/edc29f8b-6e3d-44de-be62-3e61b958636e)

# Lucatoni - Educational Cryptocurrency

Este proyecto implementa una criptomoneda educativa llamada "Lucatoni". **Nota:** Este proyecto es únicamente para fines educativos y no tiene valor monetario ni está diseñado para aplicaciones comerciales.
y esta vinculado con https://github.com/jhonja999/Lukatoni-token, que usé como token de Prueba
[![Lucatoni Logo](https://github.com/user-attachments/assets/923a67a0-a380-46f9-899c-ff41ed6b34ce)](https://github.com/jhonja999/Lukatoni-token)

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 14 o superior).
- [Ganache](https://trufflesuite.com/ganache/) para redes locales de Ethereum.
- [Truffle Suite](https://trufflesuite.com/) para compilar, desplegar y probar contratos inteligentes.
- [Metamask](https://metamask.io/) como billetera de prueba para interactuar con tu token.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/jhonja999/Lukatoni-token
   cd Lukatoni-token
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Configura tu red local:

   - Asegúrate de que Ganache esté en ejecución en `127.0.0.1:7545`.
   - Configura Metamask para conectarse a tu red local.

## Archivos Clave

### `truffle-config.js`
Este archivo contiene la configuración de Truffle para la red local Ganache.

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,  // Cambiado a 7545 para Ganache GUI
      network_id: "*",
      gas: 6721975,
      gasPrice: 20000000000,
      from: "<DIRECCIÓN_GANACHE>" // Reemplaza con una dirección de Ganache
    }
  },
  compilers: {
    solc: {
      version: "0.8.19", // Versión específica de Solidity
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
```

### `1_initial_migration.js`
Despliega las migraciones iniciales del contrato.

```javascript
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
```

### `2_deploy_lucatoni.js`
Despliega el contrato del token Lucatoni con un suministro inicial.

```javascript
const Lucatoni = artifacts.require("Lucatoni");

module.exports = function(deployer) {
  deployer.deploy(Lucatoni, 1000000); // Desplegando con suministro inicial de tokens
};
```

## Despliegue

1. Compila los contratos inteligentes:

   ```bash
   truffle compile
   ```

2. Migra los contratos a la red local:

   ```bash
   truffle migrate --network development
   ```

3. Verifica el despliegue:

   ```bash
   truffle console --network development
   ```

   Dentro de la consola de Truffle, puedes interactuar con tu contrato:

   ```javascript
   const lucatoni = await Lucatoni.deployed();
   const totalSupply = await lucatoni.totalSupply();
   console.log(totalSupply.toString());
   ```

## Pruebas

Ejecuta las pruebas unitarias:

```bash
truffle test
```

## Interacción

Usa Metamask o cualquier herramienta como [Remix](https://remix.ethereum.org/) para interactuar con tu contrato inteligente y transferir tokens entre cuentas.

## Interfaz Web

Puedes crear una interfaz web funcional utilizando [Next.js](https://nextjs.org/) y React. Aquí están los pasos principales para configurar el proyecto:

1. Crea un nuevo proyecto Next.js:

   ```bash
   npx create-next-app@latest lucatoni-frontend
   ```

   Escoge las siguientes opciones:

   - TypeScript: Sí
   - ESLint: Sí
   - Tailwind CSS: Sí
   - App Router: Sí

2. Instala las dependencias necesarias para la interacción con blockchain:

   ```bash
   npm install ethers@5.7.2
   ```

3. Configura los componentes en tu proyecto para integrar el contrato Lucatoni (ERC20). Implementa funciones para:

   - Mostrar el balance de tokens LUCA.
   - Enviar tokens.
   - Ver el historial de transacciones.
   - Conectar/desconectar billeteras como MetaMask.

4. Configura soporte para modo claro/oscuro y un diseño responsivo con Tailwind CSS.

### Recursos adicionales

Incluye la imagen referencial de tu proyecto en la cabecera de tu interfaz web:

```javascript
import Image from "next/image";
import lucatoniLogo from '@/public/lucatoni.jpeg';

<Image
  src={lucatoniLogo}
  alt="Lucatoni Logo"
  width={40}
  height={40}
  className="rounded-full"
/>
```
Saludos
---

**Aviso Legal:** Este proyecto es únicamente para fines educativos. No utilices este código para aplicaciones financieras o comerciales.
