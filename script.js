const pannable = (elViewport) => {
  const elCanvas = elViewport.firstElementChild;
  const offset = {x: 0, y: 0};
  let isPan = false;
  let scale = window.visualViewport.height/elCanvas.clientHeight; // Make sure the entire image is visible on load
  elCanvas.style.scale = scale;

  const panStart = (ev) => {
    ev.preventDefault();
    isPan = true;
    document.body.style.cursor = "grabbing";
  };

  const panMove = (ev) => {
    if (!isPan) {
      return;
    }
    offset.x += ev.movementX;
    offset.y += ev.movementY;
    elCanvas.style.translate = `${offset.x}px ${offset.y}px`;
  };

  const panEnd = (ev) => {
    isPan = false;
    document.body.style.cursor = "grab";
  }

  const wheel = (ev) => {
    let delta = ev.wheelDelta / 2000;
    scale += scale * delta;
    elCanvas.style.scale = scale;

    offset.x +=  offset.x * delta;
    offset.y += offset.y * delta;
    elCanvas.style.translate = `${offset.x}px ${offset.y}px`;

  };
  elViewport.addEventListener("pointerdown", panStart);
  addEventListener("pointermove", panMove);
  addEventListener("pointerup", panEnd);
  elViewport.addEventListener("wheel", wheel);
};

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".viewport").forEach(pannable);
  window.addEventListener("resize", (ev) => {
    //html element:
    document.querySelector(".viewport").style.height = (window.visualViewport.height) + "px";
  });
  document.querySelector(".viewport").style.height = (window.visualViewport.height) + "px";
});
