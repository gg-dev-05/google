const FADEOUT_TIME = 1000;
window.onload = () => {
  let touch = false;
  if ("ontouchstart" in document.documentElement) {
    console.log("USING TOUCH SCREEN MODE");
    touch = true;
  }
  const grid = document.querySelector("#grid");
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}-${j}`;
      if (!touch) {
        cell.onmouseenter = () => {
          cell.classList.add("animate");
          const x = neighbours(i, j);
          for (let p = 0; p < 4; p++) {
            document
              .querySelector(`#cell-${x[p][0]}-${x[p][1]}`)
              ?.classList.add("animate");
          }
          setTimeout(() => {
            cell.classList.remove("animate");
            const x = neighbours(i, j);
            for (let p = 0; p < 4; p++) {
              document
                .querySelector(`#cell-${x[p][0]}-${x[p][1]}`)
                ?.classList.remove("animate");
            }
          }, FADEOUT_TIME);
        };
      } else {
        cell.addEventListener("touchstart", (e) => {
          touchFunc(e);
        });
        cell.addEventListener("touchend", (e) => {
          touchFunc(e);
        });
        cell.addEventListener("touchcancel", (e) => {
          touchFunc(e);
        });
        cell.addEventListener("touchmove", (e) => {
          touchFunc(e);
        });
      }
      grid.appendChild(cell);
    }
  }
};

function neighbours(i, j) {
  return [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ];
}

function random() {
  return Math.floor(Math.random() * random_limit());
}

function random_limit() {
  return Math.floor(Math.random() * 50);
}
function touchFunc(e) {
  const id = e.target.id;
  const [, x, y] = id.split("-");
  document.querySelector(`#${id}`)?.classList.add("animate");
  const elements = [[x, y]];
  for (let count = 0; count < 10; count++) {
    elements.push([parseInt(x) + random(), parseInt(y) + random()]);
  }
  for (let count = 0; count < 10; count++) {
    elements.push([parseInt(x) - random(), parseInt(y) - random()]);
  }
  for (let count = 0; count < 10; count++) {
    elements.push([parseInt(x) + random(), parseInt(y) - random()]);
  }
  for (let count = 0; count < 10; count++) {
    elements.push([parseInt(x) - random(), parseInt(y) + random()]);
  }
  console.log(elements);
  for (let p = 0; p < elements.length; p++) {
    setTimeout(() => {
      document
        .querySelector(`#cell-${elements[p][0]}-${elements[p][1]}`)
        .classList.add("animate");
    }, p * 10);
  }
  setTimeout(() => {
    for (let p = 0; p < elements.length; p++) {
      setTimeout(() => {
        document
          .querySelector(`#cell-${elements[p][0]}-${elements[p][1]}`)
          .classList.remove("animate");
      }, p * 100);
    }
  }, FADEOUT_TIME);
  // setTimeout(() => {
  //   document.querySelector(`#${id}`)?.classList.remove("animate");
  //   for (let i = x; i >= 0; i--) {
  //     setTimeout(() => {
  //       document
  //         .querySelector(`#cell-${i}-${j}`)
  //         ?.classList.remove("animate");
  //     }, 10 * i);
  //   }
  // }, FADEOUT_TIME);
}
