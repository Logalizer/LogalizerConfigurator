import { createContext, useContext, useReducer } from "react";
import { useImmerReducer } from "use-immer";
const ConfigContext = createContext(null);

const ConfigDispatchContext = createContext(null);

export function ConfigProvider({ children }) {
  const [Config, dispatch] = useImmerReducer(ConfigReducer, initialConfig);

  return (
    <ConfigContext.Provider value={Config}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}

export function useConfigDispatch() {
  return useContext(ConfigDispatchContext);
}

function ConfigReducer(Config, action) {
  switch (action.type) {
    case "changed_backup_file": {
      Config.backup_file = action.value;
      return;
    }
    case "changed_translation_file": {
      Config.translation_file = action.value;
      return;
    }
    case "changed_auto_new_line": {
      Config.auto_new_line = action.value;
      return;
    }
    case "added_blacklist": {
      Config.blacklist.push(action.value);
      return;
    }
    case "edited_blacklist": {
      Config.blacklist[action.index] = action.value;
      return;
    }
    case "deleted_blacklist": {
      Config.blacklist.splice(action.index, 1);
      return;
    }
    case "added_execute": {
      Config.execute.push(action.value);
      return;
    }
    case "edited_execute": {
      Config.execute[action.index] = action.value;
      return;
    }
    case "deleted_execute": {
      Config.execute.splice(action.index, 1);
      return;
    }
    case "edited_json_config": {
      try {
        console.log(action.json);
        let json = JSON.parse(action.json);
        Config.backup_file = json.backup_file ?? initialConfig.backup_file;
        Config.translation_file =
          json.translation_file ?? initialConfig.translation_file;
        Config.auto_new_line =
          json.auto_new_line ?? initialConfig.auto_new_line;
        Config.blacklist = json.blacklist ?? initialConfig.blacklist;
        Config = structuredClone(json);
      } catch (error) {
        alert(error);
      }
      return;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialConfig = {
  backup_file:
    "${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.original",
  execute: [
    'java -DPLANTUML_LIMIT_SIZE=32768 -jar ${exeDirname}/plantuml/plantuml.jar -tpng "${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.txt"',
    '"${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.png"',
  ],
  translation_file:
    "${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.txt",
  blacklist: ["check1", "check2"],
  auto_new_line: true,
};
