import {
  AdmonitionDirectiveDescriptor,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  KitchenSinkToolbar,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  SandpackConfig,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState } from "react";
import { WindowTypes } from "../../../types/windowTypes";
import WindowComponent from "../../WindowComponent.tsx/WindowComponent";
import "./EducationWindow.css";

function EducationWindow({ item, onClose, onMinimize }: WindowTypes) {
  const [colorTheme, setColorTheme] = useState<"light" | "dark">("light");

  const defaultSnippetContent = `
  export default function App() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
  `.trim();

  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: "react",
    presets: [
      {
        label: "React",
        name: "react",
        meta: "live react",
        sandpackTemplate: "react",
        sandpackTheme: colorTheme,
        snippetFileName: "/App.js",
        snippetLanguage: "jsx",
        initialSnippetContent: defaultSnippetContent,
      },
    ],
  };

  const educationMarkdown = `
## Educación

### **Ingeniería Civil en Informática 🧑‍💻**



> <img height="107" width="209" alt="UA Logo" title="Logo de la Universidad Autónoma de Chile" src="https://www.uautonoma.cl/content/themes/universidad-autonoma-theme/dist/images/global/logo.svg" />

**Universidad Autónoma de Chile 🎓**

> *Período: 2019 - 2024*

* Egresado con sólidos conocimientos en desarrollo de software, bases de datos y metodologías ágiles.
* Participación activa en proyectos universitarios, asumiendo roles clave como Product Owner y Jefe de Frontend.



### **Técnico en Telecomunicaciones 📡**

> ![CPM Logo](https://www.patriciomekis.cl/wp-content/uploads/2019/05/Insignia-a-Color.png "Logo del Colegio Patricio Mekis")

**Colegio Patricio Mekis 🎒**

> *Período: 2018*

* Formación técnica enfocada en sistemas de comunicación y tecnología aplicada.
* Desarrollé una base sólida en análisis técnico y resolución de problemas tecnológicos.

### **Certificación: Creación de Sitios Web con WordPress**&#x20;

**Cursos Online UA**
*Año: 2021*

* Complemento formativo que refuerza habilidades en diseño y desarrollo web utilizando WordPress.
  `


  const toggleColorTheme = () => {
    setColorTheme(colorTheme === "light" ? "dark" : "light");
  };

  return (
    <WindowComponent
      item={item}
      onClose={onClose}
      onMinimize={onMinimize}
      className={` rounded-lg ${
        colorTheme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="px-4 w-full h-full min-w">
        <MDXEditor
          markdown={educationMarkdown}
          className={colorTheme === "dark" ? "dark-theme dark-editor" : ""}
          contentEditableClassName={`
            ${
              colorTheme === "light"
                ? "bg-white text-black prose-headings:text-black prose-strong:text-black prose-blockquote:text-black prose-blockquote:border-gray-300"
                : ""
            }
          max-w-none min-h-screen text-lg px-8 py-5 caret-yellow-500 
          prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 
          prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 
          prose-code:before:content-[''] prose-code:after:content-['']
          `}
          spellCheck={false}
          onChange={console.log}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            imagePlugin(),
            tablePlugin(),
            thematicBreakPlugin(),
            frontmatterPlugin(),
            codeBlockPlugin({
              defaultCodeBlockLanguage: "js",
            }),
            sandpackPlugin({
              sandpackConfig: simpleSandpackConfig,
            }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                css: "CSS",
                txt: "text",
                tsx: "TypeScript",
              },
            }),
            directivesPlugin({directiveDescriptors:[AdmonitionDirectiveDescriptor]}),
            diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
            markdownShortcutPlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <KitchenSinkToolbar />
                  <button
                    className={`flex items-center p-1 rounded ${
                      colorTheme === "light"
                        ? "hover:bg-[#e0e1e6]"
                        : "hover:bg-[#323035]"
                    } mx-3`}
                    onClick={toggleColorTheme}
                  >
                    {colorTheme === "light" ? (
                      <img
                        src="https://img.icons8.com/?size=50&id=82718&format=png&color=000000"
                        alt="Sun icon"
                        className="h-5"
                      />
                    ) : (
                      <img
                        src="https://img.icons8.com/?size=50&id=nFyQsDayBOW1&format=png&color=ffffff"
                        alt="Moon icon"
                        className="h-5"
                      />
                    )}
                  </button>
                </>
              ),
            }),
          ]}

        />
      </div>
    </WindowComponent>
  );
}

export default EducationWindow;
