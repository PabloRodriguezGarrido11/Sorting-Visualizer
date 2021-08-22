export function animationsBubbleSort(array){
    const animations = []    
    bubbleSort(array, animations);
    return animations;
}

function bubbleSort(arr, animations){
    console.log(arr)
    for (let i = 0; i < arr.length; i++){
        //Vamos a ir ordenando los elementos mayores por cada iteracion
        for (let j = 0; j < arr.length - i - 1; j++){

            animations.push(["compare",j,j+1])
            animations.push(["recompare",j,j+1])

            if(arr[j] > arr[j+1]){
                
                animations.push(["swap",j,arr[j+1]])
                animations.push(["swap",j+1,arr[j]])
                    let temp = arr[j] 
                    arr[j] = arr[j+1] 
                    arr[j+1] = temp
                
            }

            if( j+1 == arr.length - i -1){
                animations.push(["last",j+1])
            }
        }

        if( i+1 == arr.length){
            animations.push(["last",0])
        }
        
    }

}