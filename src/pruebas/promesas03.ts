const asyncAction2 = (n: number) => {
    var promise = new Promise<string>((resolve, reject) => {
        console.log("Async is done222!");
        if (n == 1) resolve('Recibido222 1!!');
        else reject('Recibido distinto222 de 1!!')
    });
    return promise;
  }
  
asyncAction2(2)
.then( (success: string) => { 
    console.log('Estamos en then2222: '+success); 
}) 
.catch( (error) => { 
   console.log('Estamos en catch222: '+ error); 
});
