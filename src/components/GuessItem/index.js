import './index.css'

const GuessItem=(props)=>{
    const {item,word}=props

    let p1='p3'
    let p2='p3'
    let p3='p3'
    let p4='p3'
    let p5='p3'

    if(item[0]===word[0]){
        p1='p1'
    }else if (word.includes(item[0])){
        p1='p2'
    }

    if(item[1]===word[1]){
        p2='p1'
    }else if (word.includes(item[1])){
        p2='p2'
    }

    if(item[2]===word[2]){
        p3='p1'
    }else if (word.includes(item[2])){
        p3='p2'
    }

    if(item[3]===word[3]){
        p4='p1'
    }else if (word.includes(item[3])){
        p4='p2'
    }

    if(item[4]===word[4]){
        p5='p1'
    }else if (word.includes(item[4])){
        p5='p2'
    }
    

    return (
        <div className="item-con">
            <p className={p1}>{item[0]}</p>
            <p className={p2}>{item[1]}</p>
            <p className={p3}>{item[2]}</p>
            <p className={p4}>{item[3]}</p>
            <p className={p5}>{item[4]}</p>
        </div>
    )

}

export default GuessItem