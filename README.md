# Seletiva Cabense 2025

Projeto para inscrição de candidatos, com envio de formulário e arquivo anexo por e-mail utilizando Resend.

## Tecnologias utilizadas

* HTML5 + CSS3
* Node.js (Express.js)
* Resend (serviço de e-mail)
* Multer (upload de arquivos)
* Dotenv (variáveis de ambiente)
* CORS

## Pré-requisitos

* Node.js instalado
* Conta criada no [Resend](https://resend.com) com chave de API gerada

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seletiva-cabense-2025.git
```

2. Acesse a pasta do projeto:

```bash
cd seletiva-cabense-2025
```

3. Instale as dependências:

```bash
npm install
```

4. Crie o arquivo `.env` na raiz do projeto e adicione sua chave do Resend:

```
RESEND_API_KEY=sua-chave-aqui
```

## Como rodar o projeto

Existem dois servidores:

* **Servidor Node (API de envio de formulário)**:

```bash
npm run dev
```

(ou alternativamente:)

```bash
node api/server.js
```

* **Servidor estático (para abrir o site)**:

Abra o arquivo `index.html` diretamente no navegador.
Ou utilize uma extensão como "Live Server" no VSCode apenas para o front-end.

> 🔋 Importante: Front-end deve enviar formulário para `http://localhost:3000/enviar-formulario`.

## Estrutura de pastas

seletiva-cabense-2025/
🗁 api/
    └️ server.js
🗁 public/
    🗁 assets/
        🗁 css/
            └️ style.css
        🗁 files/
            └️ seletiva-cabense-formulario.docx
        🗁 images/
            └️ tutorial-cabense.png
        🗁 js/
            └️ main.js
    └️ index.html
🗋 .env
🗋 package.json
🗋 README.md

## Funcionalidades

* Formulário para nome, e-mail e anexo de arquivo.
* Envio automático do formulário por e-mail via Resend.
* Proteção de CORS habilitada para todas as origens.
* Upload seguro de arquivos com multer.

## Melhorias futuras

* Validação adicional de formatos de arquivo.
* Feedback visual após envio bem-sucedido.
* Integração de banco de dados para armazenar as inscrições.

## Licença

Este projeto está licenciado sob a licença MIT.

---

Desenvolvido por Caio Victor.
