import * as dat from "dat.gui";
// 初始化gui
const gui = new dat.GUI();

// 创建gui工具方法
export default function guiMove(obj) {
  gui.add(obj.position, "x", -1, 1, 0.01).name("位移 x");
  gui.add(obj.position, "y", -1, 1, 0.01).name("位移 y");
  gui.add(obj.position, "z", -1, 1, 0.01).name("位移 z");

  gui.add(obj.rotation, "x", -2, 2 * Math.PI, 0.01).name("旋转 x");
  gui.add(obj.rotation, "y", -2, 2 * Math.PI, 0.01).name("旋转 y");
  gui.add(obj.rotation, "z", -2, 2 * Math.PI, 0.01).name("旋转 z");
}
