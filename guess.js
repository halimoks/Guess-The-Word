let words = [
  "apple", "house", "knife", "table", "light", "dream", "beach", "happy", "music", "chair",
  "cloud", "earth", "smile", "storm", "water", "flour", "heart", "peace", "pizza", "queen",
  "robot", "tiger", "zebra", "juice", "arrow"
]

let wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase().split('')
let allInputs = document.querySelector(".allInputs")
let hintSpan = document.querySelector(".hintSpan")
let hintBtn = document.querySelector('.hintBtn')
let checkBtn = document.querySelector(".checkBtn")
let numberOfTries = 6
let numberOfInputs = 5
let hintNumber = 2
let allInputss= document.querySelectorAll(".inp")
let scoreContainer = document.querySelector("#score")
let score = 0
let theMsg = document.querySelector(".theMsg")
let rsltContainer = document.querySelector(".rslt")
let exitBtn = document.querySelector("#exit")
let continueBtn = document.querySelector("#continue")
let twoBtnsContainer = document.querySelector(".twoBtns")
let helpBtn = document.querySelector(".aide")
let hiddenContainer = document.querySelector(".hiddenContainer")
let mainTitle = document.querySelector(".mainTitle")

function createDivs() {
  hintSpan.innerHTML = hintNumber
  for (i = 1 ; i < numberOfTries + 1 ; i++) {
    let newDiv = document.createElement("div")
    newDiv.className = "tries flex justify-center gap-5 items-center mt-4"
    newDiv.innerHTML = `<h2 class="text-2xl font-bold">Try ${i}</h2>`
    
    for (j = 1 ; j < numberOfInputs + 1 ; j++) {
      let input = document.createElement("input")
      input.className = "inp w-14 h-14 text-3xl font-clear-sans font-semibold text-center uppercase outline-none  bg-gray-600 text-white flex justify-center items-center"
      input.setAttribute("maxlength", "1")
      newDiv.appendChild(input)
    }
    allInputs.appendChild(newDiv)
  }
  allInputs.firstElementChild.classList.add("live")
  disableInputsExceptFirst()
}

createDivs()

function checkWord() {
  let inputs = document.querySelectorAll(".tries.live > .inp")
  let wordGiven = []
  let foundLive = false
  let firstDeadDiv = null

  document.querySelectorAll(".tries").forEach(div => {
    if (!foundLive && div.classList.contains("live")) {
      foundLive = true
      div.classList.remove("live")
      div.classList.add("dead")
      div.querySelectorAll(".inp").forEach(input => {
        input.disabled = true
        wordGiven.push((input.value).toUpperCase())
      })
    } else if (foundLive && div.classList.contains("dead") && !firstDeadDiv) {
      firstDeadDiv = div
    }
  })

  if (firstDeadDiv) {
    firstDeadDiv.classList.remove("dead")
    firstDeadDiv.classList.add("live")
    firstDeadDiv.querySelectorAll(".inp").forEach(input => {
      input.disabled = false
    })
  }

  document.querySelectorAll(".tries.live .inp").forEach(input => {
    wordGiven.push(input.value.toUpperCase())
  })

  let allGreen = true
  inputs.forEach((input, index) => {
    let inputValue = input.value.toUpperCase()
    let correctLetter = wordToGuess[index]
    if (inputValue === correctLetter) {
      input.classList.add("green")
      input.style = "background-color: #00b000;"
    } else if (wordToGuess.includes(inputValue)) {
      input.classList.add("orange")
      input.style = "background-color: #d45222;"
      allGreen = false
    } else {
      input.classList.add("gray")
      input.style= "background-color: #373131;"
      allGreen = false
    }
  })
  checkInputs(allGreen)
}

function toggleClass(){
    rsltContainer.classList.remove("hidden")
    twoBtnsContainer.style.display = "flex"
}

function checkInputs(allGreen) {
  let isGuessed = false
  if (allGreen && hintNumber !== 2) {
    score++
    toggleClass()
    theMsg.classList.add("whitespace-nowrap")
    theMsg.innerHTML = `Congrats! You Guessed The Word Correctly`
    disableAllInputs()
    isGuessed = true
  } else if (allGreen && hintNumber === 2) {
    toggleClass()
    score++
    theMsg.innerHTML = `Great Work You Guessed The Word Right Without Using Any Hint`
    disableAllInputs()
    isGuessed = true
  } else {
    let liveDivs = document.querySelectorAll(".live")
    if (liveDivs.length === 0 && !isGuessed) {
      toggleClass()
      theMsg.innerHTML = `Good Luck Next Time By The Way The Word You Were Looking For is <span class="text-blue-800"> ${wordToGuess.join("")} </span>`
      disableAllInputs()
    }
  }
  if (isGuessed) {
    document.querySelector(".tries.live").classList.replace("live", "dead")
  }
}

function hint() {
  let inputs = document.querySelectorAll(".tries.live > .inp")
  if (hintNumber > 0) {
    hintNumber--
    hintSpan.innerHTML = hintNumber
    if (hintNumber === 0) {
      rsltContainer.classList.remove("hidden")
      rsltContainer.style.left = "500px"
      twoBtnsContainer.style.display = "none"
      theMsg.innerHTML = "You Ran Out Of Hints"
      hintBtn.disabled = true 
      setTimeout(() => {
          rsltContainer.classList.add("hidden")
      }, 1000);
    }

    let enabledInputs = document.querySelectorAll("input:not([disabled])")
    let emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "")

    if (emptyEnabledInputs.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length)
      let randomInput = emptyEnabledInputs[randomIndex]
      let indexToFill = Array.from(enabledInputs).indexOf(randomInput)
      if (indexToFill !== -1) {
        randomInput.value = wordToGuess[indexToFill]
      }
    }
  }
}

function disableInputsExceptFirst() {
  document.querySelectorAll(".tries").forEach(div => {
    if (!div.classList.contains("live")) {
      div.classList.add("dead")
      div.querySelectorAll(".inp").forEach(input => {
        input.disabled = true
      })
    }
  })
}


function disableAllInputs() {
  document.querySelectorAll(".inp").forEach(inp => {
    inp.disabled = true
  })
  checkBtn.disabled = true
  hintBtn.disabled = true
}

  helpBtn.addEventListener('click', function (event) {
    hiddenContainer.classList.toggle('hidden');
    mainTitle.style.opacity = hiddenContainer.classList.contains('hidden') ? "1" : "0";
    let hideContainer = document.querySelector(".hideThisContainer")

    hideContainer.addEventListener("click" , function(){
      hideIt()
    })
  })

  function hideIt() {
    hiddenContainer.classList.add('hidden');
    mainTitle.style.opacity = "1";
}


  exitBtn.addEventListener("click" , function(){
    scoreContainer.innerHTML = 0
    generateNew()
  })

  continueBtn.addEventListener("click" , function(){
    scoreContainer.innerHTML = score;
    generateNew()
    sessionStorage.setItem("guessScore" , score)
    rsltContainer.classList.add("hidden")
  })

  function generateNew(){
      rsltContainer.classList.add("hidden")
      wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase().split('')
      hintNumber = 2
      allInputs.innerHTML = ""
      createDivs()
      checkBtn.disabled = false
      hintBtn.disabled = false
      focus()
  }


function focus(){
  let inputs = document.querySelectorAll('.inp')
  inputs.forEach(input => {
    input.addEventListener("input", function (e) {
      let target = e.target
      let val = target.value
      if (val != "") {
        let next = target.nextElementSibling
        if (next) {
          next.focus()
        }
      }
    })
  })
  
  inputs.forEach(input => {
    input.addEventListener("keyup", function (e) {
      let target = e.target
      let key = e.key.toLowerCase()
  
      if (key == "backspace" || key == "delete") {
        e.preventDefault()
        target.value = ""
        let prev = target.previousElementSibling
        if (prev) {
          prev.focus()
        }
      }
    })
  })  
}

focus()
