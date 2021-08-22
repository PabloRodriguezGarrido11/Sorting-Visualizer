import {React, Component} from 'react';
import './SortingVisualizer.css';
import {animationsMergeSort} from '../SortingAlgorithms/mergeSort';
import { animationsQuickSort } from '../SortingAlgorithms/quickSort';
import { animationsBubbleSort } from '../SortingAlgorithms/bubbleSort';
import { randomInt, opButton } from './utils';

export default class SortingVisualizer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            array:[],
        };

    }

    componentDidMount(){

        this.resetArray();

        let bars = document.getElementsByClassName("array-bar")
        let a = 0
        
        setTimeout(() => {
            opButton("", true)
            for (let i = 0; i < bars.length; i++){
               
                for (let j = 0; j < bars[i].id; j++){
                
                    setTimeout(() => {
                        bars[i].style.height = j+"px"
                    },  (i*i+200)+(j*j)/(Math.pow(i,2)+j) )
                }

                setTimeout(() => {if(i === bars.length-1) opButton("", false)}, bars.length * 55)
            }    
        },10)

    
    }

    resetArray(){

        const array = [];

        for (let index = 0; index < 50; index++) {
            array.push(randomInt(5, 600));            
        }

        this.setState({array});

    }

    //Calls to Algorithms

    mergeSort(){
        
        let animations = animationsMergeSort(this.state.array);

        opButton("Merge Sort", true)
        this.runAnimations(animations, 2040, "merge")

    }


    quickSort(){
        let animations = animationsQuickSort(this.state.array);

        opButton("Quick Sort", true)
        this.runAnimations(animations, 30, "quick")

    }


    bubbleSort(){

        let animations = animationsBubbleSort(this.state.array);
        
        opButton("Bubble Sort", true)
        this.runAnimations(animations, 5, "bubble")

    }

    
    heapSort(){

    }

    finish(bars, animations, time){

        setTimeout(() => {

            for(let i = 0; i < bars.length; i++){
                setTimeout(() => {
                    bars[i].style.backgroundColor = "#72A4D7"
                }, i * 10)
            }

            setTimeout(() => {

                for(let i = 0; i < bars.length; i++){
                    bars[i].style.backgroundColor = "#E88DFD"
                }
                
                document.getElementById("comparation").innerHTML = "Select one of the algorithms"
                document.getElementById("counter").innerHTML = ""
                opButton("", false)

            }, bars.length * 30)


        }, animations.length * time);

    }

    runAnimations(animations, time, sort){

        let bars = document.getElementsByClassName("array-bar");
        let values = document.getElementsByClassName("values");
        let c = 0

        document.getElementById("comparation").innerHTML = "Comparations: "
        
        for (let index = 0; index < animations.length; index++) {
            setTimeout(() => {
                
                let changeState = animations[index][0] == "compare" || animations[index][0] === "recompare"; 
                let swapping = animations[index][0] == "change" || animations[index][0] === "rechange"; 

                if(changeState){
                    const [type, b1, b2] = animations[index];
                    let bar1 = bars[b1].style;
                    let bar2 = bars[b2].style;
                    const color1 = type === "compare" ?  'red' : '#E88DFD';
                    const color2 = type === "compare" ?  (sort === 'quick' ? 'yellow' : 'red') : '#E88DFD';
                    if(type === "compare") c++;
                    document.getElementById("counter").innerHTML = c

                        bar1.backgroundColor = color1
                        bar2.backgroundColor = color2
                
                }else if(animations[index][0] === "swap"){
                
                        let [type, idbar, value] = animations[index];
                        let bar = bars[idbar].style;
                        bar.height = `${value}px`
                        values[idbar].innerHTML = value
                        values[idbar].style.color = "white"

                }else if(swapping){
                    const [type, b1, b2] = animations[index];
                    const color = type === "change" ?  'green' : '#E88DFD';
                    let bar1 = bars[b1].style;
                    let bar2 = bars[b2].style;

                        bar1.backgroundColor = color
                        bar2.backgroundColor = color

                }else if(animations[index][0] === "last"){
                    let [type, idbar] = animations[index];
                    bars[idbar].style.backgroundColor = "white";
                }

                    
                    
                }, index * time);
        }

        this.finish(bars, animations, time)
    }

    render() {

        const {array} = this.state;

        return (
            
            <>
                    <div className="counter" id="comparations" >
                        <div className="counter-item" id="comparation">Select one of the algorithms</div>
                        <div className="counter-item" id="counter"></div>
                    </div>

                    <div className="array-container">
                        {array.map((value, id) =>

                            <div className="array-bar" id={`${value}`} key={id}></div>
                        
                        )}
                    </div>  

                    <div className="values-container">
                        {array.map((value, id) =>

                                <div className="values"  key={id+1} ><span className="num">{value}</span></div>

                        )}
                    </div>

                    <div className="b-container">
                        <button className="b-item"onClick={() => window.location.reload()}>Reset elements</button>
                        <button className="b-item" onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button className="b-item" onClick={() => this.quickSort()}>Quick Sort</button>
                        <button className="b-item" onClick={() => this.resetArray()}>Heap Sort</button>
                        <button className="b-item" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    </div>  

            </>

        );

    }


}

