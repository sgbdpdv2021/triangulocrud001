// https://www.positronx.io/angular-8-es-6-typescript-promises-examples/

const metodoAsync = (callBack: any)=> {
    setTimeout( () => {
      console.log("Async Callback");
      callBack();
    }, 1500);
  }
  
metodoAsync(
      () => console.log("Async Callback Completed")
);

const asyncAction = (n: number) => {
    var promise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        console.log("Async is done!");
        if (n == 1) resolve('Recibido 1!!');
        else reject('Recibido distinto de 1!!')
      }, 1500);
    });
    return promise
  }
  
asyncAction(1)
.then( (success: string) => { 
    console.log('Estamos en then: '+success); 
}) 
.catch( (error) => { 
   console.log('Estamos en catch: '+ error)
});


