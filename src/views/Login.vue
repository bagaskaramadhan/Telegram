<template>
  <div>
    <div class="grayBlank">
      <div class="login-box">
        <h4 style="color: #7e98df" class="styleTitle">Login</h4>
        <p style="text-align: left">Hi, Welcome back!</p>
        <form @submit.prevent="onLogin()">
          <div class="user-box">
            <input type="text" v-model="form.email" autofocus required />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input type="password" v-model="form.password" required />
            <label>Password</label>
          </div>
          <a id="show-btn" @click="showModal">
            <p class="mt-2" style="text-align: right">Forgot Password?</p>
          </a>
          <button type="submit" class="btnStyle">Login</button>
        </form>
        <p class="mt-3" style="text-align: center">
          Don’t have an account?
          <router-link to="/register" style="color: #7e98df">
           Sign Up
          </router-link>
        </p>
        <div>
          <b-modal ref="my-modal" hide-footer title="Forgot Password?">
            <div class="d-block text-left">
              <form @submit.prevent="resPass()">
                <b-input
                  type="text"
                  placeholder="Email"
                  autofocus
                  v-model="form.emailForgot"
                  class="mb-4 mt-3"
                ></b-input>
                <button type="submit" class="btn">Send Email</button>
              </form>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  title: 'Telegram | Login',
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: '',
        emailForgot: ''
      }
    }
  },
  methods: {
    onLogin () {
      this.actionLogin(this.form)
        .then((response) => {
          console.log(response)
          if (response === 'Email not registered, please register') {
            // this.$swal('Email does\'t exist')
            Swal.fire('error', 'Email doesn\'t exist', 'error')
          } else if (response === 'Email or password is wrong!') {
            // this.$swal('Wrong password!')
            Swal.fire('error', 'Wrong password!', 'error')
          } else if (response === 'Please Active Email First') {
            Swal.fire('error', 'Activation your email', 'error')
          } else if (response === 'Login Success') {
            window.location = '/'
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    resPass () {
      console.log(this.form)
    },
    ...mapActions({
      actionLogin: 'auth/login'
    }),
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
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
}
.btnStyle:hover {
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
.styleTitle{
  margin-left: 140px;
  margin-bottom: 23px;

}
@media screen and (max-width: 600px) {
  .login-box{
    background: #ffffff;
    box-sizing: border-box;
    margin: 0 0;
    border-radius: 0;
    padding: 113px 50px;
  }
  .grayBlank{
    padding: 0;
    margin: 0;
  }
  .styleTitle{
    margin-left: 95px;
    margin-bottom: 23px;
  }
}
</style>
