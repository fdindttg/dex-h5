<template>
	<v-page>
    <view class=" m-y-sm rounded-md m-x-lg overflow-hidden box-shadow">
        <v-header :title="$t('accountSettings.b0')"></v-header>
        <!-- 内容 -->
        <!-- <div class="h-max bg-panel-5 p-x-md layout-main">
            <div class="per-bot  p-t-md border-b border-gray-7 d-flex flex-col">
                <span class="color-light p-b-sm">{{$t('accountSettings.a2')}}</span>
                <van-field :placeholder="$t('accountSettings.b1')" maxlength="12"/>
            </div>
           
        </div> -->
		<view class="form-item border-b p-md m-b-md">
		  <view class="label m-b-xs">{{$t('accountSettings.a2')}}</view>
		  <view class="input color-light">
		    <v-input v-model="form.username" :placeholder="$t('accountSettings.b1')"></v-input>
		  </view>
		</view>
  <!--      <div class="p-x-md bg-panel-5">
             <van-button class=" w-max fn-lg m-b-sm" color="#f05319" type="info">{{$t('common.save')}}</van-button>
        </div> -->
       <view class="p-md ">
         <v-button block type="blue" class="w-max rounded-md" ref="btn" @click="submit">{{$t('common.save')}}</v-button>
       </view>
    </view>
	 </v-page>
</template>
<script>
import { mapState,mapGetters } from "vuex";
import Setting from "@/api/setting";
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
	},
	created() {
		Setting.getUserInfo().then((res) => {
		  this.form.username = res.data.username
		  this.form.avatar = res.data.avatar
		});
	},
	methods:{
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
    .head-account {
        font-size: 20px;
    }
    ::v-deep .van-cell{
        padding: 0 !important;
    }
</style>