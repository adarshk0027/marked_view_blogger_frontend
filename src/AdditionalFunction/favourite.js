import axios from '../HELPER/axios'
export const Get_Favourites = async (state, click, id) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('/blog/favourites', {
      headers: {
        authorization: token
      }
    })
    if (res.status == 200) {
      const fav = res.data.data
      state(res.data.data)
      if (fav[id]) {
        
        click(true)
      } else {
        
        click(false)
      }
    }
  } catch (error) {
    console.log(error)
  }
}
export const heart_button_click = async (state,id,click) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post('/blog/heart',{heart:state,blogItem:id} ,{
      headers: {
        authorization: token
      }
    })
    console.log(res.data);
    if(res.status==200){
        click(state)
    }
  } catch (error) {
    console.log(error)
  }
}

export const GetFav=async(state)=>{
  try{
    const token = localStorage.getItem('token')
    const res = await axios.get('/blog/favourites', {
      headers: {
        authorization: token
      }
    })
    if (res.status == 200) {
      console.log("my fav",res.data.fav);
      state(res.data.fav)
    }
  }
  catch(error){
    console.log(error);
  }
}
