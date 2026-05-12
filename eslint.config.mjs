// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import nextVitals from "eslint-config-next/core-web-vitals";

const accentRules = [
  { plain: /\bacao\b/giu, accented: "ação" },
  { plain: /\barea\b/giu, accented: "área" },
  { plain: /\bavaliacao\b/giu, accented: "avaliação" },
  { plain: /\bconfiguracoes\b/giu, accented: "configurações" },
  { plain: /\bconteudo\b/giu, accented: "conteúdo" },
  { plain: /\bdocumentacao\b/giu, accented: "documentação" },
  { plain: /\bgestao\b/giu, accented: "gestão" },
  { plain: /\bintegracao\b/giu, accented: "integração" },
  { plain: /\bmatricula\b/giu, accented: "matrícula" },
  { plain: /\bmodulo\b/giu, accented: "módulo" },
  { plain: /\bnavegacao\b/giu, accented: "navegação" },
  { plain: /\bobrigatorio\b/giu, accented: "obrigatório" },
  { plain: /\bopcao\b/giu, accented: "opção" },
  { plain: /\bpagina\b/giu, accented: "página" },
  { plain: /\bpresencas\b/giu, accented: "presenças" },
  { plain: /\brevisao\b/giu, accented: "revisão" },
  { plain: /\bselecao\b/giu, accented: "seleção" },
  { plain: /\bvalido\b/giu, accented: "válido" },
  { plain: /\bvisao\b/giu, accented: "visão" },
];

const ptAccentuationRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Evita termos em PT-BR sem acentuação nos textos da interface.",
    },
    messages: {
      missingAccent: "Use '{{accented}}' em vez de '{{plain}}'.",
    },
    schema: [],
  },
  create(context) {
    const checkText = (node, text) => {
      if (typeof text !== "string") return;

      for (const { plain, accented } of accentRules) {
        plain.lastIndex = 0;
        const match = plain.exec(text);
        if (!match) continue;

        context.report({
          node,
          messageId: "missingAccent",
          data: {
            accented,
            plain: match[0],
          },
        });
      }
    };

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkText(node, node.value);
        }
      },
      JSXText(node) {
        checkText(node, node.value);
      },
      TemplateElement(node) {
        checkText(node, node.value?.raw);
      },
    };
  },
};

const eslintConfig = [
  ...nextVitals,
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      locale: {
        rules: {
          "pt-accentuation": ptAccentuationRule,
        },
      },
    },
    rules: {
      "locale/pt-accentuation": "error",
    },
  },
];

export default eslintConfig;
