import axios from '../HELPER/axios'

export const Get_User = async (id, state) => {
  try {
    const res = await axios.get(`users/get-user/${id}`)
    if (res.status == 200) {
      state(res.data.user)
    }
  } catch (error) {
    console.log(error)
  }
}
export const Update_User = async (form, state, data) => {
  try {
    const res = await axios.post('users/update', form)
    console.log(res.data)
    if (res.status == 200) {
      state({
        ...data,
        ['profilePicture']: res.data.profilePicture
          ? res.data.profilePicture
          : data.profilePicture
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const SignUp = async (values,Navigate) => {
  try {
    const res = await axios.post('/users/signup', values)
    console.log(res.data);
    if(res.status==200){
        Navigate('/')
    }
  } catch (error) {
    console.log(error)
  }
}
