import React, { useState, useEffect } from "react";

const CounterA = React.memo(({count}) => {
  
  useEffect(()=> {
    console.log(`CounterA Update - count: ${count}`)
  })
  
  return <div>{count}</div>
})

const CounterB = ({obj}) => {

  useEffect(() => {
    console.log(`CounterB Update - count : ${obj.count}`)
  })

  return <div>{obj.count}</div>
};

const areEqual = (prevProps, nextProps) => {
  // return true // 이전 프롭스 현재 프롭스가 같다 -> 리렌더링을 일으키지 않게됩니다
  // return false // 이전 과 현재가 다르다 -> 리렌더링을 일으키라
  
  if(prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;

  // return prevProps.obj.count === nextProps.obj.count;  -> 위의 식이랑 똑같은 결과
}

const MemoizeCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {

  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({count: 1})

  return <div style={{ padding: 50 }}>
    <div>
      <h2>Counter A</h2>
      <CounterA count={count} />
      <button onClick={() => setCount(count)}>A button</button>
    </div>
    <div>
      <h2>Counter B</h2>
      <MemoizeCounterB obj={obj} />
      <button onClick={() => setObj({count: obj.count})}>B button</button>
    </div>
  </div>;
};

export default OptimizeTest;