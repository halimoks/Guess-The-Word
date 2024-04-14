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
let hintNumber = 3
let mainTitle = document.querySelector(".mainTitle")
let theMsg = document.querySelector(".theMsg")
let helpBtn = document.querySelector(".aide")
let hiddenContainer = document.querySelector(".hiddenContainer")

function createDivs() {
  hintSpan.innerHTML = hintNumber
  for (i = 1 ; i < numberOfTries + 1 ; i++) {
    let newDiv = document.createElement("div")
    newDiv.className = "tries flex"
    newDiv.innerHTML = `<h2 class="text-lg font-bold">Try ${i}</h2>`

    for (j = 1 ; j < numberOfInputs + 1 ; j++) {
      let input = document.createElement("input")
      input.className = "inp"
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
    let inputValue = input.value.trim().toUpperCase()
    let correctLetter = wordToGuess[index]
    if (inputValue === correctLetter) {
      input.classList.add("green")
    } else if (wordToGuess.includes(inputValue)) {
      input.classList.add("orange")
      allGreen = false
    } else {
      input.classList.add("gray")
      allGreen = false
    }
  })
  checkInputs(allGreen)
}

function checkInputs(allGreen) {
  let isGuessed = false
  if (allGreen && hintNumber !== 3) {
    theMsg.innerHTML = `Congrats! You Guessed The Word Correctly`
    disableAllInputs()
    isGuessed = true
  } else if (allGreen && hintNumber === 3) {
    theMsg.innerHTML = `Great Work You Guessed The Word Right Without Using Any Hint`
    disableAllInputs()
    isGuessed = true
  } else {
    let liveDivs = document.querySelectorAll(".live")
    if (liveDivs.length === 0 && !isGuessed) {
      theMsg.innerHTML = `Good Luck Next Time By The Way The Word You Were Looking For is <span class="text-red-800"> ${wordToGuess.join("")} </span>`
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
      theMsg.innerHTML = "You Ran Out Of Hints"
      hintBtn.disabled = true
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
  event.stopPropagation()
  hiddenContainer.classList.toggle('hidden')
  if (hiddenContainer.classList.contains("hidden")) {
    mainTitle.style.opacity = "1"
  } else {
    mainTitle.style.opacity = "0"
  }
})

document.addEventListener('click', function (event) {
  const isClickInsideContainer = hiddenContainer.contains(event.target)
  const isClickInsideBtn = event.target === helpBtn

  if (!isClickInsideContainer && !isClickInsideBtn) {
    hiddenContainer.classList.add('hidden')
     mainTitle.style.opacity = "1"
  }
})



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
