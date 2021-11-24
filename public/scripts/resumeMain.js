const domContentLoadedEvent = (event) => {
  populateResume();
  const Download = document.querySelector("#Download");
  Download.addEventListener("click", () => {
    window.print();
  });
};
const populateResume = () => {
  const strResumeObj = localStorage?.resumeObj;
  if (strResumeObj) {
    const resumeObj = JSON.parse(strResumeObj);

    const fullName = document.querySelector("#fullName");
    const address = document.querySelector("#address");
    const phone = document.querySelector("#phone");
    const email = document.querySelector("#email");
    const achievements = document.querySelector("#achievements");
    const summary = document.querySelector("#summary");
    const skills = document.querySelector("#skills");
    const education = document.querySelector("#education");
    const project = document.querySelector("#project");

    fullName.innerHTML = resumeObj.fullName;
    address.innerHTML = resumeObj.address;
    email.innerHTML = resumeObj.email;
    phone.innerHTML = resumeObj.phone;
    summary.innerHTML = resumeObj.summary;
    achievements.innerHTML = resumeObj.achievements;

    resumeObj.skillArray.map((skill) => {
      skills.innerHTML += skill + "</br>";
    });
    education.innerHTML = ``;
    resumeObj.educationArray.forEach((educationItem) => {
      education.innerHTML += `
      <div class="singleItem">
        <div class="itemTitleFlex">
          <p><strong>${educationItem.degree}</strong></p>
          <p><strong>${
            educationItem.startYearEducation +
            "-" +
            educationItem.endYearEducation
          }</strong></p>
        </div>
        <ul>
          <li><p>${educationItem.branch}</p></li>
          <li><p>${educationItem.college}</p></li>
          <li><p>Grade: ${educationItem.percentage}</p></li>
        </ul>
      </div>`;
    });

    project.innerHTML = ``;
    resumeObj.projectArray.forEach((projectItem) => {
      project.innerHTML += `
      <div class="singleItem">
        <div class="itemTitleFlex">
          <p>
            <strong>${projectItem.projectName}</strong>
          </p>
          <p>
            <strong>${projectItem.projectDate}</strong>
          </p>
        </div>
        <ul class="projectDescriptionList">
          ${projectItem.projectDescription
            .split("\n")
            .map((item) => `<li>${item.trim()}</li>`)
            .join("")}
        </ul>
      </div>
      `;
    });
  }
};
window.addEventListener("DOMContentLoaded", domContentLoadedEvent);
