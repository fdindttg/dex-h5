<template>
  <view class="layout-page bg-panel-1" :style="themeStyle">
    <v-header>
      <template #title>
        {{$t('assets.e5')}}
        <span class="color-theme-1" style="margin-left: 10rpx;">{{coin}}</span>
      </template>
    </v-header>
    <view class="layout-main p-x-lg">
      <view class="coin p-md d-flex justify-between bg-panel-3 m-y-md rounded-md box-shadow" @click="coinListShow=true">
        <view class="fn-lg color-light">{{coin}}</view>
        <view>
          <van-icon name="arrow" />
        </view>
      </view>
      <view class="m-y-md rounded-md overflow-hidden">
		<template v-if="coin=='Bank Card'">
			<view class="info m-t-md p-md bg-panel-3 rounded-md box-shadow">
			  <view class="address d-flex align-center justify-between p-t-xs m-b-md">
			    <view class="label w-100">{{$t('assets.e8')}}</view>
			    <v-input
			      type="number"
			      class="border-b flex-fill fn-right p-y-xs color-light"
			      v-model="form.amount"
			    />
			  </view>
			  <v-button type="theme" block class="w-max m-t-md" @click="bankRecharge" ref="btn">{{$t('common.confirm')}}</v-button>
			</view>
		</template>
		<template v-else>
			<view class="bg-panel-3 rounded-md box-shadow">
			  <view
			    class="d-flex  justify-between align-center border-b p-x-md p-y-xs color-light"
			    v-if="coin=='USDT'"
			  >
			    <span>{{$t('assets.b7')}}</span>
			    <view class="group d-flex fn-12 color-light">
			  
			      <view class="rounded-md color-plain p-x-sm p-y-xs  m-r-sm"
			        size="mini"
			        @click="changeRechargeType(2)"
			        :class="rechargeType==2?'bg-gradient-green':'bg-gray-7'"
			      >ERC20</view>
				  
				  <view class="rounded-md color-plain  p-x-sm p-y-xs m-r-sm"
				    :class="rechargeType==1?'bg-gradient-green':'bg-gray-7'"
				    size="mini"
				    @click="changeRechargeType(1)"
				  >OMNI</view>
				  
			      <view class="rounded-md color-plain p-x-sm p-y-xs"
			        size="mini"
			        @click="changeRechargeType(3)"
			        :class="rechargeType==3?'bg-gradient-green':'bg-gray-7'"
			      >TRC20</view>
			    </view>
			  </view>
			  <view class="p-t-md  p-b-md ">
			    <view class="fn-center">
			      <v-qr v-if="form.address" class="qr-box" :text="form.address||' '"></v-qr>
			    </view>
			    <view class="tips fn-center color-light m-y-xs">{{$t('assets.e6')}}</view>
			  </view>
			</view>
			<view class="info m-t-md p-md bg-panel-3 rounded-md box-shadow">
			  <view class="address d-flex align-center justify-between p-t-xs">
			    <view class="label w-100">{{$t('assets.e7')}}</view>
			    <view class="border-r address-txt p-x-xs flex-fill color-light fn-right">{{form.address}}</view>
			    <view class="color-theme-1 p-x-xs fn-18" @click="$copy(form.address)">
			      <i class="iconfont">&#xe706;</i>
			    </view>
			  </view>
			  <!-- <view class="address d-flex align-center justify-between p-t-xs m-b-md">
			    <view class="label w-100">{{$t('assets.e8')}}</view>
			    <v-input
			      type="number"
			      class="border-b flex-fill fn-right p-y-xs color-light"
			      v-model="form.amount"
			    />
			  </view>
			  <v-button type="theme" block class="w-max m-t-md" @click="recharge" ref="btn">{{$t('common.confirm')}}</v-button> -->
			</view>
		</template>
        <view class="m-y-md bg-panel-3 rounded-md box-shadow">
          <ul class=" p-xs fn-sm rounded-md m-y-xs">
            <li>·{{$t('assets.f0')}}. {{$t('assets.f1',{num:10,name: coin })}}. </li>
            <li>·{{$t('assets.f3',{name:coin})}}</li>
          </ul>
        </view>
      </view>
      <view class=" m-b-lg" v-if="list.length">
        <view class="title d-flex justify-between  p-y-xs align-center color-light">
          <span class="fn-lg">{{$t('assets.f4')}}</span>
        </view>
        <view class="">
          <table class="w-max">
            <thead class="p-x-md">
              <tr class="fn-sm p-x-md " >
                <th class=" p-b-md fn-left p-l-md">{{$t('assets.c9')}}</th>
                <th class=" p-b-md fn-left">{{$t('assets.d0')}}</th>
                <th class=" p-b-md fn-right p-r-md">{{$t('assets.c0')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="color-light trChange p-x-md"  v-for="(item) in list" :key="item.id">
                <td class="p-y-xs p-l-md rounded-tl-sm rounded-bl-sm">{{item.datetime|parseTime}}</td>
                <td >
                  <view v-if="item.status==0">{{$t('assets.d1')}}</view>
                  <view v-if="item.status==1" class="color-buy">{{$t('assets.d2')}}</view>
                  <view v-if="item.status==2" class="color-sell">{{$t('assets.d3')}}</view>
                </td>
                <td class="fn-right p-r-md rounded-tr-sm rounded-br-sm">
                  {{item.amount}}
                  <span class="color-default">({{item.coin_name}})</span>
                </td>
              </tr>
              <tr v-if="loadMore">
                <td colspan="3" class="fn-center p-xs link-active" @click="more">{{$t('assets.d4')}}</td>
              </tr>
            </tbody>
          </table>
        </view>
      </view>
    </view>
    <coin-list ref="coinList" v-model="coin" @close="coinListShow=false" v-show="coinListShow" />
    <van-toast id="van-toast" />
	<van-dialog id="van-dialog" />
  </view>
</template>
<script>
import coinList from "./coin-list";
import Wallet from "@/api/wallet";
import formData from "@/utils/class/date";
import {mapGetters} from 'vuex'
export default {
  components: {
    coinList,
  },
  data() {
    return {
      coinListShow: false,
      coin: "",
      rechargeType: 2,
      address: "",
      form: {
        coin_id: "",
        amount: "",
        address: "",
      },
      list: [],
      page: 1,
      loadMore: true,
    };
  },
  computed: {
    activeCoin() {
      if (!this.coin) return {};
      return this.$refs.coinList.coinList.find(
        (item) => item.coin_name == this.coin
      );
    },
    ...mapGetters(['themeStyle'])
  },
  filters: {
    parseTime(val) {
      return formData.parseTime(val);
    },
  },
  watch: {
    coin(n) {
      if (n) {
		this.form.address = "";
		if(this.coin != 'Bank Card'){
			if (this.coin != "USDT") {
			  this.rechargeType = 2;
			}
			this.walletImage();
		}
      }
    },
    rechargeType() {
      // 优先清空地址  避免用户充错地址
    },
  },
  methods: {
    changeRechargeType(idx) {
      this.rechargeType = idx;
      this.form.address = "";
      this.walletImage();
    },
    // 获取充币地址
    walletImage() {
      let data = {
        coin_id: this.activeCoin.coin_id,
        address_type: this.rechargeType,
      };
      Wallet.walletImage(data).then((res) => {
      		  if(res.message == 'FAILED'){
      // 			  this.$dialog
      // 			      .confirm({
      // 					  title: this.$t("common.error"),
      // 					  message: this.$t("common.error1"),
						//   cancelButtonText: this.$t('common.cancelButtonText'),
						//   confirmButtonText:this.$t('common.confirmButtonText'),
      // 			      })
      // 			      .then(() => {
      
      // 			      });
      		  }else{
      			  this.form.address = res.data.address;
      		  }
      }).catch(() => {});
    },
	bankRecharge(){
		this.form.coin_id = 1;
		Wallet.bankRecharge(this.form, { btn: this.$refs.btn })
		.then((res) => {
			window.open(res.data, '_blank');
		  // this.$back();
		  // this.$toast.success(this.$t('assets.d5')+"！");
		  // this.reset();
		})
		.catch(() => {});
	},
    // 充值
    recharge() {
      this.form.coin_id = 1;
      Wallet.recharge(this.form, { btn: this.$refs.btn })
        .then(() => {
          this.$back();
          this.$toast.success(this.$t('assets.d5')+"！");
          this.reset();
        })
        .catch(() => {});
    },
    reset() {
      this.loadMore = true;
      this.page = 1;
      this.depositHistory();
    },
    more() {
      this.page++;
      this.depositHistory();
    },
    // 获取充值记录
    depositHistory() {
      let data = {
        page: this.page,
      };
      Wallet.depositHistory(data).then((res) => {
        if (res.data.current_page == 1) this.list = [];
        this.list = [...this.list, ...res.data.data];
        if (res.data.data.length < res.data.per_page) this.loadMore = false;
      });
    },
  },
  created() {
    this.depositHistory();
  },
};
</script>
<style lang="scss" scoped>
.address {
  .label {
    white-space: nowrap;
  }
  .address-txt {
    word-break: break-all;
  }
}
.qr-box {
  height: 150px;
  width: 150px;
  margin: 0 auto;
  border: 4px solid $white;
}
.trChange:nth-child(2n-1){
   box-shadow: $shadow;
    border-radius: $border-radius-xs;
	td{
		background: $panel-3;
		padding-top: $padding-sm;
		padding-bottom: $padding-sm;
	}
}
</style>