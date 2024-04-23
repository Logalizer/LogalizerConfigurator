import React from "react";
import Typography from "@mui/material/Typography";
import ReactDOM from "react-dom";
import Markdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";

SyntaxHighlighter.registerLanguage("json", json);

const markdown = `
## 1. Basic Sequence

In this example, we want to capture the conversation between Alice and Bob. Whenever Alice says "Hello Bob", we want to draw a sequnce from Alice to Bob like this \`Alice -> Bob: Hello\`

#### Input

~~~
Alice saw Bob and said "Hello Bob"
~~~

#### Output

~~~
Alice -> Bob: Hello
~~~

#### Configuration
~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Hello Bob"],
    },
  ],
}
~~~

## 2. Multiple Matches

Input file typically consists of multiple lines and multiple different inputs. Let's see another example where the same pattern occurs in multiple lines.

With the same configuration from previous example,

#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Hello Bob"],
    },
  ],
}
~~~

#### Input

~~~
Alice saw Bob and said "Hello Bob"
A few hours later
Alice called Bob on his phone and said "Hello Bob"
~~~

#### Output

~~~
Alice -> Bob: Hello
Alice -> Bob: Hello
~~~

Since the same pattern \`Hello Bob\` matches on couple of lines, the same output is printed twice.

Consider another input where there is a problem with the output.

#### Input

~~~
Alice saw Bob and said "Hello Bob"
A few hours later
Alice called Bob on his phone and said "Hello Bob"
Jack called Bob on his phone and said "Hello Bob"
~~~

#### Output

~~~
Alice -> Bob: Hello
Alice -> Bob: Hello
Alice -> Bob: Hello
~~~

Here the third print is incorrect. It should have been \`Jack -> Bob: Hello\`. We will fix this in the next section.

## 3. Multiple Patterns

Patterns takes a list of strings. With multiple patterns we get finer control.
It is ensured that we print only if all the patterns are matching.

#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Alice", "Hello Bob"],
    },
  ],
}
~~~

#### Input

~~~
Alice saw Bob and said "Hello Bob"
A few hours later
Alice called Bob on his phone and said "Hello Bob"
Jack called Bob on his phone and said "Hello Bob"
~~~

#### Output

~~~
Alice -> Bob: Hello
Alice -> Bob: Hello
~~~


## 4. Capturing Variables

Let's say Alice greets with Hi and Hello interchangeabily. So what we can do is to have two translations. 

#### Configuration (Bad)

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Alice", "Hello Bob"],
    },
    {
      print: "Alice -> Bob: Hi",
      patterns: ["Alice", "Hi Bob"],
    }
  ]
}
~~~

#### Input

~~~
Alice saw Bob and said "Hello Bob"
A few hours later
Alice called Bob on his phone and said "Hi Bob"
~~~

#### Output

~~~
Alice -> Bob: Hello
Alice -> Bob: Hi
~~~

Though this works, but it is not optimal and doesn't scale well. So we use variables to capture Hi/Hello.


#### Configuration (Good)

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: \${1}",
      patterns: ["Alice", "Bob", "and said"],
      variables: [
        {
          startswith: "\\"",
          endswith: " Bob"
        }
      ]
    }
  ]
}
~~~

Here the placeholder '\${1}' indicates the value of the variable that is captured. In our case we expect \${1} to contain Hi or Hello.

To indicate that we want to capture Hi or Hello we must configure the position where the value comes.

In the input our variable (Hi or Hello) comes after \" and before ' Bob'. In other words, we capture what starts with a \" and ends with ' Bob'. 

We escape the double quote with backslash for avoiding syntax errors. 

#### Input

~~~
Alice saw Bob and said "Hello Bob"
A few hours later
Alice called Bob on his phone and said "Hi Bob"
~~~

#### Output

~~~
Alice -> Bob: Hello
Alice -> Bob: Hi
~~~

#### Summary

Values are captured in \${1}, \${2}, \${3} and so on. You can capture multiple variables as it is a list. 

Variables are configured based on their surronding starting and ending text.

### 4.1. Automatic Variable Print

We can omit the placeholder '\${1}'. When we omit, the values are appended to the print in paranthesis. 

#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Says",
      patterns: ["Alice", "Bob", "and said"],
      variables: [
        {
          startswith: "\\"",
          endswith: " Bob"
        }
      ]
    }
  ]
}
~~~

#### Input

~~~
Alice saw Bob and said "Hello Bob"
A few hours later
Alice called Bob on his phone and said "Hi Bob"
~~~

#### Output

~~~
Alice -> Bob: Says(Hello)
Alice -> Bob: Says(Hi)
~~~

### 4.2. Variables At The Beginings or Ends

It might happen that the variables comes at the begining or end of a line.

For the below input, lets say we want to capture the time and greeting message (Hello or Hi).
Notice that the variables are not fully surrounded by start and end text, as it appear at the begining or end of the lines.

~~~
10:00 AM: Alice saw Bob and said Hello
A few hours later
2:00 PM: Alice called Bob on his phone and said Hi
~~~

#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Says \${2} at \${1}",
      patterns: ["Alice", "Bob", "and said"],
      variables: [
        {
          startswith: "",
          endswith: ": "
        }
        {
          startswith: "said ",
          endswith: ""
        }
      ]
    }
  ]
}
~~~


#### Input

~~~
10:00 AM: Alice saw Bob and said Hello
A few hours later
2:00 PM: Alice called Bob on his phone and said Hi
~~~

#### Output

~~~
Alice -> Bob: Says Hello at 10:00 AM
Alice -> Bob: Says Hi at 2:00 PM
~~~

#### Summary

If the variable comes at the begining of a line then you leave startswith as empty.
If the variable comes at the end of a line then you leave endswith as empty.


You can configure to capture multiple variables. Did you notice that?

### 4.3 Multiple Variables and No Placeholders

Do you remember that we do not have to configure the placeholders like \${1}, \${2}?

In this example we will configure multiple variables and omit placeholders. 

#### Configuration 


~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Says",
      patterns: ["Alice", "Bob", "and said"],
      variables: [
        {
          startswith: "",
          endswith: ": "
        }
        {
          startswith: "said ",
          endswith: ""
        }
      ]
    }
  ]
}
~~~
 

#### Input

~~~
10:00 AM: Alice saw Bob and said Hello
A few hours later
2:00 PM: Alice called Bob on his phone and said Hi
~~~

#### Output

~~~
Alice -> Bob: Says(10:00 AM, Hello)
Alice -> Bob: Says(2:00 PM, Hi)
~~~

You can see that the values are captured in paranthesis separated by comma.

## 5. Disable Translations

There are different ways to disable translations.

### 5.1. Disable Indivudual Translation

As your configurations grow you might want to disable certain translation. 
You can set enabled as false. The default value of enabled is true, so you don't have to set it explicitly. 

#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Alice", "Bob"],
      enabled: false
      ]
    },
    {
      print: "Jack -> Bob: Hello",
      patterns: ["Jack", "Bob"]
      ]
    }
  ]
}
~~~

#### Input

~~~
Alice saw Bob and said Hello
Alice called Bob on his phone and said Hello
Jack called Bob on his phone and said Hello
~~~

#### Output

~~~
Jack -> Bob: Hello
~~~


### 5.2. Disable a Group of Translations

As your configurations grow you might want to disable a group of translations.  
You are not interested in any greetings any more. This is when group comes in handy. 

#### Configuration

~~~json
{
  translations: [
    {
      group: "Greetings",
      print: "Alice -> Bob: Hello",
      patterns: ["Alice", "Bob"]
      ]
    },
    {
      group: "Greetings",
      print: "Jack -> Bob: Hello",
      patterns: ["Jack", "Bob"]
      ]
    },
    {
      group: "Important",
      print: "Alice -> Bob: Important Message",
      patterns: ["Alice", "Bob", "important"]
      ]
    },
  ],
  disable_group: [
    "Gretings"
  ]
}
~~~

Note that disable_group is a list, so you can disable multiple such groups. 

#### Input

~~~
Alice saw Bob and said Hello
Alice called Bob on his phone and said Hello
Jack called Bob on his phone and said Hello
Alice sends an important message to Bob
~~~

#### Output

~~~
Alice -> Bob: Important Message
~~~

### 5.3. Selective Disable by Blacklist 


In somecases you might want to translate but ignore some variants of input lines.

This is done by selectively blacklist an input line so it is not considered for translation.


#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Alice", "Bob", "said"]
      ]
    },
    {
      print: "Jack -> Bob: Hello",
      patterns: ["Jack", "Bob"]
    ]
  }
],
blacklist: [
  "Jack called Bob"
]
}
~~~

To configure a blacklist you specify the pattern, here in this case you want to ignore all lines containing "Jack called Bob".

Note that blacklist is a list, so you can blacklist multiple input lines. 

#### Input

~~~
Alice saw Bob and said Hello
Alice called Bob on his phone and said Hello
Jack called Bob on his phone and said Hello
Jack saw Bob and said Hello
~~~

#### Output

~~~
Alice -> Bob: Hello
Alice -> Bob: Hello
Jack -> Bob: Hello
~~~

## 6. Handling duplicates

In logs, it is typical to see multiple lines repeating. In some cases, it may mean something. In other cases it may just be a meaningless repetition. 

Based on situtation we might have to configure differently.

### 6.1. Removing All Duplicates

Let's say we do not want to see any repetition.


#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Alice", "Bob"],
      duplicates: "remove_all"
      ]
    },
    {
      print: "Jack -> Bob: Hello",
      patterns: ["Jack", "Bob"]
      ]
    }
  ]
}
~~~

By default duplicates are allowed. So \`duplicates: "allowed"\` is set by default. 

#### Input

~~~
Alice saw Bob and said Hello
Jack called Bob on his phone and said Hello
Alice called Bob on his phone and said Hello
Jack saw Bob and said Hello
Alice called Bob on his phone and said Hello
~~~

#### Output

~~~
Alice -> Bob: Hello
Jack -> Bob: Hello
Jack -> Bob: Hello
~~~

Note that \`Alice -> Bob: Hello\`, occurs only once at the first occurrance, all the later occurances are duplicates and are removed. 

If \`duplicates: "remove_all"\`, was not configured, then the output would look like this,

~~~
Alice -> Bob: Hello
Jack -> Bob: Hello
Alice -> Bob: Hello
Jack -> Bob: Hello
Alice -> Bob: Hello
~~~


### 6.2. Removing Continuous Duplicates

Let's say we do not want to see any repetition that occurs back to back. 


#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello",
      patterns: ["Alice", "Bob"],
      duplicates: "remove_continuous"
      ]
    },
    {
      print: "Jack -> Bob: Hello",
      patterns: ["Jack", "Bob"]
      ]
    }
  ]
}
~~~

#### Input

~~~
Alice saw Bob and said Hello
Alice called Bob on his phone and said Hello
Jack called Bob on his phone and said Hello
Jack saw Bob and said Hello
Alice called Bob on his phone and said Hello
~~~

#### Output

~~~
Alice -> Bob: Hello
Jack -> Bob: Hello
Jack -> Bob: Hello
Alice -> Bob: Hello
~~~

Only back to back occurances of \`Alice -> Bob: Hello\` was removed.

If \`duplicates: "remove_continuous"\`, was not configured, then the output would look like this,

~~~
Alice -> Bob: Hello
Alice -> Bob: Hello
Jack -> Bob: Hello
Jack -> Bob: Hello
Alice -> Bob: Hello
~~~



### 6.3. Counting Duplicates

Let's say we want to count all the repetitions and print the count instead of repeating the prints. 


#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello (Occurrences: \${count} times)",
      patterns: ["Alice", "Bob"],
      duplicates: "count_all"
      ]
    },
    {
      print: "Jack -> Bob: Hello",
      patterns: ["Jack", "Bob"]
      ]
    }
  ]
}
~~~

#### Input

~~~
Alice saw Bob and said Hello
Alice called Bob on his phone and said Hello
Jack called Bob on his phone and said Hello
Jack saw Bob and said Hello
Alice called Bob on his phone and said Hello
~~~

#### Output

~~~
Alice -> Bob: Hello (Occurrences: 3 times)
Jack -> Bob: Hello
Jack -> Bob: Hello
~~~


### 6.4. Counting Continuous Duplicates

Let's say we want to count all the continuously occrring repetitions and print the count. 


#### Configuration

~~~json
{
  translations: [
    {
      print: "Alice -> Bob: Hello (Occurrences: \${count} times)",
      patterns: ["Alice", "Bob"],
      duplicates: "count_continuous"
      ]
    },
    {
      print: "Jack -> Bob: Hello",
      patterns: ["Jack", "Bob"]
      ]
    }
  ]
}
~~~

#### Input

~~~
Alice saw Bob and said Hello
Alice called Bob on his phone and said Hello
Jack called Bob on his phone and said Hello
Jack saw Bob and said Hello
Alice called Bob on his phone and said Hello
~~~

#### Output

~~~
Alice -> Bob: Hello (Occurrences: 2 times)
Jack -> Bob: Hello
Jack -> Bob: Hello
Alice -> Bob: Hello (Occurrences: 1 times)
~~~


`;

export default function HelpPane() {
  return (
    <Markdown
      children={markdown}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={materialOceanic}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
