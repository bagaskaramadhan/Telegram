<template>
  <div>
    <b-modal id="editmodal" title="Edit Profile" hide-footer>
      <b-form enctype="multipart/form-data">
      <!-- {{edit}} -->
        <b-form-group label-cols="4" label="Edit Username">
          <b-form-input
            v-model="edit[0].username"
            :fullname="edit[0].username"
          >
            {{edit[0].name}}
          </b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label="Edit Phone">
          <b-form-input
            v-model="edit[0].phone"
            :fullname="edit[0].phone"
          >
            {{edit[0].phone}}
          </b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label="Edit Bio">
          <b-form-textarea
            v-model="edit[0].bio"
            :fullname="edit[0].bio"
          >
          {{edit[0].bio}}
          </b-form-textarea>
        </b-form-group>

        <b-form-group label-cols="4" label="Edit Photo">
          <p>{{edit.image}}</p>
          <input class="upload" type="file" @change="processFile($event)"/>
        </b-form-group>

        <div class="col float-right">
          <div class="row">
            <div class="col">
              <b-btn variant="danger" block class="ml-2 mr-2" @click="$bvModal.hide('editmodal')">Cancel</b-btn>
            </div>
            <div class="col">
              <b-button type="submit" @click.prevent="sendData" variant="primary" block class="ml-2 mr-2">Submit</b-button>
            </div>
          </div>
        </div>

      </b-form>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      // edit: {}
    }
  },
  methods: {
    processFile (event) {
      this.image = event.target.files[0]
      // this.sendData()
    },
    sendData () {
    //   console.log(this.edit)
    //   console.log(this.edit[0])
    //   console.log(this.image)

      this.edit[0].newImage = this.image
      this.onUpdateData(this.edit[0])
        .then((response) => {
          console.log(response)
          if (response === 'Wrong image type') {
            Swal.fire('Error', 'Image must jpg or jpeg!', 'error')
            setTimeout(() => {
            }, 1000)
          } else if (response === 'Large image') {
            Swal.fire('Error', 'Image too large, you can upload files up to 200 kb', 'error')
            setTimeout(() => {
            }, 1000)
          } else if (response === 'Update success') {
            this.$swal('Success Update Data')
            location.reload()
          }
          // this.$swal('Update success')
          // window.location.reload()
        })
        .catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      onUpdateData: 'duser/updateData'
    })
  },
  computed: {
    ...mapGetters({
      edit: 'duser/getOneUser'
    })
  }
}
</script>
