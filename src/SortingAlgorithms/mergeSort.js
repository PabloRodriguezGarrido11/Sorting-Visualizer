export function animationsMergeSort(array){
    const animations = []
    const arrAux = array.slice(); //Copy original array
    
    mergeSort(array, 0, array.length-1, arrAux, animations);
    return animations;
}



function mergeSort(arr, i, j, arrAux, animations){
    
    if( i === j  ) return;

        let m = Math.floor( (i + j) / 2);
        
        mergeSort(arrAux, i, m, arr, animations)
        mergeSort(arrAux, m + 1, j, arr, animations)

        //Swapping arr <=> arrAux
        mergeAuxSort(arr, i, m, j, arrAux, animations)


}

function mergeAuxSort(arr, l, m, r, arrAux, animations){

    let k = l;
    let j = m+1;
    
    while( l<= m && j <= r ){

        animations.push(["compare",l, j])
        animations.push(["recompare",l, j])

        if(arrAux[l] < arrAux[j]){
            animations.push(["change",k,l])
            animations.push(["rechange",k,l])
            animations.push(["swap",k,arrAux[l]])

            arr[k] = arrAux[l];
            l++;
        }else{
            animations.push(["change",k,j])
            animations.push(["rechange",k,j])
            animations.push(["swap",k,arrAux[j]])

            arr[k] = arrAux[j];
            j++;
        }
        k++;
    }
    //This will be executed if one of the sublists is copied 
    while(l <= m){
        animations.push(["compare",l,l])
        animations.push(["recompare",l,l])

        animations.push(["change",k,l])
        animations.push(["rechange",k,l])

        animations.push(["swap",k,arrAux[l]])

        arr[k] = arrAux[l];
        k++;
        l++;
    }

    while(j <= r){
        animations.push(["compare",l,l])
        animations.push(["recompare",l,l])

        animations.push(["change",k,j])
        animations.push(["rechange",k,j])

        animations.push(["swap",k,arrAux[j]])

        arr[k] = arrAux[j];
        k++;
        j++;
    }
    

    }

