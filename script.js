window.addEventListener("load", function () {
  /**
   * @type {HTMLCanvasElement}
   */
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // ctx.fillStyle = 'rgb(148, 41, 139)';
  ctx.strokeStyle = "rgb(231, 231, 146)";
  ctx.lineWidth = 3;
  ctx.shadowColor = "rgba(22, 22, 22, 0.7)";
  ctx.shadowOffsetX = 7;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 5;
  let radius = canvas.width > 900 ? 30 : 15;  
  const inset = 0.5;
  const n = 15;
  let drawing = false;
  let angle = 0;

  function drawShape(x, y, radius, inset, n) {
    ctx.fillStyle = "rgb(79, 95, 61)";
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < n; i++) {
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - radius * inset);
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - radius);
    }
    ctx.restore();
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  drawShape(radius, radius * 1.2, radius * 0.45, 0.1, 5);
  drawShape(100, 100, radius, inset, n);

  window.addEventListener("mousemove", function (e) {
    if (drawing) {
      ctx.save();
      ctx.translate(e.x,e.y);

      ctx.rotate(angle);
      drawShape(radius, radius * 1.2, radius * 0.45, 0.1, 5);
      // drawShape(50, 50, radius, inset, n);//rotate around center point
      ctx.rotate(-angle*2);
      drawShape(0, 0, radius, inset, n);

      angle += 0.1;
      ctx.restore();
    }
  });
  window.addEventListener("mousedown", function (e) {
    drawing = true;
  });
  window.addEventListener("mouseup", function (e) {
    drawing = false;
  });
  window.addEventListener("touchmove", function (e) {
 
    ctx.save();
    ctx.translate(e.touches[0].clientX, e.touches[0].clientY);

    ctx.rotate(angle);
    drawShape(radius, radius * 1.2, radius * 0.45, 0.1, 5);
    // drawShape(50, 50, radius, inset, n);//rotate around center point
    ctx.rotate(-angle*2);
    drawShape(0, 0, radius, inset, n);

    angle += 0.1;
    ctx.restore();
  });
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
     radius = canvas.width > 900 ? 30 : 15;  
     drawShape(radius, radius * 1.2, radius * 0.45, 0.1, 5);
     drawShape(100, 100, radius, inset, n);
  });
});
