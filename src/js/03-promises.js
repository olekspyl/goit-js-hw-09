const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  btnEl: document.querySelector('button'), 
}

refs.formEl.addEventListener('submit', onFormSubmit);
let summaryDelay;

function onFormSubmit(event) {
  event.preventDefault();
  const amount = Number(refs.amountEl.value);
  for (let i = 0; i <= amount; i += 1) {

    createPromise()
      .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${summaryDelay}ms`);
  })
      .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${summaryDelay}ms`);
  });
  }
}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
    const delay = Number(refs.delayEl.value);
    const step = Number(refs.stepEl.value);
    summaryDelay = delay + step;

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
  } else {
          reject({ position, delay });
  }
    }, summaryDelay)
  });
 
}


