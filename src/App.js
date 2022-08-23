import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action)=>{
  switch(action.type){
    case 'INIT': {
      return action.data //새로운 state
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it)=> it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it)=> it.id === action.targetId ?
      {...it, content:action.newContent} : it);
    } //EDIT 타입의 액션이 발생을 하면 action으로 targetId와 newContent가 전달 -> 기존 state에서 map함수를 사용해 targetId와 일치하는 요소 찾아준 다음 그 요소의 값을 newContet로 수정해주고 나머지 요소는 it(그대로) 돌려준다 -> 그런 요소들을 합쳐 새로운 배열 만든 후 새로운 state로 전달
    default :
    return state;
  }
}

const App = () => {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, [])

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    
    const initData = res.slice(0, 20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) +1,
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    })
    
    dispatch({type:'INIT', data:initData})
  };

  useEffect(() => {
    getData();
  },[]);

  const onCreate = useCallback((author,content,emotion) => {

    dispatch({type:'CREATE', data:{author, content, emotion, id: dataId.current}})

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {

    dispatch({type: 'REMOVE', targetId})
  }, []);

  const onEdit = useCallback((targetId, newContent)=> {

    dispatch({type: 'EDIT', targetId, newContent})
  }, []);

  const getDiaryAnalysis = useMemo(
    () => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return <div className='App'>
    <DiaryEditor onCreate={onCreate} />
    <div>전체 일기 : {data.length}</div>
    <div>기분 좋은 일기 개수 : {goodCount}</div>
    <div>기분 나쁜 일기 개수 : {badCount}</div>
    <div>기분 좋은 일기 비율 : {goodRatio}</div>
    <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList = {data} />
  </div>
}

export default App;
