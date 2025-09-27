# Gerador de Documentos Automáticos (Node.js + Puppeteer)

Este projeto permite **gerar contratos, relatórios e PDFs dinâmicos** a partir de **templates HTML/EJS** e dados fornecidos em JSON.  
A renderização é feita via **Puppeteer** (Chromium headless), garantindo qualidade profissional para impressão ou assinatura.

---

##  Funcionalidades
-  **Templates dinâmicos** em EJS para contratos, relatórios e outros documentos.
-  **Geração de PDFs** de alta qualidade (A4, com margens e estilos configuráveis).
-  **CLI** para uso rápido via terminal.
-  **API HTTP (Express)** para integração com outros sistemas.
-  **Dockerfile** pronto para deploy em containers.
-  **CI com GitHub Actions** para testes automáticos.

---

## Arquitetura do Projeto
O fluxo é simples:  
1. O usuário chama a **CLI** ou a **API**.  
2. Os **dados JSON** são injetados no **template EJS**.  
3. O **Puppeteer** renderiza o HTML e exporta em PDF.  
4. O PDF é retornado via **download** ou salvo em disco.

```mermaid
flowchart LR
  A[Usuário / CLI / API] --> B[Template Renderer (EJS)]
  B --> C[PDF Generator (Puppeteer)]
  C --> D[Armazenamento (Local / S3)]
  C --> E[Resposta - Download/Stream]
````

---

## Estrutura de Diretórios

```
gerador-pdfs/
├─ src/
│  ├─ services/
│  │  └─ pdfGenerator.js
│  ├─ templates/
│  │  └─ contract.ejs
│  ├─ cli.js
│  └─ server.js
├─ data/
│  └─ sample-contract.json
├─ Dockerfile
└─ package.json
```

---

## Instalação e Configuração

### Pré-requisitos

* [Node.js 18+](https://nodejs.org/)
* [Git](https://git-scm.com/)
* (Opcional) [Docker](https://www.docker.com/)

### Clonando o repositório

```bash
git clone https://github.com/seu-usuario/gerador-pdfs.git
cd gerador-pdfs
```

### Instalando dependências

```bash
npm install
```

---

## Uso

### Rodando a API

```bash
npm run dev
```

Servidor disponível em: `http://localhost:3000`

#### Exemplo de requisição

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "template":"contract",
    "data": {
      "companyName":"ACME LTDA",
      "clientName":"João da Silva",
      "clientCpf":"000.000.000-00",
      "contractNumber":"2025-0001",
      "contractDate":"2025-09-27",
      "bodyHtml":"<p>Este contrato estabelece as condições ...</p>"
    }
  }' --output contrato.pdf
```

### Usando a CLI

```bash
node src/cli.js -t contract -d data/sample-contract.json -o contrato.pdf
```

---

## Uso com Docker

```bash
docker build -t gerador-pdfs .
docker run -p 3000:3000 gerador-pdfs
```

---

## Testes

Os testes usam [Jest](https://jestjs.io/).

```bash
npm test
```
