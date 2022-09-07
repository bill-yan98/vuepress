---
title: 前端图片压缩
author: bill.yan
date: '2022-09-07'
---
# 前端图片压缩


## 简介

随着目前设备像素的不断提高，基本随便一张照片即是M级别的大小，对于如此大的图片，不管是在内存空间、带宽资源和服务器数据空间上都是非常耗费的，特别是在移动端，由图片引起的OOM和图片上传质量过大等问题我想大家都遇到过，所以对于图片内存占用上和物理空间占用上进行压缩很有必要。

## 压缩方式

### 无损压缩

通过对冗余数据的存储方式进行优化，该方式不会丢失文件内容，压缩率受冗余度的影响，所以压缩率较低。

### 有损压缩

通过丢失不会对文件造成太大影响的数据来达到压缩效果，所以压缩率较高。

其中PNG是无损压缩格式图片，JPEG是有损压缩格式图片

## 关于图片

### 图片内存大小

图片占用内存大小 = 分辨率 * 像素点大小

数据格式不同像素点大小也不同：

- ALPHA_8: 1B
- RGB_565: 2B
- ARGB_4444: 2B
- ARGB_8888: 4B
- RGBA_F16: 8B

## 前端压缩实现

### 前端图片压缩原理

js原生方法 [`HTMLCanvasElement.toBlob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob)

#### 语句

```typescript
toBlob(callback)
toBlob(callback, type)
toBlob(callback, type, quality)
```

#### 参数

`callback`

回调函数，可获得一个单独的 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象参数。如果图像未被成功创建，可能会获得 `null` 值。

`type` 可选

[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 类型，指定图片格式，默认格式（未指定或不支持）为 `image/png`。

`quality` 可选

[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 类型，值在 0 与 1 之间，当请求图片格式为 `image/jpeg` 或者 `image/webp` 时用来指定图片展示质量。如果这个参数的值不在指定类型与范围之内，则使用默认值，其余参数将被忽略。

### 封装压缩方法

```typescript
export default function compress(base64: Blob, rate: number, callback: any) {
​    //处理缩放，转格式
​    const _img: any = new Image();
​    _img.src = base64;
​    _img.onload = function() {
​        const _canvas: any = document.createElement("canvas")
​        const w = this.width / rate
​        const h = this.height / rate
​        _canvas.setAttribute("width", w)
​        _canvas.setAttribute("height", h)
​        _canvas.getContext("2d").drawImage(this, 0, 0, w, h)
​        const base64 = _canvas.toDataURL("image/jpeg")
​        _canvas.toBlob(function(blob: Blob) {
​            if(blob.size > 750*1334){  //如果还大，继续压缩
​                compress(base64, rate, callback)
​            }else{
​                callback(base64)
​            }
​        }, "image/jpeg")
​    }
}
```

### 插件实现

#### 插件地址

[compressorjs](https://github.com/fengyuanchen/compressorjs)

#### 简介

JavaScript 图像压缩器。使用浏览器原生的[canvas.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) API来做压缩工作，即**有损压缩**，**异步压缩**，在不同的浏览器有不同的压缩效果。一般在客户端上传之前使用这个来预压缩图片。

#### 用法

参见github下**README.md**文件