<template>
	<div class="layout-page" :style="themeStyle">
        <v-header :title="$t('accountSettings.a1')"></v-header>
		<main class="layout-main">
		<div class="form-item   p-md m-md">
		  <div class="color-light p-b-xs">{{$t('common.select')}}{{$t('accountSettings.a1')}}</div>
		  <div class="d-flex justify-between m-t-md ">
		    <div
		      @click="getFile('front_img')"
		      class="upload-box d-flex justify-center align-center rounded-sm  bg-panel-3 box-shadow"
		    >
		      <van-icon v-if="!form.avatar" class="color-light fn-30" name="photograph" />
		      <img v-else :src="form.avatar"  alt />
		    </div>
		  </div>
		</div>
  <!--      <div class="p-x-md bg-panel-5">
             <van-button class=" w-max fn-lg m-b-sm" color="#f05319" type="info">{{$t('common.save')}}</van-button>
        </div> -->
       <view class="p-md ">
         <v-button block type="blue" class="w-max rounded-md" ref="btn" @click="submit">{{$t('common.save')}}</v-button>
       </view>
	   </main>
	</div>
</template>
<script>
import { mapState,mapGetters } from "vuex";
import Setting from "@/api/setting";
import Member from "@/api/member";
export default {
    data() {
      return {
        form: {
          avatar: "",
          username: "",
        },
      };
    },
	computed: {
	  ...mapState({
	    user: "user",
	  }),
	  ...mapGetters(['themeStyle'])
	  
	},
	created() {
		Setting.getUserInfo().then((res) => {
		  this.form.username = res.data.username
		  this.form.avatar = res.data.avatar
		});
	},
	methods:{
		getFile(name) {
		  this.$getFile({count:1}).then((res) => {
		    this.upLoadImg(res, name);
		  })
		},
		// 上传图片
		upLoadImg(chooseImageRes, name) {
		  Member.uploadImage(chooseImageRes).then((res) => {
		    console.log(res)
		    this.form.avatar = res.data.url;
		    this.$toast.success(this.$t('auth.c1'));
		  });
		},
		submit() {
		  Setting.updateUserInfo(this.form, { btn: this.$refs.btn }).then(() => {
		    this.$toast.success(this.$t('safe.e4'));
		    this.$back();
		  });
		},
	},
}
</script>
<style lang="scss" scoped>
.examples {
  width: 122px;
  height: 70px;
  display: flex;
  align-items: center;
  img {
    width: 100%;
  }
}
.upload-box {
  width: 150px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>