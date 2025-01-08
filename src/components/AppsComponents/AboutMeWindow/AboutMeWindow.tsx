import { WindowTypes } from "../../../types/windowTypes";
import WindowComponent from "../../WindowComponent.tsx/WindowComponent";

function AboutMeWindow({item, onClose, onMinimize}: WindowTypes) {
  return (
    <WindowComponent item={item} onClose={onClose} onMinimize={onMinimize}>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col items-center justify-center w-11/12 h-5/6 bg-gray-800 rounded-lg">
            <h1 className="text-4xl font-bold text-gray-300">About Me</h1>
            <p className="text-gray-300">I'm a software developer with experience in frontend and backend technologies. I'm passionate about learning new things and I'm always looking for new challenges.</p>
          </div>
          <div className="flex flex-col items-center justify-center w-11/12 h-5/6 bg-gray-800 rounded-lg mt-4">
            <h1 className="text-4xl font-bold text-gray-300">Skills</h1>
            <ul className="text-gray-300">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
              <li>PostgreSQL</li>
              <li>Git</li>
              <li>GitHub</li>
              <li>GitLab</li>
              <li>Linux</li>
              <li>Windows</li>
              <li>MacOS</li>
              <li>Python</li>
              <li>Java</li>
              <li>C</li>
              <li>C++</li>
              <li>C#</li>
              <li>PHP</li>
              <li>SQL</li>
              <li>GraphQL</li>
              <li>REST</li>
              <li>APIs</li>
              <li>JSON</li>
              <li>XML</li>
              <li>YAML</li>
              <li>Markdown</li>
              <li>VS Code</li>
              <li>Visual Studio</li>
              <li>IntelliJ IDEA</li>
              <li>PyCharm</li>
              <li>WebStorm</li>
              <li>Postman</li>
              <li>Insomnia</li>
              <li>Linux Terminal</li>

            </ul>
            </div>
             
        </div>

    </WindowComponent>
  );
}

export default AboutMeWindow;