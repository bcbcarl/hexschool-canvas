'use strict';

const renderBackground = ctx => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const background = {
    fill: '#011d2d',
    size: { width, height }
  };

  const circle = (radius => ({
    x: width * 0.9 - radius,
    y: height * 0.1 + radius,
    fill: '#f3ae66',
    radius
  }))(width * 0.04);

  const polygon = {
    x: width * 0.04,
    y: height * 0.2,
    fill: '#e54860',
    path: [
      { x: 25, y: 60 },
      { x: 100, y: 85 },
      { x: 130, y: 40 },
      { x: 125, y: 0 },
      { x: 65, y: -25 }
    ]
  };

  const triangle = {
    x: width * 0.75,
    y: height * 0.75,
    rotate: (7 * Math.PI) / 180,
    fill: '#3676bb',
    path: [{ x: 120, y: 0 }, { x: 60, y: -103.92 }]
  };

  const fns = [
    canvasLib.drawBackground(background),
    canvasLib.drawCircle(circle),
    canvasLib.drawPath(polygon),
    canvasLib.drawPath(triangle)
  ];

  fns.forEach(fn => fn(ctx));
};

const renderButton = ctx => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const baseX = width * 0.46;
  const baseY = height * 0.61;

  const leftArc = {
    x: baseX,
    y: baseY,
    lineWidth: 2,
    radius: 18,
    stroke: '#fff',
    startAngle: Math.PI * 0.5,
    endAngle: Math.PI * 1.5
  };

  const rightArc = {
    x: baseX + 108,
    y: baseY,
    lineWidth: 2,
    radius: 18,
    stroke: '#fff',
    startAngle: -Math.PI * 0.5,
    endAngle: Math.PI * 0.5
  };

  const topBorder = {
    x1: baseX - 1,
    y1: baseY - 18,
    x2: baseX + 109,
    y2: baseY - 18,
    lineWidth: 2,
    stroke: '#fff'
  };
  const bottomBorder = {
    x1: baseX - 1,
    y1: baseY + 18,
    x2: baseX + 109,
    y2: baseY + 18,
    lineWidth: 2,
    stroke: '#fff'
  };

  const startText = {
    x: baseX,
    y: baseY + 7,
    text: 'Start Game'
  };

  const fns = [
    canvasLib.drawArc(leftArc),
    canvasLib.drawArc(rightArc),
    canvasLib.drawLine(topBorder),
    canvasLib.drawLine(bottomBorder),
    canvasLib.drawText(startText)
  ];

  fns.forEach(fn => fn(ctx));
};

const renderCircles = ctx => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const outerCircle = {
    x: width * 0.5,
    y: height * 0.5,
    lineWidth: 2,
    stroke: '#465a66',
    radius: height * 0.5 * 0.85
  };

  const innerCircle = {
    x: width * 0.5,
    y: height * 0.5,
    lineWidth: 3,
    stroke: '#fff',
    radius: height * 0.35 * 0.85
  };

  const fns = [
    canvasLib.drawCircle(outerCircle),
    canvasLib.drawCircle(innerCircle)
  ];

  fns.forEach(fn => fn(ctx));
};

const renderDescription = ctx => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const text = {
    x: width * 0.02,
    y: height * 0.89,
    text:
      '你身負著運送能量電池的任務' +
      '<br>' +
      '卻遭到幾何星人的埋伏' +
      '<br>' +
      '請協助從他們的手中奪回能量電池'
  };

  canvasLib.drawText(text)(ctx);
};

const renderLogo = ctx => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  const image = {
    x: width * 0.45,
    y: height * 0.37,
    src: 'logo.svg'
  };

  const text = {
    x: width * 0.425,
    y: height * 0.53,
    fontSize: 28,
    text: 'Radio Defense'
  };

  [canvasLib.drawImage(image), canvasLib.drawText(text)].forEach(fn => fn(ctx));
};

window.canvasUtils = {
  renderBackground,
  renderButton,
  renderCircles,
  renderDescription,
  renderLogo
};
