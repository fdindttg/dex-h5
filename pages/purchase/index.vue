<template>
  <view class="layout-main">
    <!-- 申购数据和申购周期 -->
    <view class="m-md bg-form-panel-4 rounded p-md fn-center d-flex">
      <view class="w-6/12 d-flex align-center">
        <van-circle
          size="130"
          class="w-max"
          stroke-width="6"
          :value="detail.status*25"
          :color="{ '0%': '#27CAE0', '100%': '#4653EF' }"
        >
        <view class="color-light fn-center fn-10">
           <view class="label m-b-xs color-default">{{ $t("purchase.a0") }}</view>
           <view class="fn-11">1 {{ detail.coin_name }}≈</view>
           <view class="fn-11">
             <text class="fn-16">{{ detail.issue_price }}</text>
             USDT
           </view>
           <view class="fn-center fn-15 color-success">
             {{ detail.coin_name }}
           </view>
        </view>
        </van-circle>
      </view>
      <view>
        <view class="m-b-xs">
          <view class="label fn-10">{{ $t("purchase.a1") }}</view>
          <view class="color-light">{{ detail.subscribe_currency }}</view>
        </view>
        <view class="m-b-xs">
          <view class="label fn-10">{{ $t("purchase.a2") }}</view>
          <view class="color-light">{{detail.expected_time_online }}</view>
        </view>
        <view class="m-b-xs">
          <view class="label fn-10">{{ $t("purchase.a3") }}</view>
          <view class="color-light">{{detail.start_subscription_time}}</view>
        </view>
        <view class="m-b-xs">
          <view class="label fn-10">{{ $t("purchase.a4") }}</view>
          <view class="color-light">{{detail.end_subscription_time}}</view>
        </view>
      </view>
    </view>
    <!-- 申购 -->
    <view class="m-md bg-panel-4 rounded p-md box-shadow">
      <view class="title p-b-xs border-b">{{ $t("purchase.a5") }}</view>
      <view class="m-y-md">
        <view class="label">{{ $t("purchase.a1") }}</view>
        <v-picker
          :list="coinList"
          v-model="coin"
          range-label="coin_name"
          range-value="coin_name"
          class="border-b p-y-xs color-light"
        >
          <v-input
            disabled
            :value="activeCoin.coin_name"
            :placeholder="$t('purchase.a6')"
          >
            <template #right>
              <i class="iconfont">&#xe6e9;</i>
            </template>
          </v-input>
        </v-picker>
        <view class="tips m-t-xs fn-sm d-flex justify-between color-sell">
          <view
            >1 {{ activeCoin.coin_name }} ≈
            {{ omitTo(activeCoin.proportion_amount, 4) }}
            {{ detail.coin_name }}</view
          >
          <view class="color-sell"
            >{{ num || 0 }} {{ activeCoin.coin_name }} ≈ {{ total }}
            {{ detail.coin_name }}</view
          >
        </view>
      </view>
      <view class="m-y-md">
        <view class="label">{{ $t("purchase.a7") }}</view>
        <view class="border-b p-y-xs color-light">
          <v-input type="digit" v-model="num" :placeholder="$t('purchase.a8')">
            <template #right>
              <view
                class="color-success"
                @click="num = activeCoin.usable_balance * 1 || 0"
                >{{ $t("purchase.a9") }}</view
              >
            </template>
          </v-input>
        </view>
      </view>
      <v-button
        block
        class="w-max rounded-lg"
        type="green"
        ref="btn"
        @click="ifSubscribeNow"
        >{{ $t("purchase.b0") }}</v-button
      >
    </view>
	<!-- 申购记录-->
	<view class="p-md">
	  <view class=" fn-lg m-b-md">{{ $t("common.a3") }}</view>
	  <table class="w-max">
	    <thead class="fn-xs">
	      <tr>
          <td class="p-y-xs ">{{ $t("purchase.e0") }}</td>
	        <td class="p-y-xs p-l-md">{{ $t("exchange.d4") }}</td>
	        <td class="p-y-xs p-r-md fn-right">{{ $t("exchange.c5") }}</td>
          
          <td class="p-y-xs fn-right p-l-md ">{{ $t("purchase.a1") }}</td>
	        <td class="p-y-xs fn-right">{{ $t("common.money") }}</td>
	        
	      </tr>
	    </thead>
		
	    <tbody class="color-light trade-list"  v-if="subscribeRecords.length > 0">
	      <!-- ||item.tradeId -->

	      <tr v-for="(item,idx) in subscribeRecords" :key="idx">
          <td>
				{{ item.subscription_currency_name }}
	        </td>
	        <td class="p-y-xs p-r-md rounded-bl-xs rounded-tl-xs ">
	          {{parseTime(item.subscription_time, true, "{h}:{i}:{s}") }}</td>
            
	        <td class="fn-right p-r-md">
				{{ item.subscription_currency_amount }}
	        </td>
        
	        <td class="p-y-xs fn-right p-l-md p-r-md rounded-br-xs rounded-tr-xs">{{ item.payment_currency }}</td>
            <td class="fn-right p-l-md">
	          {{ item.payment_amount }}
	        </td>
	      </tr>
	    </tbody>
	  </table>
	</view>
    <!-- 周期 -->
    <view class="m-md bg-panel-4 rounded p-md box-shadow">
      <view class="title p-b-xs border-b">{{ $t("purchase.b1") }}</view>
      <van-steps
        :active="detail.status - 1"
        :steps="[
          {
            text: $t('purchase.b2'),
            desc: '',
          },
          {
            text: $t('purchase.b3'),
            desc: detail.start_subscription_time
          },
          {
            text: $t('purchase.b4'),
            desc: detail.end_subscription_time
          },
          {
            text: $t('purchase.b5'),
            desc: detail.announce_time
          }
        ]"
        active-color="#79D47C"
        align-center
        direction="vertical"
      >
      </van-steps>
    </view>
    <!-- 项目详情 -->
    <view class="m-md bg-panel-4 rounded p-md box-shadow">
      <view class="title p-b-xs border-b">{{ $t("purchase.b6") }}</view>
      <view class="m-t-md edit-content" style="overflow:auto;max-height:400upx;margin-bottom:70upx;" v-html="detail.project_details"></view>
    </view>
  </view>
</template>
<script>
import Subscride from "@/api/subscride";
import date from "@/utils/class/date";
import math from "@/utils/class/math";
export default {
  data() {
    return {
      coinList: [],
      detail: {},
      num: "",
	  subscribeRecords:[],
      coin: "",
    };
  },
  computed: {
    total() {
      if (!this.activeCoin.proportion_amount) return 0;
      return math.multiple(
        this.num || 0,
        this.activeCoin.proportion_amount * 1,
        2
      );
    },
    activeCoin() {
      if (!this.coin) return {};
      return this.coinList.find((item) => item.coin_name == this.coin);
    },
  },
  methods: {
    omitTo(num, idx) {
      if (!num) return 0;
      return math.omitTo(num, idx);
    },
    parseTime: date.parseTime,
    parseTime1(num) {
      if (!num) return;
      return date.parseTime(num);
    },
    subscribeTokenList() {
      Subscride.subscribeTokenList().then((res) => {
        this.coinList = res.data;
        this.coin = this.coinList[0].coin_name;
      });
    },
	getTransferRecords() {
	  Subscride.subscribeRecords()
		.then((res) => {
      console.log(21,res);
		  this.subscribeRecords = res.data.data
		})
		.catch((err) => {})
	},
    getInfo() {
      Subscride.subscribe().then((res) => {
        this.detail = res.data;
      });
    },
    // 选择币种
    selectCoin() {
      let arr = this.coinList.map((item) => {
        return {
          label: item.coin_name,
          value: item.coin_name,
        };
      });

      this.$picker(arr, { value: this.coin }).then((res) => {
        this.coin = res;
      });
    },
    // 提交询问
    ifSubscribeNow() {
      this.$dialog
        .confirm({
          title: this.$t("common.tips"),
          message: `${this.$t("purchase.b7")}${
            this.activeCoin.coin_name
          }${this.$t("purchase.b8")}？`,
		  cancelButtonText: this.$t('common.cancelButtonText'),
		  confirmButtonText:this.$t('common.confirmButtonText')
        })
        .then(() => {
          this.subscribeNow();
        })
        .catch(() => {});
    },
    // 申购
    subscribeNow() {
      let data = {
        amount: this.num,
        coin_name: this.activeCoin.coin_name,
      };
      Subscride.subscribeNow(data, { btn: this.$refs.btn })
        .then((res) => {
          if (res) {
            this.$toast.success(this.$t("purchase.b9"));
            this.num = "";
          }
        })
        .catch(() => {});
    },
  },
  created() {
    this.subscribeTokenList();
	this.getTransferRecords()
    this.getInfo();
  },
};
</script>
<style lang="scss" scoped>
::v-deep uni-canvas{
  width: 130px;
  height: 130px;
}
::v-deep .van-step--finish{
  color:$light;
}
::v-deep .van-step--vertical:first-child::before {
  background: transparent;
}
::v-deep .van-step--vertical {
  .van-step__circle-container {
    background-color: transparent;
    .van-icon-checked {
      width: 14px;
      height: 14px;
      background: rgba($green, 0.7);
      font-size: 0;
      display: block;
      border-radius: 20px;
      &::after{
        content: '';
        display: block;
        font-size: 0;
        width: 8px;
        height: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: $green;
        border-radius: 20px;
      }
    }
  }
}
</style>