const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  btnEl: document.querySelector('button'), 
}

refs.formEl.addEventListener('submit', onFormSubmit);
let summaryDelay;
let position; 


function onFormSubmit(event) {
  event.preventDefault();

  const amount = Number(refs.amountEl.value);
  const delay = Number(refs.delayEl.value);
  const step = Number(refs.stepEl.value);
  summaryDelay = delay + step;
  
  for (let i = 0; i <= amount; i += 1) {
       createPromise(position, summaryDelay)
      .then(({ position, summaryDelay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${summaryDelay}ms`);
  })
      .catch(({ position, summaryDelay }) => {
    console.log(`❌ Rejected promise ${position} in ${summaryDelay}ms`);
  });
   }
}

function createPromise() {
    return new Promise((resolve, reject) => {

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, summaryDelay });
  } else {
          reject({ position, summaryDelay });
  }
    }, summaryDelay)
  });
 
}


