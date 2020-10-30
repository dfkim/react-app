export default  [] = () => {
  return (dispatch) => {
    return fetch('https://esll.net/stocks/', {
      headers: { 'X-API-KEY': '12345678' },
      mode: 'cors'
    })
    .then(response => response.json())
    .then(res => {
      let prefectures = [];
      Object.keys(res).forEach(i => {
        if(parseInt(res[i].stock_code)>0 && res[i].stock_code !=="1699"){
  
          prefectures.push(res[i]);
        }
      });
      return prefectures;
  
    });
  }
}