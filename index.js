async function fetchData() {
    let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
      method: 'GET',
      headers: {'x-zocom': 'solaris-2ngXkR6S02ijFrTP'}
    });
  
    let data = await resp.json();
    console.log(data);
  }
  
  fetchData();