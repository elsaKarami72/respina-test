<template>
  <v-app id="login" class="customBg">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="../assets/Rlogo.svg" alt="Vue Material Admin" width="150" height="150">
                  <h1 class="flex my-4 primary--text">RESPINA</h1>
                  <div class="text-lg-center">Username: <strong>123</strong>, Password: <strong>123</strong></div>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="model.username"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.password"
                  ></v-text-field>
                </v-form>
                <h3 v-if="hasErr" class="error-text">Username or password is wrong!</h3>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ApiService from "../services/api.service";
import { AuthService } from "../services/auth.service";

export default {
  data: () => ({
    hasErr: false,
    model: {
      username: "",
      password: ""
    }
  }),

  methods: {
    async login() {
      this.hasErr = false;
      if (this.model.username === "123" && this.model.password === "123") {
        const loginRes = await ApiService.get("token.json");
        let token = loginRes.data.token;
        AuthService.saveToken(token);
        const userInfoRes = await ApiService.get("userInfo.json");
        const userInfo = userInfoRes.data;
        AuthService.setUserInfo(userInfo);
        this.$router.push("mail");
      } else {
        this.hasErr = true;
      }
    }
  }
};
</script>
<style scoped lang="css">
.customBg {
  background-image: url("../assets/bg.png");
}
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
.error-text {
  color: red;
}
</style>
