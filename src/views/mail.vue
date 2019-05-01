<template>
  <v-container fluid>
    <v-toolbar mail>
      <v-toolbar-title class="headline text-uppercase justify-center">
        <img :src="userInfo.profileImage" class="profile-image" @click="imageClickHandler">
        <span
          dir="rtl"
          class="profile-name font-weight-light justify-center"
        >{{ userInfo.name }} {{ userInfo.family }}</span>
        <input
          type="file"
          @change="imageFileChanged"
          accept="image/*"
          ref="imageFileInput"
          style="display: none"
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-title>
        <v-btn @click="mailDeleted(selected)" fab dark small color="error">
          <v-icon dark class="fas fa-trash"></v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-combobox
          v-model="selectedItem"
          :items="contact"
          item-text="category"
          :search-input.sync="category"
          hide-selected
          hint="Filter Mail Category"
          label="Select Your Category"
          persistent-hint
          small-chips
        >
          <template v-slot:items="props">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{selectedItem}}
                  <!-- No results matching "
                  <strong>{{ search }}</strong>". Press
                  <kbd>enter</kbd> to create a new one-->
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-combobox>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="filteredItems"
        :pagination.sync="pagination"
        select-all
        item-key="url"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:headers="props">
          <tr>
            <th>
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                primary
                hide-details
                @click.stop="toggleAll"
              ></v-checkbox>
            </th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)"
            >
              <v-icon small>arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template v-slot:items="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
              <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
            </td>

            <td class="center">
              <v-icon
                small
                @click.stop="showEmail(props.item);dialog = true"
                color="primary"
                class="fas fa-eye ml-1 cursor-pointer"
              ></v-icon>
              <v-icon
                small
                @click.stop="dialogWarning = true;deletedItem = props.item"
                color="red "
                class="fas fa-trash ml-1 cursor-pointer"
              ></v-icon>
            </td>

            <td class="text-xs-center">
              <v-icon color="green" class="fas fa-tags" v-if="props.item.category ==='important'"></v-icon>
              <v-icon
                color="red"
                class="fas fa-user-shield"
                v-if="props.item.category ==='private'"
              ></v-icon>
              <v-icon color="blue" class="fas fa-building" v-if="props.item.category ==='work'"></v-icon>
              <v-icon color="yellow" class="fas fa-star" v-if="props.item.category ==='star'"></v-icon>
            </td>
            <td class="text-xs-center">{{ props.item.url }}</td>
            <td class="text-xs-center custom-wrap">{{ props.item.subject }}</td>
            <td class="text-xs-center">{{ props.item.time }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <!-- first dialog to show Details -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline justify-center text-uppercase">{{showEm.category}} Mail</v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-label>{{showEm.url}}</v-label>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-label>{{showEm.time}}</v-label>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-label class="text-md-left">{{showEm.subject}}</v-label>
              </v-flex>
            </v-layout>
            <p>{{showEm.content}}</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat="flat" @click="dialog = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- second dialog for delete a row -->
    <v-dialog v-model="dialogWarning" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Warning</v-card-title>
        <v-card-text>Are You Sure You Want To Delete This Mail?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialogWarning = false">Disagree</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click="deleteEmail(deletedItem);dialogWarning = false"
          >Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import _ from "lodash";
import { AuthService } from "../services/auth.service";

export default {
  data: () => ({
    pagination: {
      sortBy: "url"
    },
    userInfo: JSON.parse(AuthService.getUserInfo()),
    dialog: false,
    dialogWarning: false,
    selectedItem: null,
    selected: [],
    category: "",
    search: "",
    headers: [
      {
        text: "Action",
        align: "center",
        value: "action"
      },
      {
        text: "Categories",
        align: "center",
        value: "category"
      },
      {
        text: "Mail Adress",
        align: "center",
        value: "url"
      },

      { text: "Subject", value: "subject" },
      { text: "Time", value: "time" }
    ],
    showEm: {},
    deletedItem: {}
  }),
  computed: {
    //i used vuex and return array with contact()
    contact() {
      return this.$store.state.contact;
    },
    //filter rows by categories
    filteredItems() {
      let self = this;
      return this.$store.state.contact.filter(i => {
        return !self.selectedItem || i.category === self.selectedItem.category;
      });
    }
  },
  methods: {
    imageFileChanged(event) {
      let vm = this;
      let reader = new FileReader();
      reader.onload = function() {
        vm.userInfo.profileImage = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    //delete a row
    deleteEmail(el) {
      this.$store.state.contact = _.remove(
        this.$store.state.contact,
        mail => mail.id !== el.id
      );
    },
    //show Details in modal
    showEmail(el) {
      this.showEm = el;
    },
    //select all mails
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.contact.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    //delete selected mails with Lodash
    mailDeleted(items) {
      let ids = _.map(items, item => item.id);
      this.$store.state.contact = _.remove(
        this.$store.state.contact,
        mail => ids.indexOf(mail.id) === -1
      );
    },
    imageClickHandler() {
      const imageFileInput = this.$refs.imageFileInput;
      imageFileInput.click();
    }
  }
};
</script>
<style scoped>
/* i solved extra subject problem in tabel with  this css */
.custom-wrap {
  max-width: 79vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.profile-image {
  max-width: 45px;
  border-radius: 50%;
  max-height: 45px;
  width: 45px;
  height: 45px;
  cursor: pointer;
}

.profile-name {
  display: inline-block;
  position: relative;
  top: -10px;
  margin-left: 15px;
}
</style>
