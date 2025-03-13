"use client";
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.MovingBorder = exports.Button = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var cn_1 = require("@/utils/cn");
function Button(_a) {
    var _b = _a.borderRadius, borderRadius = _b === void 0 ? "1.75rem" : _b, children = _a.children, _c = _a.as, Component = _c === void 0 ? "button" : _c, // Type assertion for default value
    containerClassName = _a.containerClassName, borderClassName = _a.borderClassName, _d = _a.duration, duration = _d === void 0 ? 2000 : _d, className = _a.className, otherProps = __rest(_a, ["borderRadius", "children", "as", "containerClassName", "borderClassName", "duration", "className"]);
    return (react_1["default"].createElement(Component, __assign({ className: cn_1.cn("bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1", containerClassName), style: { borderRadius: borderRadius } }, otherProps),
        react_1["default"].createElement("div", { className: "absolute inset-0 rounded-[1.75rem]", style: { borderRadius: "calc(" + borderRadius + " * 0.96)" } },
            react_1["default"].createElement(exports.MovingBorder, { duration: duration, rx: "30%", ry: "30%" },
                react_1["default"].createElement("div", { className: cn_1.cn("h-20 w-20 opacity-[0.8] bg-[radial-gradient(#CBACF9_40%,transparent_60%)]", borderClassName) }))),
        react_1["default"].createElement("div", { className: cn_1.cn("relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased", className), style: { borderRadius: "calc(" + borderRadius + " * 0.96)" } }, children)));
}
exports.Button = Button;
exports.MovingBorder = function (_a) {
    var children = _a.children, _b = _a.duration, duration = _b === void 0 ? 2000 : _b, _c = _a.rx, rx = _c === void 0 ? "30%" : _c, _d = _a.ry, ry = _d === void 0 ? "30%" : _d, otherProps = __rest(_a, ["children", "duration", "rx", "ry"]);
    var pathRef = react_1.useRef(null);
    var progress = framer_motion_1.useMotionValue(0);
    framer_motion_1.useAnimationFrame(function (_, delta) {
        if (!pathRef.current)
            return;
        var bbox = pathRef.current.getBBox();
        var length = bbox.width; // ✅ `getBBox()` is used for `rect`
        if (length) {
            var pxPerMillisecond = length / duration;
            progress.set((progress.get() + delta * pxPerMillisecond) % length);
        }
    });
    var x = framer_motion_1.useTransform(progress, function (val) { return val; });
    var transform = framer_motion_1.useMotionTemplate(templateObject_1 || (templateObject_1 = __makeTemplateObject(["translateX(", "px) translateY(-50%)"], ["translateX(", "px) translateY(-50%)"])), x);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "none", className: "absolute h-full w-full", width: "100%", height: "100%" }, otherProps),
            react_1["default"].createElement("rect", { fill: "none", width: "100%", height: "100%", rx: rx, ry: ry, ref: pathRef })),
        react_1["default"].createElement(framer_motion_1.motion.div, { style: {
                position: "absolute",
                top: "50%",
                left: "0%",
                display: "inline-block",
                transform: transform
            } }, children)));
};
var templateObject_1;
