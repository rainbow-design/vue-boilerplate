# elint

尽量利用 eslint 提高代码质量，有时候需要关闭部分校验时，做如下配置:

1. 关闭段落校验

```js
/* eslint-disable */
some code
/* eslint-enable */
```

2. 关闭当前行校验

```js
some code // eslint-disable-line
```

3. 关闭下一行校验

```js
// eslint-disable-next-line
some code
```

4. 关闭单个文件校验

在代码顶部添加一行注释;

```js
/* eslint-disable */
```

还可以在注释后加入详细规则，这样就能避开指定的校验规则了

```js
/* eslint-disable no-new */
```
