import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css"

const inputForm = document.querySelector(".form");
console.log(inputForm);

inputForm.addEventListener("submit", handlerSubmit)

function handlerSubmit(event) {
  event.preventDefault();

  const firstDelay = Number(inputForm.elements.delay.value);
  const step = Number(inputForm.elements.step.value);
  const amount = Number(inputForm.elements.amount.value);

  for (let i = 1; i <= amount; i++){
    createPromise(i, firstDelay + (i - 1)*step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);  
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);  
      });    
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}
