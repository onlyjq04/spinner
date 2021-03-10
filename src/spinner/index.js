(function () {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  this.Spinner = class Spinner {
    static idNow = 0;
    static ids = new Set([]);
    dom = null;
    ctx = null;
    dimension = 0;
    sections = [];
    radius = 0;
    isSpinning = null;

    constructor(dimension, radius) {
      if (!dimension || !radius) {
        throw new Error("Must specify a dimension and a radius value");
      }
      if (radius * 2 > dimension) {
        throw new Error("Radius is too large for dimension");
      }

      this.dimension = dimension;
      this.radius = radius;

      this.center = {
        x: this.dimension / 2,
        y: this.dimension / 2,
      };

      const canvasDom = document.createElement("canvas");
      canvasDom.width = this.dimension;
      canvasDom.height = this.dimension;
      canvasDom.setAttribute("id", "spinner-" + Spinner.idNow);

      this.dom = canvasDom;
      this.ctx = canvasDom.getContext("2d");

      this.dom.addEventListener("mousedown", (e) => {
        this.getMousePosition(e);
      });

      Spinner.ids.add(Spinner.idNow++);
    }

    draw = (color) => {
      if (this.radius > this.dimension) {
        throw new Error(
          `Cannot draw spinner which is larger than the dimension ${this.dimension}`
        );
      } else {
        // draw circle
        this.ctx.strokeStyle = color || "#000";
        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();

        return this;
      }
    };

    spin = (degree) => {
      this.dom.style.transform = `rotate(${degree}deg)`;
    };

    startSpin = (stepDegree) => {
      let curDeg = 0;
      const spinner = () => {
        let degree = curDeg + stepDegree;
        if (degree > 360) {
          degree = Math.abs(degree - 360);
        }
        this.spin(degree);
        curDeg = degree;
        this.isSpinning = setTimeout(() => {
          clearTimeout(this.isSpinning);
          spinner();
        }, 50);
      };

      spinner();
    };

    stopSpin = () => {
      clearTimeout(this.isSpinning);
    };

    addSections = (arr) => {
      Array.prototype.push.apply(this.sections, arr);
    };

    drawSections = () => {
      const len = this.sections.length;

      if (!len) {
        throw new Error("no sections");
      }

      const step = (2 * Math.PI) / len;

      let beginAngle = 0;
      let endAngle = 0;

      this.sections.forEach((s, index) => {
        beginAngle = endAngle;
        endAngle = step * (index + 1);

        this.ctx.beginPath();
        this.ctx.fillStyle = getRandomColor();
        this.ctx.moveTo(this.center.x, this.center.y);

        this.ctx.arc(
          this.center.x,
          this.center.y,
          this.radius,
          beginAngle,
          endAngle
        );
        this.ctx.lineTo(this.center.x, this.center.y);

        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
      });
    };

    getMousePosition = (event) => {
      let rect = this.dom.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      console.log("Coordinate x: " + x, "Coordinate y: " + y);
    };
  };
})();
