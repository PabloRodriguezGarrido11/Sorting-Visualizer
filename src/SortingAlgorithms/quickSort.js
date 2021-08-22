export function animationsQuickSort(array){
    const animations = [];
   
    quickSort(array, 0, array.length-1,animations)
    return animations;
}

//The pivot will be the last element of each sublist
function quickSort(array, first, last, animations){

    
    if( first >= last ) return;

    let newindex = divide(array, first, last,animations)

    //newindex -1 and newindex + 1 (dont touch the position of the last pivot)

    quickSort(array, first, newindex-1, animations)
    quickSort(array, newindex+1, last, animations)
 


}

function divide(array, i, j, animations){

    let pivot = array[j]
    let indexPivot = j
    //pointer to the last smaller element than the pivot selected
    let pointer = i - 1

    for(let v = i; v <= j-1; v++){
        animations.push(["compare",v,indexPivot])
        animations.push(["recompare",v,indexPivot])

        if(array[v] < pivot){
            pointer++;
            swap(array, pointer, v, animations)
        }

    }
    swap(array, pointer + 1, j, animations)

    //correct position of the pivot
    return pointer+1;
}


function swap(array, pointer, j, animations){

    let tmp = array[j]

    animations.push(["change",j,pointer])
    animations.push(["rechange",j,pointer])
    animations.push(["swap",j, array[pointer]])
    animations.push(["swap",pointer,tmp])

    array[j] = array[pointer]
    array[pointer]  = tmp

}