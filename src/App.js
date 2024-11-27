import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log('props', props)

  return (
    <div>
      <header>
          <h1><a href="/" onClick={
            (event)=>{
              event.preventDefault();
              props.onChangeMode();
            }
          }>{props.title}</a></h1>
      </header>
    </div>
  )
}

function Nav(props) {
  const lis = []

  for (let i=0; i<props.topics.length; i++) {
    let topic = props.topics[i];
    lis.push(<li key={topic.id}>
        <a id={topic.id} href={'/read/'+topic.id} onClick={
          (event)=>{
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }
        }>
          {topic.title}
        </a>
      </li>);
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [_id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]

  let content = null;

  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === _id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Article title={title} body={body}></Article>
  }

  return (
    <div className="App">
      <Header title="Web" onChangeMode={
        ()=>{
          setMode('WELCOME');
        }
      }></Header>
      <Nav topics={topics} onChangeMode={
        (_id)=>{
          setMode('READ');
          setId(_id);
        }
      }></Nav>
      {content}
    </div>
  );
}

export default App;
