# EnE - Economia nas Escolas

Site do projeto de extensão Economia nas Escolas, do Instituto de Economia da Unicamp.

O objetivo do projeto é aproximar estudantes da educação básica de temas econômicos e da universidade pública. Esta primeira versão do site reúne a apresentação do EnE, áreas de atuação, equipes, eventos, produtos e informações para escolas interessadas em receber o projeto.

## Estado atual

O site institucional está publicado no Cloudflare Pages:

https://ene-unicamp.pages.dev

O painel de gestão ainda está em desenvolvimento e permanece indisponível na versão pública. A interface inicial está no código, mas a autenticação e a persistência de dados precisam ser configuradas antes da liberação.

## Tecnologias

- React
- TypeScript
- Vite
- Vinext
- Cloudflare Pages

## Como executar

É necessário ter Node.js 22 ou mais recente instalado.

```bash
npm install
npm run dev
```

Para gerar a versão usada no Cloudflare Pages:

```bash
npm run build:pages
```

Os arquivos finais são gerados na pasta `pages-dist`.

## Estrutura principal

- `app/page.tsx`: página pública do projeto
- `app/gestao/page.tsx`: protótipo do painel de gestão
- `app/globals.css`: estilos e responsividade
- `public/`: logos e arquivos institucionais
- `pages/`: entradas da versão estática publicada no Pages

## Observações

Credenciais, tokens, listas de usuários e outras informações privadas não devem ser adicionadas ao repositório. O acesso ao futuro painel de gestão será configurado separadamente na infraestrutura.

Os conteúdos de Equipes e Eventos ainda são provisórios. Fotos e informações definitivas serão incluídas conforme forem aprovadas pelo projeto.
