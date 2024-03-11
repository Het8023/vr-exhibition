import "./style.css";

// 引入初始化场景
import "./utils/init";

// 引入threejs
import * as THREE from "three";

// 引入gui工具
import guiMove from "./utils/gui.js";

// 引入将dom 2d 转化为3d方法
import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";

// 创建分组
let group = new THREE.Group();

let video;
let videoStatus;

// 引入初始化场景
import { scene, camera } from "./utils/init.js";

// 准备纹理贴图所需要的数据
const sceneInfoObj = {
  //第一个场景的数据
  one: {
    // 纹理加载器公共路径
    publicPath: "technology/1/",
    // 纹理加载器需要加载的图片
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.46, -0.11, -0.11],
        // 物体的旋转角度
        rotation: [1.42, 0.68, 1.63],
        // 切换的下一个场景
        targetAttr: "two",
      },
    ],
  },
  //第二个场景的数据
  two: {
    // 纹理加载的公共资源路径
    publicPath: "technology/2/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.35, -0.09, 0.03],
        // 物体的旋转角度
        rotation: [4.72, 0.89, 2.36],
        // 切换的下一个场景
        targetAttr: "one",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.46, -0.11, -0.11],
        // 物体的旋转角度
        rotation: [1.42, 0.68, 1.63],
        // 切换的下一个场景
        targetAttr: "three",
      },
    ],
  },
  // 第三个场景的数据
  three: {
    // 纹理加载的公共资源路径
    publicPath: "technology/3/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.4, -0.18, 0.32],
        // 物体的旋转角度
        rotation: [-1.53, -0.04, -1.26],
        // 切换的下一个场景
        targetAttr: "two",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.32, -0.16, -0.33],
        // 物体的旋转角度
        rotation: [1.85, 0.1, -0.17],
        // 切换的下一个场景
        targetAttr: "four",
      },
    ],
  },
  // 第四个场景的数据
  four: {
    // 纹理加载的公共资源路径
    publicPath: "technology/4/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.35, -0.22, 0.4],
        // 物体的旋转角度
        rotation: [-0.85, -0.45, -1.8],
        // 切换的下一个场景
        targetAttr: "three",
      },
      {
        // 标记点名称
        name: "dom",
        // 物体的位置坐标
        position: [0.49, 0, 0],
        // 物体的旋转角度
        rotation: [0, -0.5 * Math.PI, 0],
        // 切换的下一个场景
        targetAttr: "five",
        // 回调函数
        active() {
          setMaterialCube(sceneInfoObj.five);
        },
      },
    ],
  },
  // 第五个场景的数据
  five: {
    // 纹理加载的公共资源路径
    publicPath: "technology/5/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.05, -0.08, 0.46],
        // 物体的旋转角度
        rotation: [5.41, 2.91, 4.79],
        // 切换的下一个场景
        targetAttr: "four",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.45, -0.14, -0.25],
        // 物体的旋转角度
        rotation: [1.85, 2.58, 3.31],
        // 切换的下一个场景
        targetAttr: "six",
      },
      {
        // 标记点名称
        name: "video",
        // 视频路径
        imgUrl: "video/movie.mp4",
        // 物体的宽高
        wh: [0.2, 0.1],
        // 物体的位置坐标
        position: [0.49, 0.04, 0.045],
        // 物体的旋转角度
        rotation: [0, -0.5 * Math.PI, 0],
      },
    ],
  },
  // 第六个场景
  six: {
    // 纹理加载的公共资源路径
    publicPath: "technology/6/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.31, -0.16, 0.37],
        // 物体的旋转角度
        rotation: [1.21, 2.67, 1.12],
        // 切换的下一个场景
        targetAttr: "five",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.14, -0.16, -0.45],
        // 物体的旋转角度
        rotation: [0.75, 0.29, 1.12],
        // 切换的下一个场景
        targetAttr: "seven",
      },
    ],
  },
  // 第七个场景
  seven: {
    // 纹理加载的公共资源路径
    publicPath: "technology/7/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.11, -0.12, 0.46],
        // 物体的旋转角度
        rotation: [1.21, 3.22, -0.62],
        // 切换的下一个场景
        targetAttr: "six",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.4, -0.16, 0.02],
        // 物体的旋转角度
        rotation: [1.57, 2.58, -2],
        // 切换的下一个场景
        targetAttr: "eight",
      },
    ],
  },
  // 第八个场景
  eight: {
    // 纹理加载的公共资源路径
    publicPath: "technology/8/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.14, -0.09, 0.46],
        // 物体的旋转角度
        rotation: [1.12, 2.94, -2],
        // 切换的下一个场景
        targetAttr: "seven",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.02, -0.18, -0.45],
        // 物体的旋转角度
        rotation: [1.94, 0.11, -2],
        // 切换的下一个场景
        targetAttr: "nine",
      },
    ],
  },
  // 第九个场景
  nine: {
    // 纹理加载的公共资源路径
    publicPath: "technology/9/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.07, -0.12, 0.44],
        // 物体的旋转角度
        rotation: [0.93, 2.94, -2],
        // 切换的下一个场景
        targetAttr: "eight",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.05, -0.14, -0.47],
        // 物体的旋转角度
        rotation: [2.03, 0.02, -2],
        // 切换的下一个场景
        targetAttr: "ten",
      },
    ],
  },
  // 第十个场景
  ten: {
    // 纹理加载的公共资源路径
    publicPath: "technology/10/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.07, -0.12, 0.44],
        // 物体的旋转角度
        rotation: [0.93, 2.94, -2],
        // 切换的下一个场景
        targetAttr: "nine",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.05, -0.14, -0.47],
        // 物体的旋转角度
        rotation: [2.03, 0.02, -2],
        // 切换的下一个场景
        targetAttr: "eleven",
      },
    ],
  },
  // 第十一个场景
  eleven: {
    // 纹理加载的公共资源路径
    publicPath: "technology/11/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.18, -0.14, 0.46],
        // 物体的旋转角度
        rotation: [1.21, 2.94, -2],
        // 切换的下一个场景
        targetAttr: "ten",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.16, -0.16, -0.45],
        // 物体的旋转角度
        rotation: [1.85, 0.02, -2],
        // 切换的下一个场景
        targetAttr: "twelve",
      },
    ],
  },
  // 第十二个场景
  twelve: {
    // 纹理加载的公共资源路径
    publicPath: "technology/12/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.28, -0.18, 0.46],
        // 物体的旋转角度
        rotation: [1.12, 3.31, -2],
        // 切换的下一个场景
        targetAttr: "eleven",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.05, -0.14, -0.47],
        // 物体的旋转角度
        rotation: [2.03, 0.02, -2],
        // 切换的下一个场景
        targetAttr: "thirteen",
      },
    ],
  },
  // 第十三个场景
  thirteen: {
    // 纹理加载的公共资源路径
    publicPath: "technology/13/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.24, -0.2, 0.46],
        // 物体的旋转角度
        rotation: [1.12, 3.4, -2],
        // 切换的下一个场景
        targetAttr: "twelve",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.06, -0.14, -0.47],
        // 物体的旋转角度
        rotation: [2.03, 0.02, -2],
        // 切换的下一个场景
        targetAttr: "fourteen",
      },
    ],
  },
  // 第十四个场景
  fourteen: {
    // 纹理加载的公共资源路径
    publicPath: "technology/14/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.02, -0.18, 0.48],
        // 物体的旋转角度
        rotation: [1.21, 3.22, -2],
        // 切换的下一个场景
        targetAttr: "thirteen",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.46, -0.25, -0.42],
        // 物体的旋转角度
        rotation: [3.49, 0.75, -2],
        // 切换的下一个场景
        targetAttr: "fifteen",
      },
    ],
  },
  // 第十五个场景
  fifteen: {
    // 纹理加载的公共资源路径
    publicPath: "technology/15/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.45, -0.2, 0.44],
        // 物体的旋转角度
        rotation: [1.12, 2.58, -2],
        // 切换的下一个场景
        targetAttr: "fourteen",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.08, -0.16, -0.47],
        // 物体的旋转角度
        rotation: [2.4, 0.02, -2],
        // 切换的下一个场景
        targetAttr: "sixteen",
      },
    ],
  },
  // 第十六个场景
  sixteen: {
    // 纹理加载的公共资源路径
    publicPath: "technology/16/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.06, -0.18, 0.46],
        // 物体的旋转角度
        rotation: [0.75, 0.11, -2],
        // 切换的下一个场景
        targetAttr: "fifteen",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.34, -0.23, -0.42],
        // 物体的旋转角度
        rotation: [2.12, -0.35, -2],
        // 切换的下一个场景
        targetAttr: "seventeen",
      },
    ],
  },
  // 第十七个场景
  seventeen: {
    // 纹理加载的公共资源路径
    publicPath: "technology/17/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.22, -0.2, 0.46],
        // 物体的旋转角度
        rotation: [0.75, 0.11, -2],
        // 切换的下一个场景
        targetAttr: "sixteen",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.45, -0.12, -0.07],
        // 物体的旋转角度
        rotation: [1.76, -0.35, -2],
        // 切换的下一个场景
        targetAttr: "eighteen",
      },
    ],
  },
  // 第十八个场景
  eighteen: {
    // 纹理加载的公共资源路径
    publicPath: "technology/18/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.34, -0.14, 0.46],
        // 物体的旋转角度
        rotation: [1.12, -0.35, -2],
        // 切换的下一个场景
        targetAttr: "seventeen",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.07, -0.12, -0.4],
        // 物体的旋转角度
        rotation: [2.03, -0.07, -2],
        // 切换的下一个场景
        targetAttr: "nineteen",
      },
    ],
  },
  // 第十九个场景
  nineteen: {
    // 纹理加载的公共资源路径
    publicPath: "technology/19/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.46, -0.2, 0.37],
        // 物体的旋转角度
        rotation: [1.12, 0.75, -2],
        // 切换的下一个场景
        targetAttr: "eighteen",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.46, -0.18, -0.25],
        // 物体的旋转角度
        rotation: [1.85, 0.48, -2],
        // 切换的下一个场景
        targetAttr: "twenty",
      },
    ],
  },
  // 第二十个场景
  twenty: {
    // 纹理加载的公共资源路径
    publicPath: "technology/20/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.38, -0.16, 0.19],
        // 物体的旋转角度
        rotation: [-0.44, -0.99, -2],
        // 切换的下一个场景
        targetAttr: "nineteen",
      },
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [0.46, -0.12, 0],
        // 物体的旋转角度
        rotation: [1.48, 0.57, -2],
        // 切换的下一个场景
        targetAttr: "twentyOne",
      },
    ],
  },
  // 第二十一个场景
  twentyOne: {
    // 纹理加载的公共资源路径
    publicPath: "technology/21/",
    // 纹理加载需要加载的图片资源
    imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    // 准备标记点的数据, 当前空间中所有标记信息对象
    markList: [
      {
        // 标记点名称
        name: "landMark",
        // 标记点图片的路径
        imgUrl: "other/landmark.png",
        // 物体的宽度
        wh: [0.05, 0.05],
        // 物体的位置坐标
        position: [-0.34, -0.12, 0.33],
        // 物体的旋转角度
        rotation: [-0.8, -0.71, -2],
        // 切换的下一个场景
        targetAttr: "twenty",
      },
    ],
  },
};

// 创建立方缓冲几何体
function createCube() {
  // 创建图形
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });

  // 创建物体对象, 并且将图形与材质渲染到物体
  const cube = new THREE.Mesh(geometry, material);

  // 调整立方体沿着 z 轴做 -1 缩小（镜面翻转）
  cube.scale.set(1, 1, -1);

  // 将立方缓冲几何体添加到组
  // group.add(cube);

  // 将分组添加到场景
  scene.add(cube);

  // 将物体对象返回给函数
  return cube;
}

// 创建纹理加载器，并对立方缓冲几何体进行贴图
function setMaterialCube(infoObj) {
  // 清除上一个场景的标记点
  clear();

  const { publicPath, imgUrlArr, markList } = infoObj;
  // 创建纹理加载器
  const texturlLoader = new THREE.TextureLoader();
  // 设置纹理加载器的公共资源路径
  texturlLoader.setPath(publicPath);
  // 通过纹理加载器加载图片资源，并创建对应材质
  const materialArr = imgUrlArr.map((item) => {
    const texturl = texturlLoader.load(item);

    // 设置图片的颜色通道
    texturl.colorSpace = THREE.SRGBColorSpace;
    // 创建材质
    return new THREE.MeshBasicMaterial({
      map: texturl,
      side: THREE.DoubleSide,
    });
  });

  // 将立方缓冲几何体的材质设置为贴图之后的材质
  cubeObj.material = materialArr;

  // 循环遍历标记点
  markList.forEach((item) => {
    // 如果场景里面存在标记点，则调用创建标记点方法
    if (item.name === "landMark") createLandMark(item);
    else if (item.name === "dom") createDomMark(item);
    else if (item.name === "video") createVideoMark(item);
  });
  scene.add(group);
}

// 创建标记点贴图
function createLandMark(infoObj) {
  const { name, imgUrl, wh, position, rotation, targetAttr } = infoObj;
  // 创建纹理加载器
  const texturlLoader = new THREE.TextureLoader();

  // 创建图形（平面缓冲几何体）
  const geometry = new THREE.PlaneGeometry(...wh);
  // 常见材质
  const material = new THREE.MeshBasicMaterial({
    // 贴图
    map: texturlLoader.load(imgUrl),
    // 双面渲染
    side: THREE.DoubleSide,
    // 设置透明
    transparent: true,
  });
  // 创建物体对象，并且把图形与材质渲染到物体对象
  const plane = new THREE.Mesh(geometry, material);

  // 设置物体的坐标
  plane.position.set(...position);

  // 设置物体的旋转角度
  plane.rotation.set(...rotation);

  // 设置标记点名称
  plane.name = name;
  // 将标记点的数据添加到物体上
  plane.userData.targetAttr = targetAttr;

  // 调用gui工具
  guiMove(plane);

  group.add(plane);

  // 将物体对象添加到场景
  // scene.add(plane);
}

// 创建文本标记点
function createDomMark(infoObj) {
  let { position, rotation, active } = infoObj;
  const tag = document.createElement("span");
  tag.className = "mark-style";
  tag.innerHTML = "前进";
  tag.style.color = "#fff";
  tag.style.pointerEvents = "all";
  tag.addEventListener("click", (e) => {
    active(e);
  });

  const tag3d = new CSS3DObject(tag);
  tag3d.scale.set(1 / 800, 1 / 800, 1 / 800);
  tag3d.position.set(...position);
  tag3d.rotation.set(...rotation);
  group.add(tag3d);
}

// 创建视频纹理
function createVideoMark(infoObj) {
  const { name, imgUrl, position, rotation, wh } = infoObj;

  // 创建视频
  video = document.createElement("video");
  video.src = imgUrl;
  video.muted = true;
  // video.style.pointerEvents = "all";
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoStatus = true;
    video.muted = false;
  });

  // 创建纹理加载器
  const texture = new THREE.VideoTexture(video);

  // 创建图形
  const geometry = new THREE.PlaneGeometry(...wh);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  // 创建物体
  const plane = new THREE.Mesh(geometry, material);

  // 设置位置
  plane.position.set(...position);
  // 设置旋转角度
  plane.rotation.set(...rotation);

  plane.name = name;

  // gui工具
  guiMove(plane);

  // 添加到场景
  group.add(plane);
}

// 清除上一个场景的标记点
function clear() {
  // console.log(group);
  const list = [...group.children];
  list.forEach((obj) => {
    if (!obj.isCSS3DObject) {
      obj.geometry.dispose();
      obj.material.dispose();
    }
    group.remove(obj);
  });
}

// 给3d场景添加点击事件
function bindClick() {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    // 将鼠标位置归一化为坐标位置，x和y方向的取值范围是（-1 to =1）
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);

    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children);

    const obj = intersects.find((item) => item.object.name == "landMark");
    const videoObj = intersects.find((item) => item.object.name === "video");

    if (obj) {
      // 当点击了标记点，切换场景的数据
      const infoObj = sceneInfoObj[obj.object.userData.targetAttr];

      if (infoObj) setMaterialCube(infoObj);
    }

    // 设置视频播放暂停
    if (videoObj) {
      if (videoStatus) {
        video.pause();
        videoStatus = false;
      } else {
        video.play();
        videoStatus = true;
      }
    }
  });
}

// 调用创建立方缓冲几何体方法
const cubeObj = createCube();

bindClick();
// 对立方缓冲几何体进行贴图
setMaterialCube(sceneInfoObj.one);
