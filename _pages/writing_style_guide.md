---
title: Rapyuta Robotics Style Guide
author: Sachin
date: 2022-02-05
category: Jekyll
layout: post
---

## User Guide Formatting: Best Practices and Guidelines

This style guide provides guidelines for writing user guide documentation for Rapyuta Robotics. It aims to ensure consistency and readability across the documentation.

### Headings

- Use appropriate heading levels to structure the content.
- Use title case for all headings upto level 3
- Use sentence case for level 4 heading

-   1.  ==========  for title
    2.  ----------  for the second level
    3.  ~~~~~~~~~~  for the third  level
    4.  """"""""""  for the fourth level

- Example:

  ```
  Title
  =====

  Second Level
  ------------

  Third Level
  ~~~~~~~~~~~
 
  Fourth level
  """""""""""
  ```   

### Abbreviations and Acronyms

- Spell out abbreviations upon first mention, followed by the abbreviation in parentheses. 
- Use the abbreviation for subsequent mentions.

Example: "Rapyuta Robotics provides a Graphical User Interface (GUI) for easy navigation. The GUI offers various features..."


### Bold and Italics

- Use **bold** to highlight UI elements, buttons, menus selections, tabs, modal window. 
- Use *italics* when introducing new terms for the first time, page or screen names.
- When referring to a UI element, it is important to use the case as used in the actual user interface. 

### Code 

- Use `.. code-block::` directive to highlight and format code or command-line examples.
- Specify the language for syntax highlighting after the `::`.
- For example:
  
  ```
  ..  code-block:: json
      
      {
        "order_id": "20230101_order_data",
        "kind": "PICKING_WORKFLOW_ORDER_STATE",
        "data": {
          "state": "IN_PROGRESS",
          "prev_state": "ACCEPTED"
        },
        "created": "2023-01-01T00:00:00.000Z"
      }
  ```

### Inline Commands

Inline commands should be denoted by double backticks ``inline code here``.

For example:

```
Events may be retrieved using the ``GET /v1/events/`` API endpoint.
```

### Links (internal and external)

- Example for linking to sections within the same document:

  ```
  This example :ref:`Cross-References to Locations in the Same Document`.
  ```

- Example for linking custom link text:
 
  ```
  This example links to a different :ref:`custom text<Heading Text>` section.
  ```

- Example for external links:

  ```
  This example links to an `external web page <link URL>`_.
  ```

### Figures

When including figures or images in the documentation, follow these guidelines:
- Use a meaningful alt text for accessibility.
- Use sentence case for figure names.
- Example:

  ```
  .. figure:: path/to/figure.png
    :alt: Workflow Diagram
    :width: 400px

    Figure: Workflow Diagram
  ```

### Lists

#### Ordered Lists

- Use `#` for ordered lists.
- Use sentence case for lists.
- To be used to denote a series of steps or sequential items

#### Unordered Lists

- Use `-` for unordered lists.
- Use sentence case for lists.

### Notes/Cautions/Admonitions

- The `.. note::` shortcode is used to display a note to the reader.
- The `.. note::` shortcode should be follow this syntax (line space, tab space). For example, 
  
  ```
   .. note::
        This is note text. Use a note for information you want the user to
        pay particular attention to.
  ```

- The `.. admonition::` shortcode is used when you want to use custom note titles.
  
  ```
  .. admonition:: The one with the custom titles

    This is a custom note.
  ```

### Tables

When creating tables, follow these guidelines:

- Use the appropriate Markdown syntax for creating tables.
- Include a clear and concise caption above the table, using sentence case.
- Example:
  
  ```
  Table 1: Sample table

  | Column 1 | Column 2 |
  |----------|----------|
  | Data 1   | Data 2   |

  ```