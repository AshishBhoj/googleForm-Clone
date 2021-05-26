function localStorageUpdate() {
  question = document.getElementById("question").value;
  selectOption = document.getElementById("selectOption").value;
  if (selectOption == "ShortAnswer") {
    optionBodyValue = document.getElementById("shortAnswerText").value;
  } else if (selectOption == "Paragraph") {
    optionBodyValue = document.getElementById("paragraphText").value;
  } else if (selectOption == "Date") {
    optionBodyValue = document.getElementById("date").value;
  } else if (selectOption == "Time") {
    optionBodyValue = document.getElementById("time").value;
  } else if (selectOption == "Image") {
    optionBodyValue = document.getElementById("image").value.slice(12);
  } else if (selectOption == "Radio") {
    radio = document.getElementsByName("radio");
    let radio_value = [];
    for (let i = 0; i < radio.length; i++) {
      radio_value.push(radio[i].value);
    }
    optionBodyValue = radio_value;
  } else {
    checkbox = document.getElementsByName("checkbox");
    let checkbox_value = [];
    for (let i = 0; i < checkbox.length; i++) {
      checkbox_value.push(checkbox[i].value);
    }
    optionBodyValue = checkbox_value;
  }
  if (localStorage.getItem("questionList") == null) {
    questionArray = [];
    questionArray.push({
      question: question,
      selectOption: selectOption,
      optionBodyValue: optionBodyValue,
    });
    localStorage.setItem("questionList", JSON.stringify(questionArray));
  } else {
    questionArray = JSON.parse(localStorage.getItem("questionList"));
    questionArray.push({
      question: question,
      selectOption: selectOption,
      optionBodyValue: optionBodyValue,
    });
    localStorage.setItem("questionList", JSON.stringify(questionArray));
  }
  addQuestionBlock();
}

function addQuestionBlock() {
  if (localStorage.getItem("questionList") == null) {
    questionArray = [];
    localStorage.setItem("questionList", JSON.stringify(questionArray));
  } else {
    questionArray = JSON.parse(localStorage.getItem("questionList"));
  }
  let questionBlock = document.getElementById("question__added");
  let str = "";
  questionArray.forEach((element, index) => {
    str += `<div class="accordion mb-3" id="question${index}">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <input
                      type="text"
                      name="question"
                      value="${element.question}"
                    />
                    <select
                      class="form-select"
                    >
                      <option value="${element.selectOption}" selected>${element.selectOption}</option>
                    </select>
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    ${element.optionBodyValue}
                  </div>
                  <button
                      class="btn btn-outline-primary btn-sm delete__question"
                      onclick="deleteQuestion(${index})"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                </div>
              </div>
            </div>
          </div>
      `;
  });
  questionBlock.innerHTML = str;
}

addQuestion = document.getElementById("addQuestion");
addQuestion.addEventListener("click", () => {
  localStorageUpdate();
});
addQuestionBlock();

function optionBodyContent() {
  selectOption = document.getElementById("selectOption").value;
  optionBody = document.getElementById("optionBody");

  switch (selectOption) {
    case "ShortAnswer":
      optionBody.innerHTML = `<textarea class="form-control" id="shortAnswerText" rows="2" placeholder="Short answer text"></textarea>`;
      break;
    case "Paragraph":
      optionBody.innerHTML = `<textarea class="form-control" id="paragraphText" rows="4" placeholder="Long answer text"></textarea>`;
      break;
    case "Date":
      optionBody.innerHTML = `<span class=text-muted>Date </span><input type="date" id="date" name="date">`;
      break;
    case "Time":
      optionBody.innerHTML = `<span class=text-muted>Time </span><input type="time" id="time" name="time">`;
      break;
    case "Image":
      optionBody.innerHTML = `<input type="file" id="image" accept="image/*" onchange="preview_image(event)">
      <img id="output"/>`;
      break;
    case "Radio":
      let i = 0;
      i += 1;
      let id = `radioOption${i}`;
      optionBody.innerHTML = `<i class="far fa-circle"></i>
      <input class="option__body" type="text" name="radio" id="${id}" placeholder="option">
      <button class="btn btn-outline-primary btn-sm add__option" onclick="addRadioOption()"><i class="fas fa-plus"></i></button>`;
      break;
    case "MultipleChoice":
      let j = 0;
      j += 1;
      let mulId = `multipleOption${j}`;
      optionBody.innerHTML = `<i class="far fa-square"></i>
      <input class="option__body" type="text" name="checkbox" id="${mulId}" placeholder="option">
      <button class="btn btn-outline-primary btn-sm add__option" onclick="addMultipleOption()"><i class="fas fa-plus"></i></button>`;
      break;
  }
}

function preview_image(event) {
  console.log("Image Added");
  let reader = new FileReader();
  reader.onload = function () {
    let output = document.getElementById("output");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

let i = 1;
function addRadioOption() {
  i += 1;
  let id = `radioOption${i}`;
  addingOption = document.getElementById("optionBody");
  addingOption.innerHTML += `<i class="far fa-circle"></i>
  <input class="option__body" type="text" name="radio" id='${id}' placeholder='option'>
  <button class="btn btn-outline-primary btn-sm add__option" onclick="addRadioOption()"><i class="fas fa-plus"></i></button>
  `;
}

let j = 1;
function addMultipleOption() {
  j += 1;
  let mulId = `multipleOption${j}`;
  addingOption = document.getElementById("optionBody");
  addingOption.innerHTML += `<i class="far fa-square"></i>
  <input class="option__body" type="text" name="checkbox" id='${mulId}' placeholder='option'>
  <button class="btn btn-outline-primary btn-sm add__option" onclick="addMultipleOption()"><i class="fas fa-plus"></i></button>
  `;
}

function deleteQuestion(index) {
  questionArray = JSON.parse(localStorage.getItem("questionList"));
  questionArray.splice(index, 1);
  localStorage.setItem("questionList", JSON.stringify(questionArray));
  addQuestionBlock();
}

function clearQuestions() {
  if (confirm("Do you really want to delete Question List?"))
    localStorage.clear();
  addQuestionBlock();
}
