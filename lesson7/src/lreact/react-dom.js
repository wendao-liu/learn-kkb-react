import { TEXT } from "./const";

function render(vnode, container) {
  const node = createNode(vnode)
  container.appendChild(node)
}

function createNode(vnode) {
  let node = null;
  const { type, props } = vnode
  if (type === TEXT) {
    node = document.createTextNode('');
  } else if (typeof type === 'string') {
    node = document.createElement(type)
  } else if (typeof type === 'function') {
    node = type.isReactComponent ?
      updateClassComponent(vnode) :
      updateFunctionComponent(vnode)
  } else {
    node = document.createDocumentFragment()
  }

  reconcileChildren(props.children, node)


  updateNode(node, props);

  return node
}


// 添加节点属性
function updateNode(node, nextVal) {
  console.log(nextVal,'nextVal'); // lhy-log
  
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

function reconcileChildren(children, node) {
  children.forEach(child => {
    render(child, node)
  });
}

function updateClassComponent(vnode) {
  const { type, props } = vnode
  const cmp = new type(props)
  const vvnode = cmp.render()
  const node = createNode(vvnode)
  return node
}

function updateFunctionComponent(vnode) {
  const { type, props } = vnode
  const vvnode = type(props)
  const node = createNode(vvnode)
  return node
}

export default {
  render,
}