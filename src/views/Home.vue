<template>
  <div>
    <div>
      <b-row class="no-gutters">
        <b-col lg="3" class="listUser">
          <b-row>
            <b-col><h3 style="color: #7E98DF;">Telegram</h3></b-col>
            <b-col>
              <b-dropdown variant="outline" right class="float-right" menu-class="dropmenu" no-caret>
               <template v-slot:button-content>
                <img src="../assets/icon/menu.svg">
              </template>
              <b-dropdown-item-button class="mt-2 mb-2" v-b-toggle.sideprofile>
                <div @click="onLogout()">
                  <img src="../assets/icon/logout.png" class="mr-2" style="width: 25px">
                  Logout
                </div>
              </b-dropdown-item-button>
              </b-dropdown>
            </b-col>
          </b-row>
          <div>
            <img class="photoProfile" :src="`http://localhost:3000/${senderImage}`">
              <p>{{dataSender}}</p>
              <p>{{name}}</p>
          </div>
          <div class="div3 mt-5 mb-5">
            <input
            type="text"
            placeholder="Type your message..."
            style="border-radius: 15px;"
            />
            <img src="../assets/icon/Plus.svg" alt="">
          </div>
        <div class="Reader">
          <div class="col">
              <b-button
                variant="outline"
                size="sm"
                block
                :class="{active: btnActive === 'btnAll'}"
                @click="btnActive = 'btnAll'"
                id="btnGroup"
              >All</b-button>
            </div>

            <div class="col">
              <b-button
              variant="outline"
              size="sm"
              block
              :class="{active: btnActive === 'btnImportant'}"
              @click="btnActive = 'btnImportant'"
              id="btnGroup"
            >Important</b-button>
            </div>

            <div class="col">
              <b-button
              variant="outline"
              size="sm"
              block
              :class="{active: btnActive === 'btnUnread'}"
              @click="btnActive = 'btnUnread'"
              id="btnGroup"
            >Unread</b-button>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 user-list">
              <div v-for="(item, index) in listUsers" :key="index">
                <div
                  class="row"
                  style="cursor: pointer"
                  v-if="item.email !== dataSender"
                  @click="selectUser(item,index)"
                >
                  <div class="col-lg-12">
                    <div class="side-chat">
                      <div class="row text-left mt-4">
                        <div class="col-lg-3 col-3">
            <img class="photoProfile" :src="`http://localhost:3000/${senderImage}`">

                          <!-- <img :src="`${URL}/${item.image}`" alt=""> -->
                        </div>
                        <div class="col-lg-7 col-7">
                          <p class="font-weight-bold">{{ item.name }}</p>
                          <p style="margin-top: -18px">{{ item.created_at }}</p>
                        </div>
                        <div class="col-lg-2 col-2">
                          <!-- <p class="font-weight-bold">15.20</p> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col lg="9" class="chatBlank">
          <div class="side-right chatBlank" v-if="userReceiver !== ''">
          <div
            class="row"
            style="background-color: #ffffff"
            v-b-toggle.sidebar-right
          >
            <div class="col-lg-8 col-8 text-left pt-4 pl-2 pr-2">
              <div class="row">
                <div class="col-lg-1 col-3">
                  <img
                    width="70px"
                    :src="`http://localhost:3000/${imageName}`"
                  />
                </div>
                <div class="col-lg-4 col-9">
                  <p class="mt-1 font-weight-bold ml-4">{{ userReceiver }}</p>
                  <p style="margin-top: -10px" class="ml-4">Online</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-4 text-right p-4">
              <img src="../assets/img/Profile menu.svg" />
            </div>
          </div>
          <div class="row in-chat">
              <div class="col-lg-12" v-for="(item, index) in historyMessages" :key="'a'+index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div
                  class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat"
                >
                  <img :src="`http://localhost:3000/${imageName}`" style="width: 50px;"/>
                  <p class="ml-4 bubble-your">
                    {{item.msg}}
                  </p>
                </div>
              </div>
              <div class="row text-right" v-else>
                <div
                  class="col-lg-12 col-12 d-flex align-items-end justify-content-end p-4 row-chat"
                style="margin-top: -20px">
                  <p class="mr-4 bubble-me">
                  {{item.msg}}
                  </p>
                  <img :src="`http://localhost:3000/${senderImage}`" style="width: 50px;"/>
                </div>
              </div>

            </div>
            <div class="col-lg-12" v-for="(item, index) in chatPrivates" :key="index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat">
                  <img class="photoProfile" :src="`http://localhost:3000/${senderImage}`">
                  <p class="ml-4 bubble-your">
                    {{item.msg}}
                  </p>
                </div>
              </div>
              <div class="row text-right" v-else>
                <div
                  class="col-lg-12 col-12 d-flex align-items-end justify-content-end p-4 row-chat"
                style="margin-top: -20px">
                  <p class="mr-4 bubble-me">
                  {{item.msg}}
                  </p>
                  <img class="photoProfile" :src="`http://localhost:3000/${senderImage}`">
                  </div>
              </div>

            </div>
          </div>

          <form @submit.prevent="sendMessage()">
            <div class="row d-flex align-items-center justify-content-center">
              <div class="col-lg-11 col-9 ">
                <input type="text" class="form-control" placeholder="Ketik pesan" v-model="chatData"/>
              </div>
              <div class="col-lg-1 col-3 text-right">
                <div class="row">
                  <button class="btn btn-primary w-100">Send</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="chatBlank" v-else>
            <!-- <div class="chatBlank"> -->
              <h1>Please select a chat to start messaging</h1>
            <!-- </div> -->
        </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { URL } from '../helpers/env'
import io from 'socket.io-client'
// import * as VueGoogleMaps from 'vue2-google-maps'
import { mapActions } from 'vuex'

export default {
  name: 'Chatlist',
  // components: {
  //   'google-maps': VueGoogleMaps.Map
  // },
  data () {
    return {
      URL: process.env.URL,
      socket: io(`${URL}`),
      // dataSender: this.$route.query.email,
      dataSender: localStorage.getItem('email'),
      btnActive: 'btnAll',
      listUsers: [],
      userReceiver: '',
      dataReceiver: '',
      chatData: '',
      chatRoom: [],
      chatPrivates: [],
      imageName: null,
      historyMessages: [],
      senderImage: localStorage.getItem('image'),
      name: localStorage.getItem('name'),
      image: localStorage.getItem('image'),
      newImage: '',
      phone: localStorage.getItem('phone'),
      bio: localStorage.getItem('bio'),
      form: {
        name: '',
        newImages: '',
        bio: '',
        phone: ''
      }
    }
  },
  methods: {
    selectUser (receiver) {
      this.chatRoom = []
      this.chatPrivates = []
      this.userReceiver = receiver.name
      this.dataReceiver = receiver.email
      this.imageName = receiver.image
      this.setChatPrivate()
      // alert(this.dataSender)
      this.socket.emit('get-history-message', {
        sender: this.dataSender,
        receiver: this.dataReceiver
      })
      this.getHistory()
    },
    getHistory () {
      this.socket.on('historyMessage', (data) => {
        // console.log(data)
        this.historyMessages = data
      })
    },
    toogleMenu () {
      alert(`${URL}`)
    },
    sendMessage () {
      const message = {
        sender: this.dataSender,
        msg: this.chatData,
        receiver: this.dataReceiver,
        image: this.senderImage
      }
      this.chatRoom = [...this.chatRoom, message]

      this.socket.emit('send-message', {
        username: this.dataSender,
        chatData: this.chatData,
        room: this.dataReceiver,
        image: this.senderImage
      })
      this.chatData = ''
      this.setChatPrivate()
    },
    setChatPrivate () {
      const chatPrivate = this.chatRoom.filter((e) => {
        if (this.dataReceiver === '') {
          return e.sender === this.dataReceiver || e.sender === this.dataSender
        } else {
          return (
            e.receiver === this.dataReceiver || e.sender === this.dataReceiver
          )
        }
      })
      this.chatPrivates = chatPrivate
    },

    process (event) {
      this.form.newImages = event.target.files[0]
    },

    updateMessage () {
      const fd = new FormData()
      fd.append('name', this.form.name)
      fd.append('image', this.form.newImages)
      fd.append('bio', this.form.bio)
      fd.append('phone', this.form.phone)
      const data = {
        email: this.dataSender,
        formdata: fd
      }
      this.actionupdateData(data).then((response) => {
        alert('Update data success')
        window.location = '/'
      }).catch((err) => {
        alert(err)
      })
    },
    ...mapActions({
      actionupdateData: 'auth/updateData'
    }),

    onLogout () {
      localStorage.removeItem('token')
      localStorage.removeItem('image')
      localStorage.removeItem('email')
      window.location = '/login'
    }
  },
  mounted () {
    this.socket.emit('get-all-users', [])
    this.socket.on('list-users', (data) => {
      this.listUsers = data
    })
    this.socket.emit('join-room', this.dataSender)

    this.socket.on('private-message', (payload) => {
      // console.log(payload)
      this.chatRoom = [...this.chatRoom, payload]
      if (this.dataReceiver !== null) {
        this.setChatPrivate()
      }
    })
  }
}
</script>

<style scoped>
.chatBlank h1 {
  position: absolute;
  left: 17%;
  margin-top: 30%;
  color: #848484;
}
.Reader {
  display: flex;
  justify-content: space-between;
}
.photoProfile {
  width: 64px;
  height: 64px;
  background-size: cover;
  border-radius: 30px;
}
.div3 {
  display: flex;
  justify-content: space-around;
}
.listUser{
  background: #FFFFFF;
  margin: 0;
  padding: 0;
}
.chatBlank{
  background: #FAFAFA;
  height: 100%;
}
.map {
  width: 100%;
  height: 300px;
}
.btn-important {
  background-color: #7e98df;
  border-radius: 20px;
  width: 120px;
  height: 40px;
}
.main-chat {
  /* height: 90vh; */
  display: flex;
  flex-direction: column;
}
.menu-chat {
  margin-left: 30px;
  margin-right: 30px;
}
.menu {
  overflow: scroll;
}
.menu::-webkit-scrollbar {
  width: 0;
  height: 3px;
}
.menu::-webkit-scrollbar-thumb {
  background-color: gray;
}
.chating {
  position: relative;
}
.side-right {
  height: 110vh !important;
  width: 98%;
  display: grid;
  grid-template-rows: 1.5fr 6fr 1.5fr;
}
.user-list {
  overflow: scroll;
  height: 70vh;
}
.user-list::-webkit-scrollbar {
  width: 5px;
}
.user-list::-webkit-scrollbar-thumb {
  background-color: gray;
}
.in-chat {
  overflow: scroll;
  background: #FAFAFA;
}
.in-chat::-webkit-scrollbar {
  width: 5px;
}
.in-chat::-webkit-scrollbar-thumb {
  background-color: gray;
}
.row-chat p {
  margin-bottom: 0;
}
.bubble-your {
  max-width: 50%;
  padding: 20px;
  background: #7e98df;
  border-radius: 35px 35px 35px 10px;
  color: white;
}
.bubble-me {
  max-width: 50%;
  padding: 20px;
  background: #787894;
  border-radius: 35px 35px 10px 30px;
  color: white;
}
.notice {
  color: white;
  background-color: blue;
  border-radius: 20px;
  text-align: center;
  width: 20px !important;
}

.notice-count {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
}
@media (max-width: 576px) {
  .profile {
    display: none;
  }
  .menu-chat {
    margin-left: 60px;
    margin-right: 60px;
  }
}
</style>
