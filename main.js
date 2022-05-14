class ObserverFunction {
    constructor(element, callback, falseCallback) {
        this.element = element;
        this.callback = callback;
        this.falseCallback = falseCallback;
    }

    serialize() {
        return({
            falseCallback: this.falseCallback,
            callback: this.callback,
            element: this.element
        })
    }
}

class Observer {
    constructor(ObserverFunctions, updateSpeed) {
        this.updateSpeed = updateSpeed
        if (!ObserverFunctions) this.ObserverFunctions = [];
        else this.ObserverFunctions = ObserverFunctions;
        this.startLoop()
    }

    startLoop() {
        this.id = setInterval(this.Loop.bind(this), this.updateSpeed)
    }

    Loop() {
        for(let i = 0; i < this.ObserverFunctions.length; i++){
            let Func = this.ObserverFunctions[i]
            if (this.isInView(Func.serialize().element)) {
                Func.serialize().callback()
            }
            else {
                Func.serialize().falseCallback()
            }
        }
    }

    addObserverFunction(ObserverFunctionn) {
        this.ObserverFunctions.push(ObserverFunctionn)
    }

    removeObserverFunction(ObserverFunctionn) {
        this.ObserverFunctions.splice(this.ObserverFunctions.indexOf(ObserverFunctionn), 1)
    }

    isInView(element) {
        const rect = element.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth);
    }
}


// Example Code

function inview() {
    // this gets called if the element is in view
    console.log("in view")
}

function notinview() {
    // this gets called if the element isn't in view
    console.log("isn't in view")
}

var elementid = 'text'

var element = document.getElementById(elementid)

var myob = new Observer([new ObserverFunction(element, inview, notinview)], 10)