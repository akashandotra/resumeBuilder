import { singleEducation, singleProject } from "./resumeConstants.js";

const RESUME_STEPS = [
  "PERSONAL_SECTION",
  "EDUCATIONAL_SECTION",
  "PROJECT_SECTION",
  "SUMMARY_SECTION",
  "SKILL_SECTION",
];
let ACTIVE_STEP_INDEX = 0;
const domContentLoadedEvent = (event) => {
  //Show Personal section in beginning
  handleShowCurrentForm();

  //Handle click of next button
  const nextButton = document.querySelector("#NEXT_BUTTON");
  nextButton.addEventListener("click", handleNextClick);

  //Handle click of previous button
  const previousButton = document.querySelector("#PREVIOUS_BUTTON");
  previousButton.addEventListener("click", handlePreviousClick);

  //handle add education
  const addEducation = document.querySelector("#ADD_EDUCATION");
  addEducation.addEventListener("click", handleAddEducationClick);

  //remove education
  const removeEducation = document.querySelector("#DELETE_EDUCATION");
  removeEducation.addEventListener("click", handleRemoveEducationClick);

  //handle add project
  const addProject = document.querySelector("#ADD_PROJECT");
  addProject.addEventListener("click", handleAddProjectClick);

  //remove project
  const removeProject = document.querySelector("#DELETE_PROJECT");
  removeProject.addEventListener("click", handleRemoveProjectClick);
};
const handleRemoveProjectClick = () => {
  const educationContainer = document.querySelector("#PROJECT_CONTENT");
  if (educationContainer.children.length > 1) {
    const childIndexToRemove =
      educationContainer.childNodes[educationContainer.children.length - 1];
    childIndexToRemove.parentNode.removeChild(childIndexToRemove);
  }
};
const handleAddProjectClick = () => {
  const singleChildSection = document.createElement("div");
  singleChildSection.classList.add("singleChildSection");
  singleChildSection.innerHTML = singleProject;

  document.querySelector("#PROJECT_CONTENT").appendChild(singleChildSection);
};
const handleRemoveEducationClick = () => {
  const educationContainer = document.querySelector("#EDUCATION_CONTENT");
  if (educationContainer.children.length > 1) {
    const childIndexToRemove =
      educationContainer.childNodes[educationContainer.children.length - 1];
    childIndexToRemove.parentNode.removeChild(childIndexToRemove);
  }
};
const handleAddEducationClick = () => {
  const singleChildSection = document.createElement("div");
  singleChildSection.classList.add("singleChildSection");
  singleChildSection.innerHTML = singleEducation;

  document.querySelector("#EDUCATION_CONTENT").appendChild(singleChildSection);
};
/**
 * Increment current step if steps available
 */
const handleNextClick = () => {
  if (ACTIVE_STEP_INDEX + 1 < RESUME_STEPS.length) {
    const currentStepId = `#${RESUME_STEPS[ACTIVE_STEP_INDEX]}`;
    //validate form
    let isValidated = true;
    document.querySelectorAll(`${currentStepId} input`).forEach((input) => {
      if (input.value.length === 0) {
        isValidated = false;
      }
    });
    if (isValidated) {
      ACTIVE_STEP_INDEX = ACTIVE_STEP_INDEX + 1;
      handleShowCurrentForm();
    } else {
      alert("Please fill all fields");
    }
  } else {
    if (isValidated) {
      setLocalStorage();
    } else {
      alert("Please fill all fields");
    }
  }
};
const setLocalStorage = () => {
  const fullName = document.querySelector("[name=fullName]").value;
  const address = document.querySelector("[name=address]").value;
  const phone = document.querySelector("[name=phone]").value;
  const email = document.querySelector("[name=email]").value;
  const achievements = document.querySelector("[name=achievements]").value;
  const summary = document.querySelector("[name=summary]").value;
  const skills = document.querySelector("[name=skills]").value;

  const educationArray = [];
  const projectArray = [];

  const skillArray = skills.trim().split("\n");

  const degree = document.querySelectorAll("[name=degree]");
  const branch = document.querySelectorAll("[name=branch]");
  const college = document.querySelectorAll("[name=college]");
  const percentage = document.querySelectorAll("[name=percentage]");
  const startYearEducation = document.querySelectorAll(
    "[name=startYearEducation]"
  );
  const endYearEducation = document.querySelectorAll("[name=endYearEducation]");

  for (let itr = 0; itr < degree.length; itr++) {
    educationArray.push({
      degree: degree[itr].value,
      branch: branch[itr].value,
      college: college[itr].value,
      percentage: percentage[itr].value,
      startYearEducation: startYearEducation[itr].value,
      endYearEducation: endYearEducation[itr].value,
    });
  }
  console.log(educationArray);

  const projectName = document.querySelectorAll("[name=projectName]");
  const projectDate = document.querySelectorAll("[name=projectDate]");
  const projectDescription = document.querySelectorAll(
    "[name=projectDescription]"
  );

  for (let itr = 0; itr < projectName.length; itr++) {
    projectArray.push({
      projectName: projectName[itr].value,
      projectDate: projectDate[itr].value,
      projectDescription: projectDescription[itr].value,
    });
  }
  console.log(projectArray);

  const finalObject = {
    fullName: fullName,
    address: address,
    phone: phone,
    email: email,
    achievements: achievements,
    summary: summary,
    educationArray: educationArray,
    projectArray: projectArray,
    skillArray: skillArray,
  };
  console.log("Final object");
  console.log(finalObject);
  localStorage.setItem("resumeObj", JSON.stringify(finalObject));

  window.location.href = "/resume";
};
/**
 * Decrement current step if step is not zero
 */
const handlePreviousClick = () => {
  if (ACTIVE_STEP_INDEX - 1 >= 0) {
    ACTIVE_STEP_INDEX = ACTIVE_STEP_INDEX - 1;
    handleShowCurrentForm();
  }
};
/**
 * Show active form step, hide others
 */
const handleShowCurrentForm = () => {
  const singleSectionList = document.querySelectorAll(".singleSection");
  singleSectionList.forEach((divItem) => {
    divItem.classList.add("hidden");
  });
  document
    .querySelector(`#${RESUME_STEPS[ACTIVE_STEP_INDEX]}`)
    ?.classList?.remove("hidden");
};

window.addEventListener("DOMContentLoaded", domContentLoadedEvent);
