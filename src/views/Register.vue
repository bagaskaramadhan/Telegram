<template>
  <div>
    <div class="grayBlank">
      <div class="login-box">
        <div class="titlePage">
            <router-link to="/login">
            <img src="../assets/icon/back.svg" class="arrowStyle">
            </router-link>
            <h4 style="color: #7e98df">Register</h4>
        </div>
        <p class="mt-3" style="text-align: left">Let’s create your account!</p>
        <form @submit.prevent="onRegister()">
          <div class="user-box">
            <input type="text" v-model="form.name" autofocus required />
            <label>Name</label>
          </div>
          <div class="user-box">
            <input type="email" v-model="form.email" required />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input type="password" v-model="form.password" required />
            <label>Password</label>
          </div>
          <button type="submit" class="btnStyle">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  title: 'Telegram | Register',
  name: 'Register',
  data () {
    return {
      form: {
        email: '',
        password: '',
        name: ''
      }
    }
  },
  methods: {
    onRegister () {
      this.actionRegister(this.form)
        .then((response) => {
          console.log(response)
          if (response === 'Email is already registered!') {
            // this.$swal('Email is already registered!')
            Swal.fire('Error', 'Email is already registered', 'error')
          } else if (response === 'Register success!') {
            Swal.fire('Sign up success', 'Activation your email', 'success')
            this.$router.push('login')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    ...mapActions({
      actionRegister: 'auth/register'
    })
  }
}
</script>

<style scoped>
#show-btn {
  cursor: pointer;
}
.btnStyle {
  background: #7e98df;
  border-radius: 70px;
  padding: 20px 0;
  width: 100%;
  color: #ffffff;
  border-color: white;
}
.btnStyle:hover {
  border-color: white;
  background: #ffffff;
  border-radius: 70px;
  border-color: #7e98df;
  padding: 20px 0;
  width: 100%;
  color: #7e98df;
}
.grayBlank {
  background: #e5e5e5;
  padding-top: 10%;
  padding-bottom: 20%;
}
.b-SignIn:hover {
  background: #fff;
  box-shadow: 0px 8px 10px rgba(35, 149, 255, 0.3);
  color: #2395ff;
  border: 1px solid #2395ff;
}
.login-box {
  box-sizing: border-box;
  margin: 0 35%;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
  padding: 20px 50px;
}
.login-box .user-box {
  position: relative;
}
.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid rgba(210, 194, 255, 0.68);
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 15px;
  color: #9b96ab;
  pointer-events: none;
  transition: 0.5s;
}
.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  font-size: 10px;
}
.titlePage{
  display: flex;
  justify-content: left;
}
.arrowStyle{
  padding-right: 120px;
  margin-right: 0;
}
@media screen and (max-width: 600px) {
  .grayBlank{
    padding: 0;
    margin: 0;
  }
  .login-box{
      background: #ffffff;
      box-sizing: border-box;
      margin: 0 0;
      border-radius: 0;
      padding: 126px 50px;
  }
  .arrowStyle{
    margin-right: -45px;
  }
}
</style>
