define([
  "dojo/_base/declare",
  "mxui/widget/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dojo/_base/lang",
  "AnglesJS/lib/fhtml",
  "dojo/text!AnglesJS/widget/template/AnglesJS.html"
], function(
  declare,
  _WidgetBase,
  _TemplatedMixin,
  lang,
  fhtml,
  /*_jQuery,*/ widgetTemplate
) {
  "use strict";
  // var $ = _jQuery.noConflict(true);
  return declare("AnglesJS.widget.AnglesJS", [_WidgetBase, _TemplatedMixin], {
    // _TemplatedMixin will create our dom node using this HTML template.
    templateString: widgetTemplate,
    // DOM elements
    canvas: null,
    // Parameters configured in the Modeler.
    messageString: "",
    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
    _handles: null,
    _contextObj: null,

    // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
    constructor: function() {
      this._handles = [];
    },

    // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
    postCreate: function() {
      let ANGLES = [14, 14, 14];
      let RECURSION_RATE = 3;
      const CURSOR = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
      };

      const PI = Math.PI;
      const TAU = PI * 2;
      const r = () => Math.random();
      const angle2 = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
      const distance2 = (x1, y1, x2, y2) =>
        Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

      const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

      const radius = () => Math.min(w, h) * 0.1;

      const vec2 = ({ x, y }) => [x * radius(), y * radius()];

      const clamp = (min, max) => value => Math.max(Math.min(max, value), min);

      const anglesMin = 1;
      const anglesMax = 20;
      const recursionMin = 1;
      const recursionMax = 3;
      const clampAngles = clamp(anglesMin, anglesMax);
      const clampRecursion = clamp(recursionMin, recursionMax);

      let w = 800;
      let h = 600;

      const ctx = canvas.getContext("2d");

      const setCanvasSize = () => {
        canvas.width = w = window.innerWidth;
        canvas.height = h = window.innerHeight;
      };
      setCanvasSize();

      canvas.addEventListener("mousemove", ({ x, y }) => {
        const { top, left, width, height } = canvas.getBoundingClientRect();
        CURSOR.targetX = x - left - width / 2;
        CURSOR.targetY = y - top - height / 2;
      });
      canvas.addEventListener("mouseleave", ({ x, y }) => {
        CURSOR.targetX = 0;
        CURSOR.targetY = 0;
      });
      window.addEventListener("resize", setCanvasSize);

      const html = fhtml.default;
      html`
        <div class="controls">
          ${f =>
            f.map.state.angles(
              (_, i) => html`
                <div
                  class=${f => ({
                    control: true,
                    "control--drawn": f.state.recursion() === i + 1,
                    "control--inactive": f.state.recursion() <= i
                  })}
                >
                  ${f => i + 1}st iteration:
                  <input
                    type="range"
                    :min=${f => f.state.anglesMin()}
                    :max=${f => f.state.anglesMax()}
                    .value=${f => f.prop.value()}
                    @input=${f =>
                      (ANGLES[i] = f.prop.value(parseInt(f.node.value)))}
                  />
                  <span>${f => f.prop.value()}</span>
                </div>
              `
            )}
          <div class="control">
            Recursion:
            <input
              type="range"
              :min=${f => f.state.recursionMin()}
              :max=${f => f.state.recursionMax()}
              .value=${f => f.state.recursion()}
              @input=${f =>
                (RECURSION_RATE = f.state.recursion(parseInt(f.node.value)))}
            />
            <span>${f => f.state.recursion()}</span>
          </div>
        </div>
      `
        .state({
          angles: ANGLES.map(n => ({
            value: n
          })),
          anglesMin,
          anglesMax,
          recursion: RECURSION_RATE,
          recursionMin,
          recursionMax
        })
        .mount(controls);

      let points;
      const update = () => {
        CURSOR.x = lerp(CURSOR.x, CURSOR.targetX, 0.1);
        CURSOR.y = lerp(CURSOR.y, CURSOR.targetY, 0.1);
        points = ANGLES.map(angles =>
          [...new Array(angles + 1)].map((p, i) => ({
            x: Math.cos((TAU / angles) * i),
            y: Math.sin((TAU / angles) * i)
          }))
        );
      };

      const drawPoint = (recursion = 0) => {
        const next = recursion + 1;
        return (p, i, arr) => {
          ctx.save();
          let [x, y] = vec2(p);
          const distance = distance2(x, y, CURSOR.x, CURSOR.y);
          const angle = angle2(x, y, CURSOR.x, CURSOR.y);

          x -= Math.cos(angle) * Math.log(Math.pow(distance, TAU));
          y -= Math.sin(angle) * Math.log(Math.pow(distance, TAU));
          const angleToCenter = angle2(0, 0, x, y);

          ctx.translate(x, y);
          //ctx.rotate(angleToCenter)

          if (recursion < RECURSION_RATE - 1) {
            points[next].forEach(drawPoint(next));
          } else {
            if (i === 0) ctx.moveTo(0, 0);
            else ctx.lineTo(0, 0);
          }
          ctx.restore();
        };
      };

      const render = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(0,0,0,.2)`;
        ctx.save();
        ctx.translate(w * 0.5, h * 0.5);
        ctx.beginPath();
        points[0].forEach(drawPoint(0));
        ctx.stroke();
        ctx.restore();
      };

      const loop = () => {
        update();
        render();
        window.requestAnimationFrame(loop);
      };

      loop();

      this._updateRendering();
      this._setupEvents();
    },

    // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
    update: function(obj, callback) {
      this._contextObj = obj;
      this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
    },

    enable: function() {},
    disable: function() {},
    resize: function(box) {},
    // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
    uninitialize: function() {
      // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
    },

    // Attach events to HTML dom elements
    _setupEvents: function() {},

    // Rerender the interface.
    _updateRendering: function(callback) {
      if (this._contextObj !== null) {
      } else {
      }
      // The callback, coming from update, needs to be executed, to let the page know it finished rendering
      this._executeCallback(callback, "_updateRendering");
    },
    _executeCallback: function(cb, from) {
      if (cb && typeof cb === "function") {
        cb();
      }
    }
  });
});

require(["AnglesJS/widget/AnglesJS"]);
