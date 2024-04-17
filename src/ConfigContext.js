import { createContext, useContext, useReducer } from "react";
import { useImmerReducer } from "use-immer";
const ConfigContext = createContext(null);
import { nanoid } from "nanoid";
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
    // backup_file
    case "changed_backup_file": {
      Config.backup_file = action.value;
      return;
    }

    // translation_file
    case "changed_translation_file": {
      Config.translation_file = action.value;
      return;
    }

    // auto_new_line
    case "changed_auto_new_line": {
      Config.auto_new_line = action.value;
      return;
    }

    // blacklist
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

    // execute
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

    // delete_lines
    case "added_delete_lines": {
      Config.delete_lines.push(action.value);
      return;
    }
    case "edited_delete_lines": {
      Config.delete_lines[action.index] = action.value;
      return;
    }
    case "deleted_delete_lines": {
      Config.delete_lines.splice(action.index, 1);
      return;
    }

    // disable_group
    case "added_disable_group": {
      Config.disable_group.push(action.value);
      return;
    }
    case "edited_disable_group": {
      Config.disable_group[action.index] = action.value;
      return;
    }
    case "deleted_disable_group": {
      Config.disable_group.splice(action.index, 1);
      return;
    }

    // wrap_text_pre
    case "added_wrap_text_pre": {
      Config.wrap_text_pre.push(action.value);
      return;
    }
    case "edited_wrap_text_pre": {
      Config.wrap_text_pre[action.index] = action.value;
      return;
    }
    case "deleted_wrap_text_pre": {
      Config.wrap_text_pre.splice(action.index, 1);
      return;
    }

    // wrap_text_post
    case "added_wrap_text_post": {
      Config.wrap_text_post.push(action.value);
      return;
    }
    case "edited_wrap_text_post": {
      Config.wrap_text_post[action.index] = action.value;
      return;
    }
    case "deleted_wrap_text_post": {
      Config.wrap_text_post.splice(action.index, 1);
      return;
    }

    // replace_words
    case "added_replace_words": {
      Config.replace_words[action.value1] = action.value2;
      return;
    }
    case "edited_replace_words": {
      // bug: if action.value1 changes, then a new entry is created instead of editing
      //Config.replace_words[action.value1] = action.value2;
      // fix
      const keys = Object.keys(Config.replace_words);
      const oldentry = keys[action.index];
      delete Config.replace_words[oldentry];
      // order changes as it is re-entered
      Config.replace_words[action.value1] = action.value2;

      return;
    }
    case "deleted_replace_words": {
      delete Config.replace_words[action.value1];
      return;
    }
    case "added_replace_words2": {
      Config.replace_words2[action.value1] = action.value2;
      return;
    }
    case "edited_replace_words2": {
      Config.replace_words2[action.value1] = action.value2;
      return;
    }
    case "deleted_replace_words2": {
      Config.replace_words2.splice(action.index, 1);
      return;
    }

    // translation
    // group
    case "changed_group": {
      Config.translations[action.index].group = action.value;
      return;
    }
    // print
    case "changed_print": {
      Config.translations[action.index].print = action.value;
      return;
    }
    // patterns
    case "added_patterns": {
      Config.translations[action.tr_index].patterns.push(action.value);
      return;
    }
    case "edited_patterns": {
      Config.translations[action.tr_index].patterns[action.index] =
        action.value;
      return;
    }
    case "deleted_patterns": {
      Config.translations[action.tr_index].patterns.splice(action.index, 1);
      return;
    }
    // enabled
    case "changed_tr_enabled": {
      Config.translations[action.tr_index].enabled = action.value;
      return;
    }
    // duplicates
    case "changed_tr_duplicates": {
      Config.translations[action.tr_index].duplicates = action.value;
      return;
    }

    // variables
    case "added_variables": {
      Config.translations[action.tr_index].variables.push({
        startswith: action.value1,
        endswith: action.value2,
      });
      return;
    }
    case "edited_variables": {
      Config.translations[action.tr_index].variables[action.index] = {
        startswith: action.value1,
        endswith: action.value2,
      };
      return;
    }
    case "deleted_variables": {
      Config.translations[action.tr_index].variables.splice(action.index, 1);
      return;
    }
    // json
    case "edited_json_config": {
      try {
        let json = JSON.parse(action.json);
        // Translations
        Config.translations = json.translations ?? initialConfig.translations;
        // More
        Config.wrap_text_pre =
          json.wrap_text_pre ?? initialConfig.wrap_text_pre;
        Config.wrap_text_post =
          json.wrap_text_post ?? initialConfig.wrap_text_post;
        Config.auto_new_line =
          json.auto_new_line ?? initialConfig.auto_new_line;
        // Filters
        Config.blacklist = json.blacklist ?? initialConfig.blacklist;
        Config.disable_group =
          json.disable_group ?? initialConfig.disable_group;
        // File Modifiers
        Config.delete_lines = json.delete_lines ?? initialConfig.delete_lines;
        Config.replace_words =
          json.replace_words ?? initialConfig.replace_words;
        Config.backup_file = json.backup_file ?? initialConfig.backup_file;
        // Paths
        Config.translation_file =
          json.translation_file ?? initialConfig.translation_file;
        Config.execute = json.execute ?? initialConfig.execute;
        Config.hash = nanoid();
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
  translations: [
    {
      group: "Group Name",
      print: "A -> B: C",
      patterns: ["a", "b"],
      variables: [
        { startswith: "a", endswith: "b" },
        { startswith: "a", endswith: "b" },
      ],
      enabled: true,
      duplicates: "count_continuous",
    },
  ],
  backup_file:
    "${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.original",
  execute: [
    'java -DPLANTUML_LIMIT_SIZE=32768 -jar ${exeDirname}/plantuml/plantuml.jar -tpng "${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.txt"',
    '"${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.png"',
  ],
  translation_file:
    "${fileDirname}/generated_${fileBasenameNoExtension}/${fileBasename}.txt",
  blacklist: ["check1", "check2"],
  disable_group: [],
  delete_lines: [],
  auto_new_line: true,
  replace_words: {
    search: "replace",
    search2: "replace2",
  },
  wrap_text_pre: ["@startuml"],
  wrap_text_post: ["@enduml"],
};
