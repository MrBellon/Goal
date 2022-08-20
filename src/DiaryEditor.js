import { useRef ,useState } from "react";

const DiaryEditor = ({onCreate}) => {

  const authorInput = useRef();
  const contentInput = useRef();

  const  [state, setState] = useState({
    author:"",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = () => {
    if(state.author.length < 1){
      // focus
      authorInput.current.focus();
      return;
    }
    if(state.content.length < 5){
      // focus
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert('저장 성공');
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return <div className="DiaryEditor">
    <h2>오늘의 일기</h2>
    <div>
      <input
      ref={authorInput}
        name="author"  
        value={state.author} 
        onChange= {handleChangeState}
      />
    </div>
    <div>
      <textarea
      ref={contentInput}
      name="content"
      value={state.content} 
      onChange={handleChangeState}
      />
    </div>
    <div>
      오늘의 감정점수 : 
      <select 
        name="emotion" 
        value={state.emotion} 
        onChange={handleChangeState}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
    <div>
      <button onClick={handlesubmit}>일기 저장소</button>
    </div>
  </div>;
}
export default DiaryEditor;