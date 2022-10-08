// const timeouts = makeArray(20, 20);
window.onload = () => {
  const grid = document.querySelector("#grid");
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}-${j}`;
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
        }, 1000);
      };
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

function makeArray(a, b) {
  let arr = new Array(a);
  for (let i = 0; i < a; i++) {
    arr[i] = new Array(b);
  }
  return arr;
}
