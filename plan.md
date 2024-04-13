# Plan

## UI

- Paths
  - backup_file
  - translation_file
  - execute
- File Manipulation
  - replace_words
  - delete_lines
- Filters
  - disable_group
  - blacklist
- Translations
  - translations
  - pair
  - wrap
  - auto
- Json

## Events


## UI

- Paths
  - backup_file
  - translation_file
  - execute
- File Manipulation
  - replace_words
  - delete_lines
- Filters
  - disable_group
  - blacklist
- Translations
  - translations
  - pair
  - wrap
  - auto
- Json
  - onJsonUpdate


## Fields

- backup_file
  - Label and Input <https://mui.com/material-ui/react-text-field/>
- translation_file
  - Label and Input
- execute
  - String List

- replace_words
  - List of Map
- delete_lines
  - String List

- disable_group
  - String List / Autocomplete checkboxes <https://mui.com/material-ui/react-autocomplete/#checkboxes>
- blacklist
  - String List
- translations
  - List of Translation
    - Group
      - Label and Input
    - Patterns
      - String List
    - Print
      - Label and Input
    - Variables
      - List of Variable
        - Starts with
        - Ends with
    - Enable
      - Yes/No <https://mui.com/material-ui/react-checkbox/>
      - <https://mui.com/material-ui/react-switch/>
- pair
- wrap_text_post
  - Label and TextField
- wrap_text_pre
  - Label and TextField
- auto_new_line
  - Yes/No

Add Button - <https://mui.com/material-ui/react-floating-action-button/>

## Technology

React Material > webpack

<https://github.com/krishheii/ReactAppToHtml>

<https://mui.com/material-ui/getting-started/>

<https://react-bootstrap.netlify.app/docs/layout/grid>

- [x] Create project
- [x] install dependencies
- [x run `yarn start`
- [x] run `yarn build`
- [x] run html in build directory
  - [x] an additional slash in scripts tag is breaking html load
    - [x] <https://medium.com/@ns-tech-learn/how-to-install-webpack-and-configure-in-react-js-88b4b0bd0af9>
    - [x] <https://www.youtube.com/watch?v=F0ep7CTn5K8>
- [x] Explore more on the UI components available from Material
- [ ] Take screenshots of components and design the wireframe
- [ ] Implement the wireframe in the project
- [ ] Check yarn build once more for any braking changes
- [ ] Write logic to show the json contents for basic input fields
  - [ ] Read react
    - [ ] Props are immutable, so you need states as global
    - [ ] Keys are important for data
    - [ ] When state gets updated, the components are re-rendered
    - [ ] dataStore state at the app level
    - [ ] treat any JavaScript object that you put into state as read-only.
    - [ ] Passing data deeply with context
  - [ ] When json is updated update all the fields
  - [ ] Have a global class to manage data store
  - [ ] When a field changes directly update the data store
  - [ ] Update JSON when the data store gets updated
- [ ] Continue further only if json contents are capturable