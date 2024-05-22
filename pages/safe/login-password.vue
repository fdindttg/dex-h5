<template>
  <v-page class="pos-login">
    <v-header :title="$t('safe.c8')"></v-header>
    <main class=" m-x-xl bg-panel-3 p-x-lg p-y-lg rounded-md box-shadow">
      <view class="form-item border-b p-md ">
        <view class="label m-b-xs">{{$t('safe.b3')}}</view>
        <view class="input color-light">
          <v-input :type="pwdShow?'text':'password'" v-model="form.password" :placeholder="$t('safe.b4')">
			  <template #right>
			  	<van-icon :name="pwdShow?'eye':'closed-eye'" color="#79D47C" @click="pwdShow = !pwdShow" />
			  </template>
		  </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md">
        <view class="label m-b-xs">{{$t('safe.b5')}}</view>
        <view class="input color-light">
          <v-input :type="pwdShow?'text':'password'" v-model="form.password_confirmation" :placeholder="$t('safe.b6')">
			<template #right>
				<van-icon :name="pwdShow?'eye':'closed-eye'" color="#79D47C" @click="pwdShow = !pwdShow" />
			</template>
		  </v-input>
        </view>
      </view>
      <!-- <view class="form-item border-b p-md" v-if="user.phone_status==1">
        <view class="label m-b-xs">SMS{{$t('safe.a7')}}</view>
        <view class="input color-light">
          <v-input v-model="form.sms_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/user/getCode" :data="{type:1}" />
            </template>
          </v-input>
        </view>
      </view> -->
      <view class="form-item border-b p-md" v-if="user.email_status==1">
        <view class="label m-b-xs">{{$t('safe.a5')}}</view>
        <view class="input color-light">
          <v-input v-model="form.email_code" :placeholder="$t('safe.a6')">
            <template #right>
              <v-code url="/user/getCode" :data="{type:2}" />
            </template>
          </v-input>
        </view>
      </view>
      <view class="form-item border-b p-md" v-if="user.google_status==1">
        <view class="label m-b-xs">Google {{$t('safe.a7')}}</view>
        <view class="input color-light">
          <v-input v-model="form.google_code" :placeholder="$t('safe.a6')"></v-input>
        </view>
      </view>
	  <view class="p-md ">
	    <v-button block type="blue" class="w-max rounded-md" ref="btn"  @click="setPassword">{{$t('safe.b7')}}</v-button>
	  </view>
	  <!-- <v-button block class="w-max" ref="btn" type="theme"></v-button> -->
    </main>
      
    <van-toast id="van-toast" />
  </v-page>
</template>
<script>
import { mapState } from "vuex";
import Member from "@/api/member";
import Setting from "@/api/setting";
export default {
  data() {
    return {
		pwdShow:false,
      form: {
        password: "",
        password_confirmation: "",
        sms_code: "",
        email_code: "",
        google_code: "",
      },
    };
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  methods: {
	  fnShow(){
		  this.pwd.show = !this.pwd.show
	  },
    setPassword() {
      let data = this.form;
      Setting.updatePassword(data, { btn: this.$refs.btn })
        .then(() => {
			this.loginOut()
          // this.$back();
          // this.$toast.success(this.$t('safe.d3'));
        })
        .catch(() => {});
    },
    // 切换用户
    outLogin() {
      uni.removeStorageSync("token");
      this._router.replace({
        path: "/pages/login/index",
        query: {
          notLogin: 1,
          from: '/pages/accountSettings/accountSettings',
        },
      });
    },
	// 退出登录
	loginOut() {
	  Member.logout({}, { toast: true })
	    .then(() => {
	      this.outLogin();
	    })
	    .catch(() => {});
	},
  },
};
</script>
<style lang="scss" scoped>
	
</style>