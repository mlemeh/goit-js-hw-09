function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequired7c6=i);var r=i("7Y9D8");const l=document.querySelector(".form");function s(e,n){const o=Math.random()>.3;return new Promise(((t,i)=>{setTimeout((()=>{o?t({position:e,delay:n}):i({position:e,delay:n})}),n)}))}console.log(l),l.addEventListener("submit",(function(n){n.preventDefault();const o=Number(l.elements.delay.value),t=Number(l.elements.step.value),i=Number(l.elements.amount.value);for(let n=1;n<=i;n++)s(n,o+(n-1)*t).then((({position:n,delay:o})=>{e(r).Notify.success(`Fulfilled promise ${n} in ${o}ms`)})).catch((({position:n,delay:o})=>{e(r).Notify.failure(`Rejected promise ${n} in ${o}ms`)}))}));
//# sourceMappingURL=03-promises.c244d3de.js.map
