# 렌더링과 리렌더링에 관한 고찰

리액트에서의 렌더링이란, 간단하게 말해서 `jsxToDOM`이라는 함수를 호출 하는 것이다.

![이 뭔 x소리야?](https://i.namu.wiki/i/6qJf1HXty0kKRhTOzUuwxEyxEo2g5ad87I-eZoXvDUBIaHoY1inbQsua77Tin72of2-nHEj-8bCp3rPMmBZoCA.gif)

다시 말해, 당신이 쓴 JSX 코드를, 리액트를 통해 브라우저 DOM에 그리는 과정이다.

그리고 후술할 내용으로, 왜 `DOM에 그리는 것`이 아닌 `DOM에 그리는 과정`이라고 했는지 알게 될 것이다.

기본적으로 렌더링 과정은 세가지로 나뉜다:

1. 시발 [(trigger)](https://react.dev/learn/render-and-commit#step-1-trigger-a-render)
2. 호출 [(render)](https://react.dev/learn/render-and-commit#step-2-react-renders-your-components)
3. DOM node 생성 또는 수정 [(commit)](https://react.dev/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)

## tlqkf (trigger)

쉽게 말해서, 무언가 액션이 주어져야 렌더링이 일어나지 않겠는가?

그게 다다. 그럼 그 **액션**이 뭐냐? 자연적인 현상에선 **딱! 두가지다**.

1. window load (즉, 초기 로딩)
2. 컴포넌트의 state 변화

> 자연적인 현상이 아닌건 뭘까? [`ReactDOM.render`](https://react.dev/reference/react-dom/render)를 직접 호출 하는 경우다. 무시하자.

여러군데서 보니까, props 변화도 얘기 하는데, 복잡하게 생각할 필요 없이 그게 state다.

props는 쉽게 말해 부모 컴포넌트에게 받는 값인데, 그게 자연적으로 변할 수가 없다.

왜? [변수는 잊혀진다](./state.md#변수는-잊혀진다)에서 설명했듯, 한번 호출되고 난 함수의 내부 변수는 지워진다.

그 값, props, 즉 부모 컴포넌트로부터 받은 값이 변하려면, 그 값의 원초가 결국 [state](./state.md)여야 한다.

### state 변화와 리렌더링

근데 그러면, **모든 state 변화는 리렌더링을 일으키나?** 맞다. 맞는데, 당신이 생각하는 그게 아니다.

state 변화가 일어난 컴포넌트의 **자식 컴포넌트**들에게만 영향을 끼친다. 즉, 렌더링은 월권을 하지 않는다는 것이다.

왜일까? 자바스크립트 관점에서 보면 다음과 같다:

```js
function Parent() {
  console.log('부모 렌더링~');
  Child();
}

function Child() {
  console.log('자식 렌더링~');
  SubChild();
}

function SubChild() {
  console.log('손자 렌더링~');
}

function render(func) {
  func()
}

render(Parent) // 초기 렌더링
console.log('Child의 state 변화 발생! 리렌더링 시작')
render(Child)

// 부모 렌더링~
// 자식 렌더링~
// 손자 렌더링~
// Child의 state 변화 발생! 리렌더링 시작
// 자식 렌더링~
// 손자 렌더링~
```

어떤가? 굉장히 자연스럽지 않은가?

그렇다면 이렇게 생각할 것이다.

와, 그럼 부모의 state가 바뀌면 자식, 손자까지 모두 리렌더링 되겠네??

그렇다. 근데, 모든 자식 컴포넌트가 리렌더링 되는 것은 아니다.

다음과 같은 상황에서는 부모의 state 변화가 자식에게 영향을 미치지 않는다:

- 전달된 props가 변하지 않은 경우
- 컴포넌트애서 사용되는 context 값이 변하지 않은 경우

내용이 길어서, [이걸 읽으시길 바랍니다ㅎㅎ](https://velog.io/@eunbinn/when-does-react-render-your-component).

원문: [https://www.zhenghao.io/posts/react-rerender](https://www.zhenghao.io/posts/react-rerender)

한줄요약: 근본적인 컴포넌트들의 렌더링 시발(트리거)은 부모/자신의 state 변화다.

## 호출 (render)

서론이 길었다. 호출은 진짜 말 그대로 호출이다.

앞서 설명했듯, 렌더링이란 `jsxToDOM` (임의로 지은 이름)이라는 함수를 호출 하는거라고 보면 된다.

그리고 이 과정에서, 초기 렌더링인지, 리렌더링인지에 따라서 과정이 달라진다.

### 초기 렌더링

초기 렌더링은, 당연하게도, [DOM node를 생성한다](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement).

### 리렌더링

렌더링을 트리거한 컴포넌트를 호출한다! --> 그래서 컴포넌트의 state 변화가 일어나면 리액트가 컴포넌트를 리렌더한다고 하는거다.

그리고 위에서 설명했듯이 재귀적으로 자식 컴포넌트를 호출한다. 이 중 props 변화가 없는 컴포넌트는 DOM 수정을 하지 않는다.

그래서 맨 처음 설명했던 `DOM에 그리는 것`이 아닌, `DOM에 그리는 과정`이라고 했던 것이다.

왜냐면 DOM에 그리지 않을 수도 있기 때문이다.

## DOM node 생성 또는 수정 (commit)

### 초기 렌더링

[DOM에 추가한다](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild).

### 리렌더링

변화가 있으면 해당 부분 수정, 없으면 다음 컴포넌트로 넘어간다.

## 브라우저 페인팅

DOM 변경사항이 브라우저에 렌더링 (페인팅)이 된다. 즉, 변경사항이 화면에 반영된다.

## 세줄요약

1. 렌더링과 리렌더링은 컴포넌트의 state 변경에 의해 일어난다.
2. 부모의 state가 바뀌면 자식 컴포넌트들도 리렌더링 되지만, 예외는 있다.
3. 렌더링은 JSX 코드를 브라우저에 반영하는 과정이다.
