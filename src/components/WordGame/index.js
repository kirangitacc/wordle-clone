import {Component} from 'react'
import GuessItem from '../GuessItem'
import { BsBackspace } from "react-icons/bs";
import './index.css'

const wordsList=[
    {
      id:1,
      word:'BRAIN',
    },
    {
      id:2,
      word:'STORM',
    },
    {
      id:3,
      word:'EAGLE',
    },
    {
      id:4,
      word:'BLIND',
    },
    {
      id:5,
      word:'PAINT',
    }
  ]

class WordGame extends Component {


    state={

        word:'',
        attempts:'',
        i1:'',
        i2:'',
        i3:'',
        i4:'',
        i5:'',
        clickCount:0,
        guessList:[],
        clue:'',
        gameStatus:'',
    }

    componentDidMount(){
        const randomWord=wordsList[Math.floor(Math.random() * wordsList.length)]
        const c=Math.floor(Math.random() * 5)
        this.setState({word:randomWord.word,guessList:[],clue:c,gameStatus:'',attempts:6})
    }


    onSubmit=()=>{
        const {i1,i2,i3,i4,i5,word,attempts}=this.state
        const k=i1+i2+i3+i4+i5

        if (k===word){
            this.setState({attempts:6,gameStatus:'Success'})
        }
        

        if(attempts<=1){
            this.setState({gameStatus:'Failure'})
        }

        if(k.length!==5){
            alert('Please Enter All Letters')
        }else{
            this.setState((prevState) => ({guessList: [...prevState.guessList, k],attempts:prevState.attempts-1}));
            this.setState({i1:'',i2:'',i3:'',i4:'',i5:'',clickCount:0})
        }
        
    }

    letterClicked=(o)=>{
        const {clickCount}=this.state
        if (clickCount<5){
            this.setState((prevState)=>({clickCount:prevState.clickCount+1}))
            console.log(clickCount)

            if (clickCount===0){
                this.setState({i1:o})
            }else if(clickCount===1){
                this.setState({i2:o})
            }else if(clickCount===2){
                this.setState({i3:o})
            }else if(clickCount===3){
                this.setState({i4:o})
            }else if(clickCount===4){
                this.setState({i5:o})
            }else {
                return null
            }
        }

    }

    onDelete=()=>{
        const {clickCount}=this.state
        
        if (clickCount===1){
            this.setState({i1:''})
            this.setState((prevState)=>({clickCount:prevState.clickCount-1}))
        }else if(clickCount===2){
            this.setState({i2:''})
            this.setState((prevState)=>({clickCount:prevState.clickCount-1}))
        }else if(clickCount===3){
            this.setState({i3:''})
            this.setState((prevState)=>({clickCount:prevState.clickCount-1}))
        }else if(clickCount===4){
            this.setState({i4:''})
            this.setState((prevState)=>({clickCount:prevState.clickCount-1}))
        }else if(clickCount===5){
            this.setState({i5:''})
            this.setState((prevState)=>({clickCount:prevState.clickCount-1}))
        }else if(clickCount<=0){
            return null
        }
    }

    renderPlayView=()=>{
        const {attempts,i1,i2,i3,i4,i5,guessList,word,clue}=this.state

        let suffix=''
        if(clue===0){
            suffix='st'
        }else if(clue===1){
            suffix='nd'
        }else{
            suffix='th'
        }


        return (
            <>
                <nav className='nav'>
                    <h1 className="main-heading">Wordle Clone</h1>
                    <p className="attempts">Attempts Left:{attempts}</p>
                </nav>
                <div className="game-con">
                    <div className="con1">
                        <div className="rules-con">
                            <div className="rule-con">
                                <p className='pr'>Correct letter in the correct position</p>
                                <p className="green"></p>
                            </div>
                            <div className="rule-con">
                                <p className='pr'>Correct letter in the wrong position</p>
                                <p className="yellow"></p>
                            </div>
                            <div className="rule-con">
                                <p className='pr'>Incorrect letter</p>
                                <p className="gray"></p>
                            </div>
                        </div>
                        <div className="sub-con1">
                            <div className="inp-con">
                               <p className='inp'>{i1}</p>
                               <p className='inp'>{i2}</p>
                               <p className='inp'>{i3}</p>
                               <p className='inp'>{i4}</p>
                               <p className='inp'>{i5}</p>
                            </div>
                            <div className="clue-con">
                                <p className='clue'>Clue:{clue+1}{suffix} Letter is {word[clue]}</p>
                                <button className="btn1" type='button' onClick={this.onSubmit}>Submit</button>
                            </div>
                        </div>
                        <div className='sub-con2'>
                            {[...Array(26)].map((_,index)=>(
                                <button className='letters' key={index+65} onClick={()=>this.letterClicked(String.fromCharCode(65+index))}>{String.fromCharCode(65+index)}</button>
                            ))}
                        
                            <button className='delete-btn1' onClick={this.onDelete}><BsBackspace className="icon"/></button>
                        </div>

                    </div>
                    <div className="con2">
                        <h1 className="con2-h">Previous Guesses</h1>
                        <div className="guess-con">
                            {guessList.map(item=>(
                                <GuessItem item={item} key={item} word={word} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderSuccessView=()=>(
        <div className="success-con">
            <h1 className='success-h1'>Congratulations You Won</h1>
            <button className="btn1" type='button' onClick={()=>this.componentDidMount()}>Restart</button>
        </div>
    )

    renderFailureView=()=>(
        <div className="success-con">
            <h1 className='failure-h1'>Sorry You Lost</h1>
            <button className="btn1" type='button' onClick={()=>this.componentDidMount()}>Restart</button>
        </div>
    )

    renderViews=()=>{
        const {gameStatus}=this.state

        switch(gameStatus){
            case 'Running':
                return this.renderPlayView()
            case 'Failure':
                return this.renderFailureView()
            case 'Success':
                return this.renderSuccessView()
            default:
                return this.renderPlayView()
        }
    }


    render(){
        return (
            <div className="main-con">
                {this.renderViews()}
            </div>
        )
    }
} 

export default WordGame