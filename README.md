# Calculadora em Cordova

## Requisitos

- Node.js instalado
- Apache Cordova CLI instalado globalmente
- Para Android: Android Studio, Android SDK, JDK e Gradle configurados

## Demonstração em vídeo
[![Demonstração da Calculadora em Cordova](https://img.youtube.com/vi/BAoDviw08kY/hqdefault.jpg)](https://www.youtube.com/watch?v=BAoDviw08kY)

## Instalação

Instale o Cordova globalmente:

```bash
npm install -g cordova
```

Entre na pasta do projeto:

```bash
cd calculadora-cordova
```

Adicione a plataforma de navegador:

```bash
cordova platform add browser
```

Execute no navegador:

```bash
cordova run browser
```

## Rodar no Android

Adicione a plataforma Android:

```bash
cordova platform add android
```

Verifique os requisitos:

```bash
cordova requirements android
```

Compile o projeto:

```bash
cordova build android
```

Execute em um emulador ou celular conectado:

```bash
cordova run android
```

## Estrutura principal

```text
calculadora-cordova/
├── config.xml
├── package.json
├── README.md
└── www/
    ├── index.html
    ├── css/
    │   └── index.css
    └── js/
        └── index.js
```

## Equipe

- Evandro
- Gabriel Sarubi
- Matheus Mathias
