<template>
  <div>
      <b-row class="no-gutters chatApp">
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
        <div class="row ml-3 displayWeb">
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
                <!-- {{item.id}} -->
                        <div class="col-lg-3 col-3">
            <img class="photoProfile" :src="`${URL}/${item.image}`">
                        </div>
                        <div class="col-lg-7 col-7">
                          <p class="font-weight-bold">{{ item.username }}</p>
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
          <div class="row ml-3 responsiveMobile">
            <div class="col-lg-12 user-list">
              <div v-for="(item, index) in listUsers" :key="index">
                <div
                  class="row"
                  style="cursor: pointer"
                  v-if="item.email !== dataSender"
                  @click="selectUser(item,index)"
                  v-b-toggle.responsiveChat
                >
                  <div class="col-lg-12">
                    <div class="side-chat">
                      <div class="row text-left mt-4">
                <!-- {{item.id}} -->
                        <div class="col-lg-3 col-3">
            <img class="photoProfile" :src="`${URL}/${item.image}`">
                        </div>
                        <div class="col-lg-7 col-7">
                          <p class="font-weight-bold">{{ item.username }}</p>
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
        <b-col lg="9" class="chatBlank displayWeb">
          <div class="side-right" v-if="userReceiver !== ''">
  <b-card>
      <div class="user-bar">
          <div class="userRec">
          <img class="photoProfile ml-3" :src="`${URL}/${imageName}`">
          <div>
          <h5 class="ml-3 font-weight-bold mt-2">{{userReceiver}}</h5>
          <p class="ml-3" style="color: #7E98DF;">Online</p>
          </div>
      </div>
          <div class="profileUser">
              <img src="../assets/icon/dot-menu.svg" v-b-toggle.sideprofilechat @click="sideBarChat()">
          </div>
      </div>
  </b-card>
  <div class="row in-chat">
      <!-- SENDER -->
              <div class="col-lg-12" v-for="(item, index) in historyMessages" :key="index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div
                  class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat"
                >
                              <!-- <img class="photoProfile ml-4" :src="`${URL}/${imageName}`"> -->
<b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="ml-4 bubble-your">
                    {{item.msg}}
                  </p>
                </div>
              </div>
              <div class="row text-right" v-else>
                <div
                  class="col-lg-12 col-12 d-flex align-items-end justify-content-end p-4 row-chat"
                style="margin-top: -20px">
                <b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="mr-4 bubble-me">
                  {{item.msg}}
                  </p>
                              <!-- <img class="photoProfile" :src="`${URL}/${senderImage}`"> -->

                </div>
              </div>
            </div>
            <!-- SHOW -->
            <div class="col-lg-12" v-for="(item, index) in chatPrivates" :key="index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat">
                  <!-- <img class="photoProfile ml-4" :src="`${URL}/${imageName}`"> -->
<b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item href="#" @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="ml-4 bubble-your">
                    {{item.msg}}
                  </p>
                </div>
              </div>
              <div class="row text-right" v-else>
                <div
                  class="col-lg-12 col-12 d-flex align-items-end justify-content-end p-4 row-chat"
                style="margin-top: -20px">
                <b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item href="#" @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="mr-4 bubble-me">
                  {{item.msg}}
                  </p>
                  <!-- <img class="photoProfile" :src="`${URL}/${senderImage}`"> -->
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
        <div class="chatBlank displayWeb" v-else>
              <h1>Please select a chat to start messaging</h1>
        </div>
        </b-col>
        <!--  -->
        <!--  -->
        <!--  -->
        <!--  -->
        <div>
    <b-sidebar id="responsiveChat"  class="asdasd" width="350px" shadow no-header bg-variant="white" header-class="sidebarHeader">
      <b-col lg="9" class="chatBlank responsiveMobile">
          <div class="side-right" v-if="userReceiver !== ''">
  <b-card>
      <div class="user-bar papapa">
          <div class="userRec">
          <img class="photoProfile ml-3" :src="`${URL}/${imageName}`">
          <div>
          <h5 class="ml-3 font-weight-bold mt-2">{{userReceiver}}</h5>
          <p class="ml-3" style="color: #7E98DF;">Online</p>
          </div>
      </div>
          <div class="profileUser">
              <img src="../assets/icon/dot-menu.svg" v-b-toggle.sideprofilechat @click="sideBarChat()">
          </div>
      </div>
  </b-card>
  <div class="row in-chat">
      <!-- SENDER -->
              <div class="col-lg-12" v-for="(item, index) in historyMessages" :key="index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div
                  class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat"
                >
                              <!-- <img class="photoProfile ml-4" :src="`${URL}/${imageName}`"> -->
<b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="ml-4 bubble-your">
                    {{item.msg}}
                  </p>
                </div>
              </div>
              <div class="row text-right" v-else>
                <div
                  class="col-lg-12 col-12 d-flex align-items-end justify-content-end p-4 row-chat"
                style="margin-top: -20px">
                <b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="mr-4 bubble-me">
                  {{item.msg}}
                  </p>
                              <!-- <img class="photoProfile" :src="`${URL}/${senderImage}`"> -->

                </div>
              </div>
            </div>
            <!-- SHOW -->
            <div class="col-lg-12" v-for="(item, index) in chatPrivates" :key="index">
              <div class="row text-left" v-if="item.sender !== dataSender">
                <div class="col-lg-12 col-12 d-flex align-items-end p-4 row-chat">
                  <!-- <img class="photoProfile ml-4" :src="`${URL}/${imageName}`"> -->
<b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item href="#" @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="ml-4 bubble-your">
                    {{item.msg}}
                  </p>
                </div>
              </div>
              <div class="row text-right" v-else>
                <div
                  class="col-lg-12 col-12 d-flex align-items-end justify-content-end p-4 row-chat"
                style="margin-top: -20px">
                <b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" size="sm"  variant="link" toggle-class="text-decoration-none" no-caret style="margin-top:-30px; margin-left:-25px">
                        <template v-slot:button-content>
                          <b-icon-three-dots></b-icon-three-dots>
                        </template>
                        <b-dropdown-item href="#" @click="deleted(item.id)">Delete</b-dropdown-item>
                      </b-dropdown>
                  <p class="mr-4 bubble-me">
                  {{item.msg}}
                  </p>
                  <!-- <img class="photoProfile" :src="`${URL}/${senderImage}`"> -->
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
        <!-- <div class="chatBlank responsiveMobile" v-else>
              <h1>Please select a chat to start messaging</h1>
        </div> -->
        </b-col>
    </b-sidebar>
  </div>
<sideProfile/>
<sideProfileChat/>
<!-- <sideChat/> -->
      </b-row>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import io from 'socket.io-client'
import sideProfile from '../components/SideProfile'
// import sideChat from '../components/SideChat'
import sideProfileChat from '../components/SideProfileChat'
import Swal from 'sweetalert2'
const { URL } = require('../helpers/env')
export default {
  title: 'Telegram',
  name: 'Chatlist',
  components: {
    sideProfile,
    sideProfileChat
    // sideChat
  },
  data () {
    return {
      URL: URL,
      socket: io(`${URL}`),
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
      idUser: localStorage.getItem('id'),
      image: localStorage.getItem('image'),
      username: localStorage.getItem('username'),
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
    deleted (id) {
      // alert(id)
      this.onDeleteMsg(id)
        .then((result) => {
          Swal.fire('Success', 'Delete success')
          window.location = '/'
        })
        .catch((err) => {
          alert(err.message)
        })
    },
    sideBarChat () {
      console.log(this.onGetFriends())
      // const datafriend = this.userReceiver
      // // console.log(fullname)
      // this.onGetUserChat(datafriend)
    },
    hideSideMenu () {
      this.$root.$emit('bv::toggle::collapse', 'sideprofile')
    },
    // getID () {
    //   alert(this.idUser)
    // },
    selectUser (receiver) {
      this.chatRoom = []
      this.chatPrivates = []
      this.idReceiver = receiver.id
      this.userReceiver = receiver.username
      this.dataReceiver = receiver.email
      this.imageName = receiver.image
      localStorage.setItem('idReceiver', receiver.id)
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
    onLogout () {
      localStorage.removeItem('token')
      localStorage.removeItem('image')
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      localStorage.removeItem('bio')
      localStorage.removeItem('phone')
      window.location = '/login'
    },
    ...mapActions({
      onGetFriends: 'duser/getuserFriends',
      onGetUserChat: 'duser/getUserChat',
      onDeleteMsg: 'duser/deleteMessage'
    })
  },
  mounted () {
    this.socket.emit('get-all-users', [])
    this.socket.on('list-users', (data) => {
      this.listUsers = data
    })
    this.socket.emit('join-room', this.dataSender)
    this.socket.on('private-message', (payload) => {
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
.myButton:active {
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
.responsiveMobile{
  display: none;
  /* background: #000; */
}
@media screen and (max-width: 600px){
  .side-right{
    height: 92vh !important;
    width: 327px;
    display: grid;
    grid-template-rows: 80px 460px 0px;
  }
  .ChatStyle{
    width: 10px;
  }
  .displayWeb {
    display: none;
  }
  .listUser {
    margin-right: 0;
    padding-right: 15px;
    margin-bottom: 0;
  }
  .chatApp {
    margin-bottom: 0;
  }
  .responsiveMobile{
    display: inline;
  }
  .user-list{
    height: 57vh;
  }
  .sendNow{
    padding: 0 20px 0 35px;
    margin: 17px 0 0 0;
  }
  .in-chat{
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: 0px;
  }
  .card-body{
    padding: 0;
  }
}
</style>
