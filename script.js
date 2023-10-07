const multiStepForm = document.querySelector("[data-multi-step-form]")
const formSteps = Array.from(multiStepForm.querySelectorAll("[data-step]"))
const stepDisplays = Array.from(document.querySelectorAll("[data-step-value]"))

const justAnyInput = [...document.querySelectorAll("input")]

let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active")
});



justAnyInput.forEach(input => {
    let label = input.previousElementSibling
    input.addEventListener("blur", () => {
        if (input.value) {
            label.classList.add("stay-suspended")
            input.style.outlineColor = "rgb(0 150 255)"
        } else {
            label.classList.remove("stay-suspended")
        }
    })
})

const traverseSteps = () => {
    formSteps.forEach((step, index) => {
         step.classList.toggle("active", index === currentStep)        
    })

    stepDisplays.forEach((step, index) => {
        if (step.classList.contains("active")) {
            step.classList.replace("active", "previouslyActive")
        } else {
            step.classList.toggle("active", index === currentStep)
        }
    })
}

if (currentStep < 0 || currentStep >= formSteps.length) {
    currentStep = 0
    formSteps[currentStep].classList.add("active")
    stepDisplays[currentStep].classList.add("active")
    // traverseSteps()
}

multiStepForm.addEventListener("click", e => {
    let target = e.target
    let allIsValid;
    if (target.matches("[data-next]") || target.matches("[data-previous]")) {
          const inputs = [...formSteps[currentStep].querySelectorAll("input")]
        console.log(inputs)
     allIsValid = inputs.every(input => input.reportValidity())
        console.log(formSteps[currentStep])
    }
   
    
    if (target.matches("[data-next]")) {
        currentStep++
    } else if (target.matches("[data-previous]")) {
        currentStep--
    } 
   
    
    if (allIsValid) {
        traverseSteps()
    }
})



