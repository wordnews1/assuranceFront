import Vue from 'vue'



export function  makeToast(variant = null,type) {

    switch (type) {
        case 0: type="error"; break;
        case 1: type="success" ; break;
        case 2: type="info"; break;
        case 3: type="warning"; break;

    }

    Vue.toasted.show((variant),{type:type})

}

export function focusOut(nom){

    console.log('nom',nom)

    var preventNextIteration = false;
    if (['Arrow', 'Backspace', 'Shift'].includes(event.key)) {
        preventNextIteration = true;
        return;
    }

    if (preventNextIteration) {
        return;
    }

    //this.referenceValue = this.formattedreferenceValue.replace(/\s/g, '').match(/([a-zA-Z0-9])/g)[0];
    nom = nom.replace(/[^a-zA-Z ]/g, "");
    nom = nom.toUpperCase()

    return nom

}

export function initialState (){
    return {
        userInput:""
    }
}


export function     getRequestParams(searchTitle, page, pageSize,lang="fr") {

    let params = {};


    /*if (searchTitle) {
        params["title"] = searchTitle;
    }*/

    params["title"] = searchTitle;

    if (page) {
        params["page"] = page - 1;
    }

    if (pageSize) {
        params["size"] = pageSize;
    }

    if (lang) {
        params["lang"] = lang;
    }

    return params;

}