'use strict';

const render = (size, canvas) => {
  const ctx = canvas.getContext('2d');

  ctx.canvas.width = size.width;
  ctx.canvas.height = size.height;

  const fns = [
    canvasUtils.renderBackground,
    canvasUtils.renderCircles,
    canvasUtils.renderLogo,
    canvasUtils.renderButton,
    canvasUtils.renderDescription
  ];

  fns.forEach(fn => fn(ctx));
};

const hexschool_canvas_app = ({ canvas, size, render }) => {
  canvas.getContext
    ? render(size, canvas)
    : console.error(
        'This browser does not support canvas.',
        'Falling back to plain cover image.'
      );
};

hexschool_canvas_app({
  canvas: document.getElementById('canvas'),
  size: { width: 1280, height: 800 },
  render
});
