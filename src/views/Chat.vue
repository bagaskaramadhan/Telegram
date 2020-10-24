<template>
  <div>
      <b-row class="no-gutters">
        <b-col lg="3" class="listUser">
          <b-row>
            <b-col class="mt-4 ml-5"><h3 style="color: #7E98DF;">Telegram</h3></b-col>
            <b-col class="mt-4 mr-4">
              <b-dropdown variant="outline" right class="float-right" menu-class="dropmenu" no-caret>
               <template v-slot:button-content>
                <img src="../assets/icon/menu.svg">
              </template>
              <b-dropdown-item-button class="mt-2 mb-2" v-b-toggle.sideprofile>
                <b-icon icon="gear" class="mr-4"></b-icon>
                Setting
              </b-dropdown-item-button>
              <b-dropdown-item-button class="mt-2 mb-2" v-b-modal="'mapmodal'">
                  <b-icon icon="map" class="mr-4"></b-icon>
                Map
              </b-dropdown-item-button>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="person" class="mr-4"></b-icon>
                Contact
              </b-dropdown-item>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="telephone" class="mr-4"></b-icon>
                Call
              </b-dropdown-item>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="bookmark" class="mr-4"></b-icon>
                Save message
              </b-dropdown-item>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="person-plus" flip-h class="mr-4"></b-icon>
                Invite friend
              </b-dropdown-item>
              <b-dropdown-item>
                <b-icon icon="question-circle" class="mr-4"></b-icon>
                FAQ
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button class="mt-2 mb-2" @click="onLogout">
                <b-icon icon="box-arrow-in-left" class="mr-4"></b-icon>
                Logout
              </b-dropdown-item-button>
            </b-dropdown>
            </b-col>
          </b-row>
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
        <div class="row ml-3">
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
                        </div>
                        <div class="col-lg-7 col-7">
                          <p class="font-weight-bold">{{ item.name }}</p>
                        </div>
                        <div class="col-lg-2 col-2">
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
          <div class="side-right" v-if="userReceiver !== ''">
  <b-card>
      <div class="user-bar">
          <div class="userRec">
          <img class="photoProfile ml-3" :src="`http://localhost:3000/${senderImage}`">
          <div>
          <h5 class="ml-3 font-weight-bold mt-2">{{userReceiver}}</h5>
          <p class="ml-3" style="color: #7E98DF;">Online</p>
          </div>
      </div>
          <div class="profileUser">
              <img src="../assets/icon/dot-menu.svg">
          </div>
      </div>
  </b-card>
  <div class="row in-chat">
      <!-- SENDER -->
              <div class="col-lg-12" v-for="(item, index) in historyMessages" :key="'a'+index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div
                  class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat"
                >
                              <img class="photoProfile ml-4" :src="`http://localhost:3000/${senderImage}`">

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
            <!-- SHOW -->
            <div class="col-lg-12" v-for="(item, index) in chatPrivates" :key="index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat">
                  <img class="photoProfile ml-4" :src="`http://localhost:3000/${senderImage}`">
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
          <div class="sendNow">
          <form class="sendChat" @submit.prevent="sendMessage()">
            <div class="row d-flex align-items-center justify-content-center">
              <div class="col-lg-11 col-9 ">
                <input type="text" class="form-control" placeholder="Type your message..." v-model="chatData"/>
              </div>
              <div class="col-lg-1 col-3 text-right">
                <div class="row">
                  <button class="btn ml-3"><img src="../assets/icon/send.png" style="width: 30px; background: red;"></button>
                </div>
              </div>
            </div>
          </form>
          </div>
        </div>
        <div class="chatBlank" v-else>
              <h1>Please select a chat to start messaging</h1>
        </div>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { URL } from '../helpers/env'
import io from 'socket.io-client'
// import * as VueGoogleMaps from 'vue2-google-maps'
import { mapActions } from 'vuex'

export default {
  title: 'Telegram | Chat',
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
.myButton{
    background:url(../assets/icon/send.png) no-repeat;
    cursor:pointer;
    border:none;
    width:50px;
    height:50px;
    /* background: red; */
}

.myButton:active  /* use Dot here */
{
    background:url(../assets/icon/send.png) no-repeat;
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
  background: #5EB4DD;
  border-radius: 35px 35px 10px 30px;
  color: white;
}
input{
    background: #FAFAFA;
border-radius: 15px;
}
.sendNow{
    background: #FFFFFF ;
    padding: 30px 33px 30px 20px;
    margin-right: -23px;
}
.side-right {
  height: 105vh !important;
  width: 98%;
  display: grid;
  grid-template-rows: 1.5fr 6fr 1.5fr;
}
.in-chat {
  overflow: scroll;
  background: #FAFAFA;
}
.in-chat::-webkit-scrollbar {
  width: 5px;
}
.profileUser{
    margin: 25px 30px 0 0;
}
.profileUser img {
    cursor: pointer;
}
.user-bar {
    display: flex;
    justify-content: space-between;
}
.userRec {
    display: flex;
    justify-content: left;
}
.card {
    border-color: transparent;
    margin-right: -23px;

}
.bgBtn {
background: #7E98DF;
border-radius: 35px 10px 35px 35px;
}
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
  border-radius: 20px;
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

</style>
