'use strict';

const fillContext = (style, shape, ctx) => {
  ctx.fillStyle = style;
  shape ? ctx.fill(shape) : ctx.fill();
};

const strokeContext = (style, ctx) => {
  ctx.strokeStyle = style;
  ctx.stroke();
};

const rotateContext = (degree, ctx) => {
  ctx.rotate(degree);
};

const setLineWidth = (width, ctx) => (ctx.lineWidth = width);

const drawArc = props => ctx => {
  const {
    x = 0,
    y = 0,
    lineWidth,
    fill,
    stroke,
    radius,
    startAngle,
    endAngle
  } = props;

  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);

  ctx.save();
  lineWidth && setLineWidth(lineWidth, ctx);
  fill && fillContext(fill, null, ctx);
  stroke && strokeContext(stroke, ctx);
  ctx.restore();
};

const drawBackground = props => ctx => {
  const { x = 0, y = 0, fill, size } = props;

  const shape = new Path2D();
  shape.rect(x, y, size.width, size.height);

  ctx.save();
  fill && fillContext(fill, shape, ctx);
  ctx.restore();
};

const drawCircle = props => ctx =>
  drawArc({ ...props, startAngle: 0, endAngle: Math.PI * 2 })(ctx);

const drawImage = props => ctx => {
  const { x, y, src } = props;

  const logo = new Image();
  logo.src = src;
  logo.onload = () => ctx.drawImage(logo, x, y);
};

const drawLine = props => ctx => {
  const { x1, y1, x2, y2, stroke, lineWidth } = props;

  ctx.save();
  lineWidth && setLineWidth(lineWidth, ctx);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  strokeContext(stroke, ctx);
  ctx.restore();
};

const drawPath = props => ctx => {
  const { x = 0, y = 0, path, fill, stroke, rotate } = props;

  const d = `M ${x},${y} `
    .concat(path.map(point => `${x + point.x},${y + point.y}`).join(' '))
    .concat(' Z');

  const shape = new Path2D(d);

  ctx.save();
  rotate && rotateContext(rotate, ctx);
  fill && fillContext(fill, shape, ctx);
  stroke && strokeContext(stroke, ctx);
  ctx.restore();
};

const drawText = props => ctx => {
  const {
    x = 0,
    y = 0,
    fill = '#fff',
    fontSize = 20,
    lineHeight = 1.5,
    textAlign = 'left',
    text = ''
  } = props;

  ctx.save();

  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = textAlign;
  ctx.fillStyle = fill;

  let currentY = y;
  text.split('<br>').forEach(line => {
    ctx.fillText(line, x, currentY);
    currentY = currentY + fontSize * lineHeight;
  });

  ctx.restore();
};

window.canvasLib = {
  drawArc,
  drawBackground,
  drawCircle,
  drawImage,
  drawLine,
  drawPath,
  drawText
};
