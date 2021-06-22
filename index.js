const button = document.getElementById("fetch"),
  present = document.getElementById("present"),
  [main] = document.getElementsByTagName("main");

const getPosts = async () => {
  try {
    const response = await fetch("http://localhost:3000/profile");
    if (!response.ok) return;

    const { name, user } = await response.json(),
      users = await fetch(`http://localhost:3000/controls?user=${user}`);

    if (!users.ok) return;

    const controls = await users.json();
    presentData(controls);
    createControls(controls);
  } catch (error) {
    console.error(error);
  }
};

const createControls = (controls) => {
  controls.forEach((control) => {
    let div = document.createElement("div");
    div.className = "control";
    div.style.width = `${control.percent}%`;
    div.innerText = control.value;
    main.appendChild(div);
  });
};

const presentData = (data) => {
  present.innerText = JSON.stringify(data, null, 2);
};

button.addEventListener("click", getPosts);
