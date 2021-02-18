import { TEXT } from "./const";

function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }
  const props = {
    ...config,
    children: children.map(child => {
      return typeof child === 'object' ? child : createTextNode(child)
    })
  }

  return {
    type,
    props
  }
}

function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  }

}

export default { createElement }


