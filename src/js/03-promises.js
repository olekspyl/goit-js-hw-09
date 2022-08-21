const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  btnEl: document.querySelector('button'),
}
refs.formEl.addEventListener('submit', onFormSubmit);


function onFormSubmit(event) {
  event.preventDefault();

  const amount = Number(refs.amountEl.value);
  let delay = Number(refs.delayEl.value);
  const step = Number(refs.stepEl.value);
  let position = null;


  for (  position = 1; position <= amount; position += 1) {
       createPromise(position, delay)
      .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
 delay += step;
   }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })
}