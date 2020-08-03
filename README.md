# TypeScript Learning

This repository records my notes and practicing projects in learning TypeScript.

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

## 1. Notes

My learning Notes are included in _Notes.md_.

- The notes are composed with a structure that starts from the basics of TS and then goes into the depth such as decorators.
- You might need some JavaScript experience to not only know how to code in TS but to understand the mechanisms behind.

## 2. Drag & Drop Project

Here is project demo on [CodePen](https://codepen.io/uujx/pen/PoNYwOg)

A Drag and Drop project for practicing TypeScript.

- You can create project with title, description and number of poeple involved.
- Projects are divided in to two lists: active projects and finished projects.
- You can drag a project from a list and drop it to the other.

At first, the project was developed only for practicing TS so I wrote it in a [single big file](./2-drag-and-drop/1-original-project/).

Later, I splitted it with two approach: [TS namespaces](./2-drag-and-drop/2-namespace-project/) and [ES6 modules](./2-drag-and-drop/3-es6-modules-project/). I kept all three projects so that you have a clear comparision of these approaches.

To solve the problem of too many HTTP requests brought by a lot of small js files, I then introduced webpack to the project as every modern frontend project would do. The complete project can be found at [webpack-project](./2-drag-and-drop/4-webpack-project/)
